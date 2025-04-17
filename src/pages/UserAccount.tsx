
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCredits } from '@/hooks/useCredits';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, Clock, ArrowDownToLine, ArrowUpFromLine, Gift } from 'lucide-react';

const UserAccount = () => {
  const { user } = useAuth();
  const { credits, isLoading } = useCredits();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  const fetchTransactions = async () => {
    setIsLoadingTransactions(true);
    try {
      const { data, error } = await supabase
        .from('credit_transactions')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoadingTransactions(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Account</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white dark:bg-gray-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Current Balance</CardDescription>
                <CardTitle className="text-3xl">
                  {isLoading ? (
                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      {credits} Credits
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Total Used</CardDescription>
                <CardTitle className="text-3xl">
                  {isLoadingTransactions ? (
                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    <div className="flex items-center">
                      <ArrowUpFromLine className="mr-2 h-6 w-6 text-orange-600 dark:text-orange-400" />
                      {transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + Math.abs(t.amount), 0)} Credits
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Total Purchased</CardDescription>
                <CardTitle className="text-3xl">
                  {isLoadingTransactions ? (
                    <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    <div className="flex items-center">
                      <ArrowDownToLine className="mr-2 h-6 w-6 text-green-600 dark:text-green-400" />
                      {transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0)} Credits
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
            
            <Card className="bg-white dark:bg-gray-800 shadow-sm">
              <CardHeader className="pb-2">
                <CardDescription>Account Since</CardDescription>
                <CardTitle className="text-3xl">
                  {user ? (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-base">
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  ) : (
                    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  )}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <Card className="bg-white dark:bg-gray-800 shadow-sm">
                <CardHeader>
                  <CardTitle>Credit History</CardTitle>
                  <CardDescription>Your credit transactions and usage</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingTransactions ? (
                    <div className="space-y-4">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex justify-between items-center p-3 border-b">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                            <div>
                              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </div>
                          </div>
                          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  ) : transactions.length > 0 ? (
                    <div className="divide-y">
                      {transactions.map((transaction, index) => (
                        <div 
                          key={transaction.id} 
                          className="py-4 flex justify-between items-center"
                        >
                          <div className="flex items-center space-x-3">
                            {transaction.amount > 0 ? (
                              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <ArrowDownToLine className="h-5 w-5 text-green-600 dark:text-green-400" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                                <ArrowUpFromLine className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium">
                                {transaction.type === 'purchase' ? 'Credit Purchase' : 'Credits Used'}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(transaction.created_at)}
                              </p>
                            </div>
                          </div>
                          <div className={`font-medium ${transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount} Credits
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500 dark:text-gray-400">No transaction history yet.</p>
                    </div>
                  )}
                  
                  {transactions.length > 0 && (
                    <div className="mt-4 text-center">
                      <Button variant="outline" onClick={fetchTransactions}>
                        Refresh History
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="w-full md:w-1/3">
              <Card className="bg-white dark:bg-gray-800 shadow-sm">
                <CardHeader>
                  <CardTitle>Get More Credits</CardTitle>
                  <CardDescription>Upgrade your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
                    onClick={() => navigate('/pricing')}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    View Pricing Plans
                  </Button>
                  
                  <div className="p-4 border border-indigo-200 dark:border-indigo-800 rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                    <div className="flex items-center gap-3 mb-2">
                      <Gift className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="font-medium">Refer a Friend</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Share Askable.ai with friends and get 5 free credits when they sign up!
                    </p>
                    <Button variant="outline" className="w-full">
                      Coming Soon
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-gray-800 shadow-sm mt-6">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>We're here for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Having trouble or questions about your account? Our support team is ready to help.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/contact')}
                  >
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-auto py-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 Askable.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserAccount;
