'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThumbsUp, XCircle, RotateCw } from 'lucide-react';
import { useState, type MouseEventHandler, useEffect } from 'react';
// ================ LOGIN FORM ====================
// Tasks:
//  * The login button should trigger the login() action imported above and pass required data to it.
//  * Disable the Login button if username is blank OR if password is under 6 letters
//  * Disable the Login button while login action is being performed
//  * Show an error message from the login() if login fails. The error should be cleared every time user re-attempts to log in.
//  * Show an alert box if login succeeds. Investigate the login function to find out how to log in successfully.

type LoginInput = {
  username: string;
  password: string;
};

type Variant = 'default' | 'destructive' | null | undefined;

type TAlert = {
  title: string;
  message: string;
  showAlert: boolean;
  variant?: Variant;
  setShowAlert: (showAlert: boolean) => void;
};

const login = async ({ username, password }: LoginInput) => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
        }),
      }).then((response: any) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject(
            new Error('User with this username and password does not exist.'),
          );
        }
      });
    }, 2000);
  });
};

function AlertSnackbar({
  title,
  message,
  showAlert,
  variant = 'default',
  setShowAlert,
}: TAlert) {
  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  }, [showAlert]);

  if (!showAlert) return null;

  return (
    <div className="fixed top-0 right-0 z-50 p-4">
      <Alert variant={variant}>
        {variant === 'default' ? (
          <ThumbsUp className="h-4 w-4" />
        ) : (
          <XCircle className="h-4 w-4" />
        )}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
}

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [variant, setVariant] = useState<Variant>('default');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const validate = username === '' || password.length < 6;

  const handleLogin: MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault();
    if (validate) {
      setShowErrorMessage(true);
      return;
    }
    setLoading(true);
    await login({ username, password })
      .then(() => {
        setTitle('Login Success');
        setMessage('The user has been correctly logged in.');
        setVariant('default');
        setLoading(false);
        setShowAlert(true);
        setUsername('');
        setPassword('');
      })
      .catch(error => {
        setTitle('Login Error');
        setMessage(error.message);
        setVariant('destructive');
        setShowAlert(true);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="my-8 text-center">
        <p className="text-2xl">
          Task 2: <code className="font-mono font-bold">"Login form"</code>
        </p>
        <p className="mt-4 text-xl">
          Test account : <code className="font-mono font-bold">kminchelle</code>
          -<code className="font-mono font-bold">0lelplR</code>
        </p>
        <div className="flex flex-col items-center justify-center mt-16">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                <p>Enter your username and password below to login </p>
                <p>your account</p>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 text-left">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="Jhon"
                  value={username}
                  onChange={e => {
                    setUsername(e.target.value);
                    setShowErrorMessage(false);
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setShowErrorMessage(false);
                  }}
                />
              </div>

              {showErrorMessage && (
                <p className="text-sm text-start text-red-500">
                  Please fill in the fields correctly
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                disabled={loading}
                onClick={handleLogin}
              >
                {loading ? (
                  <RotateCw className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                ) : (
                  'Submit'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <AlertSnackbar
        title={title}
        message={message}
        variant={variant}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
    </>
  );
}
