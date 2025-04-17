import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Lock, Mail, User, CheckCircle, ExternalLink, Shield, Sparkles, Zap, Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [loginCardHover, setLoginCardHover] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

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
    <div className="min-h-screen flex items-center justify-center p-4 auth-page">
      <div className="absolute top-5 left-5 flex items-center space-x-2">
        <Brain className="h-8 w-8 text-luxury-purple dark:text-luxury-gold luxury-logo" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-luxury-purple to-luxury-navy bg-clip-text text-transparent">
          Askable.ai
        </h1>
      </div>
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        <div className={`hidden md:block space-y-8 ${showAnimation ? 'animate-fadeIn' : 'opacity-0'}`}>
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-luxury-charcoal dark:text-white leading-tight">
              <span className="bg-gradient-to-r from-luxury-purple to-luxury-navy bg-clip-text text-transparent block mb-2">Askable.ai</span>
              <span className="text-4xl">Intelligent Answers</span>
              <span className="block mt-2 text-3xl">Just Ask</span>
            </h1>
            
            <p className="text-lg text-luxury-charcoal/80 dark:text-gray-300">
              Turn any content into an interactive knowledge base. Get accurate answers instantly with our AI-powered platform.
            </p>
            
            <div className="space-y-5 pt-6">
              <div className="feature-item flex items-start space-x-3 p-3 rounded-xl transition-all hover:bg-white/50">
                <div className="mt-1 bg-luxury-cream p-2 rounded-full">
                  <Sparkles className="h-5 w-5 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-luxury-charcoal dark:text-white">Premium Experience</h3>
                  <p className="text-luxury-charcoal/70 dark:text-gray-400">Start with 5 free credits and experience our premium AI service.</p>
                </div>
              </div>
              
              <div className="feature-item flex items-start space-x-3 p-3 rounded-xl transition-all hover:bg-white/50">
                <div className="mt-1 bg-luxury-cream p-2 rounded-full">
                  <Zap className="h-5 w-5 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-luxury-charcoal dark:text-white">Lightning Fast Analysis</h3>
                  <p className="text-luxury-charcoal/70 dark:text-gray-400">Our AI processes your content in seconds, not minutes.</p>
                </div>
              </div>
              
              <div className="feature-item flex items-start space-x-3 p-3 rounded-xl transition-all hover:bg-white/50">
                <div className="mt-1 bg-luxury-cream p-2 rounded-full">
                  <Shield className="h-5 w-5 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-luxury-charcoal dark:text-white">Privacy First Approach</h3>
                  <p className="text-luxury-charcoal/70 dark:text-gray-400">Your data remains secure with our enterprise-grade security.</p>
                </div>
              </div>
              
              <div className="feature-item flex items-start space-x-3 p-3 rounded-xl transition-all hover:bg-white/50">
                <div className="mt-1 bg-luxury-cream p-2 rounded-full">
                  <Trophy className="h-5 w-5 text-luxury-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-luxury-charcoal dark:text-white">Award-Winning Accuracy</h3>
                  <p className="text-luxury-charcoal/70 dark:text-gray-400">Get precise responses based on your specific content.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-8">
              <div className="testimonial p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-luxury-silver/30">
                <p className="italic text-luxury-charcoal/80">"Askable.ai transformed how we process our documentation. The insights we get are incredible."</p>
                <div className="flex items-center mt-4">
                  <div className="w-10 h-10 rounded-full bg-luxury-cream flex items-center justify-center">
                    <span className="font-semibold text-luxury-purple">MR</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-luxury-charcoal">Michael Roberts</p>
                    <p className="text-sm text-luxury-charcoal/70">CTO, InnovateTech</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`${showAnimation ? 'animate-slideIn' : 'opacity-0'}`}>
          <Tabs defaultValue="login" className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="text-base py-3 font-medium">Login</TabsTrigger>
              <TabsTrigger value="register" className="text-base py-3 font-medium">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card 
                className={`
                  border-0 
                  shadow-lg 
                  bg-white 
                  dark:bg-gray-800 
                  auth-card 
                  overflow-hidden 
                  relative
                  transition-all 
                  duration-300
                  ${loginCardHover ? 'glow-effect' : ''}
                `}
                onMouseEnter={() => setLoginCardHover(true)}
                onMouseLeave={() => setLoginCardHover(false)}
              >
                <div className="absolute inset-0 pointer-events-none glow-overlay z-0 opacity-0"></div>
                <div className="h-1 bg-gradient-to-r from-luxury-purple via-luxury-navy to-luxury-gold"></div>
                <CardHeader className="space-y-1 pb-2">
                  <CardTitle className="text-2xl font-bold text-center text-luxury-charcoal dark:text-white">Welcome back</CardTitle>
                  <CardDescription className="text-center text-luxury-charcoal/70 dark:text-gray-400">
                    Access your premium AI assistant
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-luxury-charcoal dark:text-gray-300">
                        <Mail className="h-4 w-4 text-luxury-purple" /> Email
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                        className="h-12 luxury-input bg-luxury-cream/30 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="flex items-center gap-2 text-luxury-charcoal dark:text-gray-300">
                          <Lock className="h-4 w-4 text-luxury-purple" /> Password
                        </Label>
                        <a href="#" className="text-sm text-luxury-purple hover:text-luxury-navy dark:text-luxury-gold">
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
                        className="h-12 luxury-input bg-luxury-cream/30 focus:bg-white"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-white text-base font-medium luxury-btn" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="border-0 shadow-lg bg-white dark:bg-gray-800 auth-card overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-luxury-gold via-luxury-purple to-luxury-navy"></div>
                <CardHeader className="space-y-1 pb-2">
                  <CardTitle className="text-2xl font-bold text-center text-luxury-charcoal dark:text-white">Join Askable.ai</CardTitle>
                  <CardDescription className="text-center text-luxury-charcoal/70 dark:text-gray-400">
                    Start with 5 free credits today
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleRegister}>
                  <CardContent className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-username" className="flex items-center gap-2 text-luxury-charcoal dark:text-gray-300">
                        <User className="h-4 w-4 text-luxury-purple" /> Username
                      </Label>
                      <Input 
                        id="register-username" 
                        placeholder="johndoe" 
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                        required
                        className="h-12 luxury-input bg-luxury-cream/30 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="flex items-center gap-2 text-luxury-charcoal dark:text-gray-300">
                        <Mail className="h-4 w-4 text-luxury-purple" /> Email
                      </Label>
                      <Input 
                        id="register-email" 
                        type="email" 
                        placeholder="your@email.com" 
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                        className="h-12 luxury-input bg-luxury-cream/30 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="flex items-center gap-2 text-luxury-charcoal dark:text-gray-300">
                        <Lock className="h-4 w-4 text-luxury-purple" /> Password
                      </Label>
                      <Input 
                        id="register-password" 
                        type="password" 
                        placeholder="••••••••" 
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                        className="h-12 luxury-input bg-luxury-cream/30 focus:bg-white"
                      />
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-luxury-gold mr-2" />
                        <span className="text-sm text-luxury-charcoal/70 dark:text-gray-400">5 free credits included</span>
                      </div>
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 text-luxury-gold mr-2" />
                        <span className="text-sm text-luxury-charcoal/70 dark:text-gray-400">Secure access</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-white text-base font-medium luxury-btn" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Creating account...' : 'Create account'}
                    </Button>
                    <p className="text-xs text-center text-luxury-charcoal/60 dark:text-gray-400">
                      By registering, you agree to our{" "}
                      <a href="#" className="text-luxury-purple hover:text-luxury-navy dark:text-luxury-gold underline">Terms of Service</a>
                      {" "}and{" "}
                      <a href="#" className="text-luxury-purple hover:text-luxury-navy dark:text-luxury-gold underline">Privacy Policy</a>.
                    </p>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center mt-6 items-center space-x-4">
            <p className="text-center text-luxury-charcoal/70 dark:text-gray-400 text-sm">
              Premium support available
            </p>
            <a href="/contact" className="text-sm text-luxury-purple hover:text-luxury-navy dark:text-luxury-gold flex items-center">
              Contact us <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
