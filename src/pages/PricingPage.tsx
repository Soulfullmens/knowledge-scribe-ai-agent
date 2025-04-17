
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const PricingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePurchase = (plan: string) => {
    if (!user) {
      toast.error("Please sign in to purchase credits");
      navigate("/auth");
      return;
    }
    
    // For now just show a toast - in a real app this would connect to a payment processor
    toast.success(`Thanks for your interest in the ${plan} plan! Payment processing will be implemented soon.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Get the answers you need at affordable prices. Start with 5 free credits and add more as you go.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center mb-12">
            {/* Starter Plan */}
            <Card className="w-full md:w-80 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Starter Pack</CardTitle>
                <CardDescription>Perfect for beginners</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹30</span>
                  <span className="text-gray-500 ml-2">/ 10 credits</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>10 content analyses</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Basic question answers</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>7-day validity</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
                  onClick={() => handlePurchase('Starter')}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
            
            {/* Popular Plan */}
            <Card className="w-full md:w-80 border-2 border-indigo-500 dark:border-indigo-400 shadow-md hover:shadow-lg transition-shadow relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full flex items-center">
                <Star className="h-4 w-4 mr-1 fill-current" />
                <span className="text-sm font-medium">Best Value</span>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Popular Pack</CardTitle>
                <CardDescription>Most chosen option</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹250</span>
                  <span className="text-gray-500 ml-2">/ 100 credits</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>100 content analyses</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Advanced question answers</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>30-day validity</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" 
                  onClick={() => handlePurchase('Popular')}
                >
                  Choose Plan
                </Button>
              </CardFooter>
            </Card>
            
            {/* Enterprise Plan */}
            <Card className="w-full md:w-80 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise Pack</CardTitle>
                <CardDescription>For heavy users</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited credits</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Premium features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>API access</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50" 
                  variant="outline"
                  onClick={() => navigate('/contact')}
                >
                  Contact Us
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Askable.ai?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Advanced Security</h3>
                <p className="text-gray-600 dark:text-gray-400">Your data is always protected with enterprise-grade security.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-400">Get answers in seconds, not minutes, with our optimized AI.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">24/7 Support</h3>
                <p className="text-gray-600 dark:text-gray-400">Our dedicated support team is always ready to help you.</p>
              </div>
            </div>
            
            <div className="text-center mt-10">
              <p className="text-lg mb-4">Still have questions about our pricing plans?</p>
              <Button 
                onClick={() => navigate('/contact')} 
                variant="outline" 
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Contact our Sales Team
              </Button>
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

export default PricingPage;
