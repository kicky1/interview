'use client';
import { Label } from '@radix-ui/react-label';
import { RotateCw } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Input } from '../ui/input';
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { loginUser } from '@/app/actions/post-login';
import { Variant } from '@/app/types/alert.type';
import { Eye, EyeOff } from 'lucide-react';

type Props = {
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  setVariant: Dispatch<SetStateAction<Variant>>;
  setTitle: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
};

export default function LoginForm({
  setShowAlert,
  setVariant,
  setTitle,
  setMessage,
}: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const validate = username === '' || password.length < 6;

  const handleLogin: MouseEventHandler<HTMLButtonElement> = async event => {
    event.preventDefault();
    if (validate) {
      setShowErrorMessage(true);
      return;
    }
    setLoading(true);
    await loginUser({ username, password })
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
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setShowErrorMessage(false);
              }}
            />
            <div className="absolute inset-y-0 right-2 flex items-center hover:cursor-pointer">
              <span onClick={() => setShowPassword(!showPassword)}>
                {!showPassword ? (
                  <Eye className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                )}
              </span>
            </div>
          </div>
        </div>

        {showErrorMessage && (
          <p className="text-sm text-start text-red-500">
            Please fill in the fields correctly
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={loading} onClick={handleLogin}>
          {loading ? (
            <RotateCw className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          ) : (
            'Submit'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
