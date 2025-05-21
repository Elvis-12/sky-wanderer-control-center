
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import { MainLayout, AuthLayout } from "./components/layout/MainLayout";

// Auth Pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// App Pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Flights from "./pages/Flights";
import MyBookings from "./pages/MyBookings";
import MyTickets from "./pages/MyTickets";
import UserManagement from "./pages/UserManagement";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing Page (public) */}
            <Route 
              path="/" 
              element={<LandingPage />} 
            />

            {/* Auth Routes */}
            <Route 
              path="/login" 
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <AuthLayout>
                  <Signup />
                </AuthLayout>
              } 
            />
            <Route 
              path="/forgot-password" 
              element={
                <AuthLayout>
                  <ForgotPassword />
                </AuthLayout>
              } 
            />
            <Route 
              path="/reset-password" 
              element={
                <AuthLayout>
                  <ResetPassword />
                </AuthLayout>
              } 
            />
            
            {/* App Routes */}
            <Route 
              path="/dashboard" 
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              } 
            />
            <Route 
              path="/flights" 
              element={
                <MainLayout>
                  <Flights />
                </MainLayout>
              } 
            />
            <Route 
              path="/bookings" 
              element={
                <MainLayout>
                  <MyBookings />
                </MainLayout>
              } 
            />
            <Route 
              path="/tickets" 
              element={
                <MainLayout>
                  <MyTickets />
                </MainLayout>
              } 
            />
            <Route 
              path="/users" 
              element={
                <MainLayout adminOnly={true}>
                  <UserManagement />
                </MainLayout>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <MainLayout>
                  <Profile />
                </MainLayout>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <MainLayout>
                  <Settings />
                </MainLayout>
              } 
            />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
