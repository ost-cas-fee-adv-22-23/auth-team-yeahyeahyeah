import React, { ReactNode } from 'react';
import { signIn, signOut, useSession, SignInResponse } from 'next-auth/react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => Promise<SignInResponse | undefined>;
}

export const Button: React.FC<ButtonProps> = ({ children }) => {
  const { data: session }: any = useSession();

  const handleSignIn = () => {
    signIn('zitadel');
  };

  const handleSignOut = () => {
    console.log('sign out');
    signOut();
  };

  if (session) {
    return (
      <button
        onClick={handleSignOut}
        className="bg-pink-950 px-3 py-1 rounded-md flex justify-center items-center w-full outline outline-2 outline-offset-2 outline-purple-900 hover:bg-slate-900"
      >
        Logout
      </button>
    );
  } else {
    return (
      <button
        onClick={handleSignIn}
        className="bg-pink-950 px-3 py-1 rounded-md flex justify-center items-center w-full outline outline-2 outline-offset-2 outline-purple-900 hover:bg-slate-900"
      >
        Login
      </button>
    );
  }
};
