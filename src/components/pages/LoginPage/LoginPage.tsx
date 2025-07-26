"use client";

import loginImage from "@/assets/images/login.png";
import { Input } from "@/components/ui/input";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { verifyToken } from "@/utils/verifyToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { JwtPayload } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

interface DecodedUser extends JwtPayload {
  role: string; // Add role explicitly
}

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPageComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

const router = useRouter();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: LoginFormData) => {
    const response = await handleAsyncWithToast(async () => {
      return loginMutation(data);
    });
    if (response?.data?.success) {
      const user = (await verifyToken(
        response?.data?.result?.accessToken
      )) as DecodedUser;
      await dispatch(
        setUser({
          user: user,
          access_token: response?.data?.result?.accessToken,
          refresh_token: "",
        })
      );
        router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex mb-5 lg:mb-0">
      {/* Left side - Phone mockup (hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 items-center justify-center p-8">
        <div className="fixed bottom-0 left-0 ">
          <Image
            src={loginImage}
            alt="VetCheck mobile app interface"
            width={700}
            height={900}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center lg:justify-start p-4 sm:p-6 lg:p-8">
        <div className=" w-full  max-w-xl space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-[48px]  text-[#004138] mb-4 md:mb-8 times-new-roman">
              VetCheck
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-[34px] font-bold text-[#171717] mb-3 tracking-[-1.2px]">
              Welcome, Admin! Manage{" "}
              <span className="text-[#004138] times-new-roman">VetCheck</span>{" "}
              with Ease.
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Monitor user activity, user engagement, and platform performance.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Email Field */}
            <div className="">
              <p className="text-sm font-medium text-gray-700 mb-2">Email</p>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className={`w-full px-3 py-3 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full px-3 py-3 pr-10 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300"
                  }`}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer bg-[#00473E] hover:bg-teal-700 text-white font-medium py-3 px-4 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Log In to Dashboard"}
            </button>
          </form>

          {/* Additional Links */}
          {/* <div className="text-center space-y-2">
            <a href="#" className="text-sm text-teal-600 hover:text-teal-700 hover:underline">
              Forgot your password?
            </a>
            <p className="text-xs text-gray-500">
              Don&apos;t have an account?{" "}
              <a href="#" className="text-teal-600 hover:text-teal-700 hover:underline">
                Contact your administrator
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
