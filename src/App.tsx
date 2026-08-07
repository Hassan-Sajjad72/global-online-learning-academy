import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { Loader2 } from 'lucide-react';
import { Toaster } from "react-hot-toast";
const AdminProfile = lazy(() => import('./pages/AdminProfile'));
// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Enrollment = lazy(() => import('./pages/Enrollment'));
const Contact = lazy(() => import('./pages/Contact'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
    <div className="flex flex-col items-center space-y-4">
      <Loader2 className="w-12 h-12 text-brand-blue dark:text-brand-green animate-spin" />
      <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Loading Global Academy...</p>
    </div>
  </div>
);

// Protected Admin Route
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin } = useAdmin();
  return isAdmin ? <>{children}</> : <Navigate to="/admin" replace />;
};

export default function App() {
  return (
    <ThemeProvider>
      <AdminProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/enroll" element={<Enrollment />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    } 
                  />
                  <Route
  path="/admin/profile"
  element={
    <AdminRoute>
      <AdminProfile />
    </AdminRoute>
  }
/>

                  {/* Fallback route */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </div>
           <Footer />
<WhatsAppButton />

<Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      borderRadius: "12px",
      background: "#1e293b",
      color: "#fff",
    },
    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    },
  }}
/>
          </div>
        </Router>
      </AdminProvider>
    </ThemeProvider>
  );
}
