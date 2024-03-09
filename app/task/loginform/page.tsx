'use client';
import AlertSnackbar from '@/components/Alerts/AlertSnackbar';
import LoginForm from '@/components/Forms/LoginForm';
import { useState} from 'react';

// ================ LOGIN FORM ====================
// Tasks:
//  * The login button should trigger the login() action imported above and pass required data to it.
//  * Disable the Login button if username is blank OR if password is under 6 letters
//  * Disable the Login button while login action is being performed
//  * Show an error message from the login() if login fails. The error should be cleared every time user re-attempts to log in.
//  * Show an alert box if login succeeds. Investigate the login function to find out how to log in successfully.

export default function Page() {
  const [showAlert, setShowAlert] = useState(false);
  const [variant, setVariant] = useState<Variant>('default');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
 
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
          <LoginForm
            setShowAlert={setShowAlert}
            setVariant={setVariant}
            setTitle={setTitle}
            setMessage={setMessage}
          />
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
