"use client";

import { getUser, loginUser } from "@/api/auth";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const test = true;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const data = await getUser();
        console.log("this is data", data);
        setUser(data);
      } catch (err) {
        console.log("This is err", err);
        setUser(null);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AuthContext.Provider value={{ isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
