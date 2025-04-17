
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Lock, Mail, User, CheckCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to home
  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    
    setIsSubmitting(true);
    try {
      await signIn(loginEmail, loginPassword);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerEmail || !registerPassword || !registerUsername) return;
    
    setIsSubmitting(true);
    try {
      await signUp(registerEmail, registerPassword, registerUsername);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <div className="absolute top-5 left-5 flex items-center space-x-2">
        <Brain className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-pulse" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          Askable.ai
        </h1>
      </div>
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Get Instant Answers with <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Askable.ai</span>
            </h1>
            
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Upload content from PDFs, videos, or websites, and ask questions to get intelligent answers powered by AI.
            </p>
            
            <div className="space-y-4 pt-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Start with 5 Free Credits</h3>
                  <p className="text-gray-600 dark:text-gray-400">Every new account comes with 5 free credits to try our service.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Instant Analysis</h3>
                  <p className="text-gray-600 dark:text-gray-400">Our AI processes your content in seconds, not minutes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Accurate Answers</h3>
                  <p className="text-gray-600 dark:text-gray-400">Get precise responses based on your specific content.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Affordable Plans</h3>
                  <p className="text-gray-600 dark:text-gray-400">From ₹30 for 10 credits to custom enterprise solutions.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">As featured in:</span>
                <div className="flex space-x-4">
                  <div className="opacity-70 hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="24" viewBox="0 0 80 24" fill="none" className="text-gray-500 dark:text-gray-400">
                      <path d="M4.27307 13.1V9.4H0.818848V13.1H4.27307ZM11.9686 13.1V9.4H8.51434V13.1H11.9686ZM15.4233 13.1H18.878V9.4H15.4233V13.1ZM26.5735 13.1V9.4H23.1188V13.1H26.5735ZM30.0282 13.1H33.4829V9.4H30.0282V13.1ZM41.1784 13.1V9.4H37.7237V13.1H41.1784ZM44.6331 13.1H48.0878V9.4H44.6331V13.1ZM55.7833 13.1V9.4H52.3286V13.1H55.7833ZM59.238 13.1H62.6927V9.4H59.238V13.1ZM70.3882 13.1V9.4H66.9335V13.1H70.3882ZM73.8429 13.1H77.2976V9.4H73.8429V13.1Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="opacity-70 hover:opacity-100 transition-opacity">
                    <svg width="96" height="24" viewBox="0 0 96 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-500 dark:text-gray-400">
                      <path d="M18.4033 14.4V10.8H8.35852V14.4H18.4033ZM18.4033 22.8V19.2H8.35852V22.8H18.4033ZM18.4033 6V2.4H8.35852V6H18.4033ZM1.48438 14.4H5.09115V10.8H1.48438V14.4ZM1.48438 22.8H5.09115V19.2H1.48438V22.8ZM1.48438 6H5.09115V2.4H1.48438V6ZM36.493 22.8H40.0998V2.4H36.493V22.8ZM47.8937 20.28L50.597 17.592L43.3835 10.2L50.597 2.808L47.8937 0.119999L38.0768 10.2L47.8937 20.28ZM54.8641 20.28L66.7877 10.2L54.8641 0.12L52.1607 2.808L59.3743 10.2L52.1607 17.592L54.8641 20.28ZM84.8774 2.4V22.8H88.4842V2.4H84.8774ZM77.1033 14.4V10.8H73.4965V14.4H77.1033ZM77.1033 22.8V19.2H73.4965V22.8H77.1033ZM77.1033 6V2.4H73.4965V6H77.1033ZM67.0521 14.4H70.6589V10.8H67.0521V14.4ZM67.0521 22.8H70.6589V19.2H67.0521V22.8ZM67.0521 6H70.6589V2.4H67.0521V6Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Tabs defaultValue="login" className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="text-base py-3">Login</TabsTrigger>
              <TabsTrigger value="register" className="text-base py-3">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
                  <CardDescription className="text-center">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" /> Email
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-gray-500" /> Password
                        </Label>
                        <a href="#" className="text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                          Forgot password?
                        </a>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white text-base" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                  <CardDescription className="text-center">
                    Get started with 5 free credits
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleRegister}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username" className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" /> Username
                      </Label>
                      <Input 
                        id="register-username" 
                        placeholder="johndoe" 
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" /> Email
                      </Label>
                      <Input 
                        id="register-email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-gray-500" /> Password
                      </Label>
                      <Input 
                        id="register-password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      By registering, you agree to our{" "}
                      <a href="#" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">Terms of Service</a>
                      {" "}and{" "}
                      <a href="#" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">Privacy Policy</a>.
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white text-base" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Creating account...' : 'Create account'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
          
          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Askable.ai — Turn any content into an interactive knowledge base.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
