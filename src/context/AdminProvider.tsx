
import React, { createContext, useContext, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { AdminDb } from '@/lib/adminDb';

interface AdminContextType {
  isAdminLoggedIn: boolean;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const { toast } = useToast();

  const adminLogin = async (username: string, password: string) => {
    try {
      const isValid = await AdminDb.verifyAdmin(username, password);
      
      if (isValid) {
        setIsAdminLoggedIn(true);
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin dashboard",
        });
        return true;
      } else {
        toast({
          title: "Admin Login Failed",
          description: "Invalid credentials",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast({
        title: "Admin Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    toast({
      title: "Admin Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
