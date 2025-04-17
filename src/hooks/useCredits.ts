
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useCredits() {
  const { user } = useAuth();
  const [credits, setCredits] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCredits() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('user_credits')
          .select('credits')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;
        
        if (data) {
          setCredits(data.credits);
        } else {
          console.warn('No credits found for user');
          setCredits(0);
        }
      } catch (err: any) {
        console.error('Error fetching credits:', err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCredits();
  }, [user]);

  const useCredit = async () => {
    if (!user) return false;
    
    try {
      // First update the credits
      const { error: updateError } = await supabase
        .from('user_credits')
        .update({ credits: credits - 1, updated_at: new Date().toISOString() })
        .eq('user_id', user.id);
      
      if (updateError) throw updateError;
      
      // Then record the transaction
      const { error: transactionError } = await supabase
        .from('credit_transactions')
        .insert({
          user_id: user.id,
          amount: -1,
          type: 'usage'
        });
      
      if (transactionError) throw transactionError;
      
      // Update local state
      setCredits(prev => prev - 1);
      return true;
    } catch (err: any) {
      console.error('Error using credit:', err);
      toast.error('Failed to use credit: ' + err.message);
      return false;
    }
  };

  const addCredits = async (amount: number, paymentId?: string) => {
    if (!user) return false;
    
    try {
      // First update the credits
      const { error: updateError } = await supabase
        .from('user_credits')
        .update({ 
          credits: credits + amount, 
          updated_at: new Date().toISOString() 
        })
        .eq('user_id', user.id);
      
      if (updateError) throw updateError;
      
      // Then record the transaction
      const { error: transactionError } = await supabase
        .from('credit_transactions')
        .insert({
          user_id: user.id,
          amount: amount,
          type: 'purchase',
          payment_id: paymentId
        });
      
      if (transactionError) throw transactionError;
      
      // Update local state
      setCredits(prev => prev + amount);
      return true;
    } catch (err: any) {
      console.error('Error adding credits:', err);
      toast.error('Failed to add credits: ' + err.message);
      return false;
    }
  };

  return { credits, isLoading, error, useCredit, addCredits };
}
