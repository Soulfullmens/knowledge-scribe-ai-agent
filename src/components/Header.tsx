
import React from 'react';
import { Brain, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between py-4 px-6 mb-4 border-b">
      <div className="flex items-center space-x-2">
        <Brain className="h-6 w-6 text-agent-primary" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-agent-primary to-agent-secondary bg-clip-text text-transparent">
          Knowledge Scribe
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" alt={user.email || "User"} />
              <AvatarFallback>
                {user.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden md:inline-block">
              {user.email}
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => signOut()}
              className="text-gray-500"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden md:inline">Sign Out</span>
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/auth')}
          >
            <User className="h-4 w-4 mr-1" />
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
