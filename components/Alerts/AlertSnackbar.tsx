'use client';
import { ThumbsUp, XCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Alert, AlertTitle, AlertDescription } from '../ui/alert';
import { TAlert } from '@/app/types/alert.type';

export default function AlertSnackbar({
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
