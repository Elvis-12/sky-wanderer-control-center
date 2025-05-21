
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TopNav } from "./TopNav";

interface MainLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
  adminOnly?: boolean;
}

export const MainLayout = ({
  children,
  requireAuth = true,
  adminOnly = false,
}: MainLayoutProps) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If authentication is required and user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If admin access is required and user is not an admin, redirect to dashboard
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <TopNav />
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
          <footer className="py-4 text-center text-sm text-muted-foreground border-t">
            &copy; {new Date().getFullYear()} Sky Wanderer Airlines. All rights reserved.
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  // If user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-primary">Sky Wanderer Airlines</h1>
        <p className="text-muted-foreground">Your journey begins with us</p>
      </div>
      {children}
    </div>
  );
};
