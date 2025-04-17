
import React from 'react';
import { Brain, LogOut, User, CreditCard, Mail, BarChart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useCredits } from '@/hooks/useCredits';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, signOut } = useAuth();
  const { credits, isLoading } = useCredits();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between py-4 px-6 mb-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div 
        className="flex items-center space-x-2 cursor-pointer" 
        onClick={() => navigate('/')}
      >
        <Brain className="h-8 w-8 text-indigo-600 dark:text-indigo-400 animate-pulse" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
          Askable.ai
        </h1>
      </div>
      
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex space-x-6">
          <Button variant="ghost" onClick={() => navigate('/')}>Home</Button>
          <Button variant="ghost" onClick={() => navigate('/pricing')}>Pricing</Button>
          <Button variant="ghost" onClick={() => navigate('/contact')}>Contact</Button>
        </nav>
        
        {user ? (
          <div className="flex items-center gap-4">
            {!isLoading && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                <CreditCard className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                  {credits} Credits
                </span>
              </div>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 hover:ring-2 hover:ring-indigo-400 transition-all">
                    <AvatarImage src="" alt={user.email || "User"} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                    {!isLoading && (
                      <p className="text-xs leading-none text-muted-foreground">
                        {credits} Credits Available
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/account')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/pricing')}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Buy Credits</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button 
            variant="default" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white" 
            onClick={() => navigate('/auth')}
          >
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
