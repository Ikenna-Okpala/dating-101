"use client";

import { createContext, useContext, useState } from "react";

type EmailPassword = {
  email: string;
  password: string;
};

type EmailPaswordContextType = {
  emailPassword: EmailPassword;
  updateEmailPassword: (emailPassword: EmailPassword) => void;
};

const EmailPasswordContext = createContext<EmailPaswordContextType | null>(
  null
);

export const EmailPasswordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [emailPassword, setEmailPassword] = useState<EmailPassword>({
    email: "",
    password: "",
  });

  const updateEmailPassword = (emailPassoword: EmailPassword) => {
    setEmailPassword(emailPassoword);
  };

  return (
    <EmailPasswordContext.Provider
      value={{ emailPassword, updateEmailPassword }}
    >
      {children}
    </EmailPasswordContext.Provider>
  );
};

export const useEmailPassword = () => {
  const emailPasswordContext = useContext(EmailPasswordContext);

  if (!emailPasswordContext) {
    throw new Error("Must be within email provider");
  }

  return emailPasswordContext;
};

type UserType = {
  email: string;
  profileImageUrl: string;
};

type userTypeContext = {
  user: UserType;
  updateUser: (user: UserType) => void;
};

const userContext = createContext<userTypeContext | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, updateUserState] = useState<UserType>({
    email: "",
    profileImageUrl: "",
  });

  const updateUser = (user: UserType) => {
    updateUserState(user);
  };

  return (
    <userContext.Provider value={{ user, updateUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const userContextused = useContext(userContext);

  if (!userContextused) {
    throw new Error("Must be within email provider");
  }

  return userContextused;
};
