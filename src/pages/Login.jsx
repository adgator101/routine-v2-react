import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Mail,
  Lock,
  Users,
  Zap,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!formData.password) {
      toast.error("Please enter your password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signIn.email({
        email: formData.email,
        password: formData.password, 
        callbackURL: "/",
      });

      toast.success("Logged in successfully!");
      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (error) {
      toast.error(error.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#F8F7FC] via-[#FFF5F8] to-[#F8F7FC]">
      {/* Navigation */}
      <nav className="fixed left-0 top-0 z-50 flex w-full items-center bg-gradient-to-r from-[#F8F7FC]/60 via-[#FFF5F8]/60 to-[#F8F7FC]/60 px-6 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img
            src="https://media.discordapp.net/attachments/1134751200651255879/1377511596443566131/image.png?ex=68393b25&is=6837e9a5&hm=8a6f532d6ed1fe48308e1aace5a49871537259c52c22fbe207c61d33d766d8c2&="
            alt="Logo"
            className="h-10"
          />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex h-screen items-center justify-center overflow-y-auto p-3 pt-16 font-manrope lg:pt-20">
        <div className="grid w-full max-w-7xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Section - Hero */}
          <div className="hidden space-y-6 lg:block">
            <div className="inline-block rounded-full bg-gradient-to-r from-[#f84178]/10 to-[#f84178]/5 px-3 py-1.5">
              <p className="text-xs font-semibold text-[#f84178]">
                🚀 Welcome Back
              </p>
            </div>
            <h1 className="flex flex-col gap-2 text-[2.5rem] font-bold leading-tight">
              <p>
                Get Back to Your{" "}
                <span className="bg-gradient-to-r from-[#f84178] to-[#ff6b9d] bg-clip-text text-transparent">
                  Schedule
                </span>
              </p>
              <p>in Seconds</p>
            </h1>
            <p className="text-base text-gray-600">
              Access your personalized routine, stay on top of your classes,
              and manage your academic life efficiently.
            </p>
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#f84178]/10 p-2">
                  <Zap className="h-4 w-4 text-[#f84178]" />
                </div>
                <p className="text-sm text-gray-700">
                  Instant access to your routine
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#f84178]/10 p-2">
                  <Users className="h-4 w-4 text-[#f84178]" />
                </div>
                <p className="text-sm text-gray-700">
                  Connect with classmates quickly
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#f84178]/10 p-2">
                  <Lock className="h-4 w-4 text-[#f84178]" />
                </div>
                <p className="text-sm text-gray-700">Secure & reliable</p>
              </div>
            </div>

            <div className="pt-8">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-[#f84178] hover:underline"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md border-none bg-white/80 shadow-2xl shadow-[#f84178]/5 backdrop-blur-sm">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="text-2xl font-bold lg:text-3xl">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-sm">
                  Sign in to your account
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-3.5">
                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="np...@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="h-10 pl-9 text-sm transition-all focus:ring-2 focus:ring-[#f84178]/20"
                      />
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-medium">
                        Password
                      </Label>
                      <Link
                        to="#"
                        className="text-xs text-[#f84178] hover:underline font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="h-10 pl-9 pr-9 text-sm transition-all focus:ring-2 focus:ring-[#f84178]/20"
                      />
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3 pt-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-10 w-full rounded-full bg-gradient-to-r from-[#f84178] to-[#ff6b9d] text-sm font-semibold text-white shadow-lg shadow-[#f84178]/30 transition-all hover:shadow-xl hover:shadow-[#f84178]/40 active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? (
                      "Signing in..."
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <div className="flex w-full items-center gap-3 text-gray-400">
                    <div className="h-px flex-1 bg-gray-300"></div>
                    <p className="text-xs">OR</p>
                    <div className="h-px flex-1 bg-gray-300"></div>
                  </div>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white py-2 transition-all hover:border-gray-300 hover:shadow-md active:scale-95"
                  >
                    <img
                      className="h-4 w-4"
                      src="https://cdn.iconscout.com/icon/free/png-512/free-google-logo-icon-download-in-svg-png-gif-file-formats--youtube-pack-logos-icons-1721659.png?f=webp&w=256"
                      alt="google"
                    />
                    <p className="text-xs font-medium text-gray-700">
                      Sign in with Google
                    </p>
                  </button>

                  <p className="text-center text-xs text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/auth/signup"
                      className="font-semibold text-[#f84178] hover:underline"
                    >
                      Create one
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
