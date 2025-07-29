/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentToken,  } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";

const WithAuthForAdmin = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const token = useAppSelector(useCurrentToken); // Check for token
  const user: any | null = token ? verifyToken(token) : null;

  useEffect(() => {
    if (!token || !user) {
      router.replace("/auth/login"); // Redirect if not authenticated
    } else {
      setLoading(false); // Stop loading once authenticated
    }
  }, [router, token, user, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  return children;
};

export default WithAuthForAdmin;
