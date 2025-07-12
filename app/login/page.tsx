"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Recycle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const matchedUser = users.find(
        (user: any) => user.email === email && user.password === password
      );

      if (!matchedUser) {
        alert("Invalid email or password");
        setIsLoading(false);
        return;
      }

      // Save session
      localStorage.setItem("currentUser", JSON.stringify(matchedUser));
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <Card
        className={`w-full max-w-md transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-95"
        }`}
      >
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4 group">
            <Recycle className="h-8 w-8 text-green-600 transition-transform duration-500 group-hover:rotate-180" />
            <span className="text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-600">
              ReWear
            </span>
          </div>
          <CardTitle className="text-2xl transition-colors duration-300 hover:text-green-600">
            Welcome Back
          </CardTitle>
          <CardDescription className="transition-colors duration-300 hover:text-gray-700">
            Sign in to your account to continue swapping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 group">
              <Label
                htmlFor="email"
                className="transition-colors duration-300 group-focus-within:text-green-600"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                required
              />
            </div>
            <div className="space-y-2 group">
              <Label
                htmlFor="password"
                className="transition-colors duration-300 group-focus-within:text-green-600"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-all duration-300 focus:scale-105 focus:shadow-lg"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-green-600 hover:underline transition-all duration-300 hover:text-green-700"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-green-600 hover:underline font-medium transition-all duration-300 hover:text-green-700"
              >
                Sign up
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
