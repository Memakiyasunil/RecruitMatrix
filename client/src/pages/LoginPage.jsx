import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Briefcase } from 'lucide-react';

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#4F46E5]/10 blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-[#7C3AED]/10 blur-3xl"></div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-100 mb-4">
            <Briefcase className="w-8 h-8 text-[#4F46E5]" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          RecruitMatrix
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enterprise Recruitment & ATS Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Card className="glass shadow-xl border-white/20">
          <CardHeader>
            <CardTitle className="text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Please sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            {error && (
              <div className="w-full bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100 text-center">
                {error}
              </div>
            )}
            
            <Button 
              variant="outline" 
              className="w-full py-6 flex items-center justify-center gap-3 text-gray-700 hover:bg-gray-50"
              onClick={handleGoogleLogin}
              isLoading={isLoading}
            >
              {!isLoading && (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              Sign in with Google
            </Button>
          </CardContent>
          <CardFooter className="justify-center border-t border-gray-100 mt-4 pt-6">
            <p className="text-sm text-gray-600">
              Need access?{' '}
              <a href="#" className="font-medium text-[#4F46E5] hover:text-[#4338CA]">
                Contact Administrator
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
