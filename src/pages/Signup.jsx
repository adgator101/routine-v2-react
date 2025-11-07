import React, { useState, useEffect } from "react";
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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ArrowRight,
  UserPlus,
  Mail,
  Lock,
  Users,
  Eye,
  EyeOff,
  Check,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth";

import { API_ENDPOINTS } from "@/config/apiConfig";
import axiosInstance from "@/services/axiosInterceptor";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [selectedGroup, setSelectedGroup] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.groupList);
      console.log(response.data);
      setGroupList(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        groupId: selectedGroup.id,
        callbackURL: "/",
      });

      // Store user group
      localStorage.setItem("user", JSON.stringify(selectedGroup));

      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (error) {
      toast.error(error.message || "Failed to create account");
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
              🎓 Join Our Community
            </p>
          </div>
          <h1 className="flex flex-col gap-2 text-[2.5rem] font-bold leading-tight">
            <p>
              Start Your Journey to{" "}
              <span className="bg-gradient-to-r from-[#f84178] to-[#ff6b9d] bg-clip-text text-transparent">
                Organized
              </span>
            </p>
            <p>College Life Today</p>
          </h1>
          <p className="text-base text-gray-600">
            Join hundreds of students who've transformed their academic
            planning. Smart schedules, better grades, more free time.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#f84178]/10 p-2">
                <Users className="h-4 w-4 text-[#f84178]" />
              </div>
              <p className="text-sm text-gray-700">
                Personalized course schedules
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#f84178]/10 p-2">
                <Mail className="h-4 w-4 text-[#f84178]" />
              </div>
              <p className="text-sm text-gray-700">Real-time notifications</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#f84178]/10 p-2">
                <UserPlus className="h-4 w-4 text-[#f84178]" />
              </div>
              <p className="text-sm text-gray-700">Connect with classmates</p>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md border-none bg-white/80 shadow-2xl shadow-[#f84178]/5 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-2xl font-bold lg:text-3xl">
                Create Account
              </CardTitle>
              <CardDescription className="text-sm">
                Fill in your details to get started
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-3.5">
                {/* Name Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-10 pl-9 text-sm transition-all focus:ring-2 focus:ring-[#f84178]/20"
                    />
                    <UserPlus className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>

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
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters"
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

                {/* Confirm Password Field */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="h-10 pl-9 pr-9 text-sm transition-all focus:ring-2 focus:ring-[#f84178]/20"
                    />
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                      <X className="h-3 w-3" />
                      Passwords do not match
                    </p>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <Check className="h-3 w-3" />
                      Passwords match
                    </p>
                  )}
                </div>

                {/* Group Selection */}
                <div className="space-y-2 rounded-lg bg-gradient-to-br from-[#f84178]/5 to-transparent p-3">
                  <Label className="text-sm font-medium">
                    Select Your Group
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {/* Batch Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex min-w-[120px] flex-1 items-center justify-between rounded-lg border-2 border-gray-200 bg-white px-3 py-2 text-gray-700 shadow-sm transition hover:border-[#f84178]/30 focus:outline-none focus:ring-2 focus:ring-[#f84178]/20">
                        <span className="text-xs font-medium">
                          {selectedGroup.name || "Group"}
                        </span>
                        <ChevronDown size={16} className="text-[#f84178]" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[120px] rounded-lg p-1">
                        {groupList.map((group) => (
                          <DropdownMenuItem
                            key={group.id}
                            onClick={() => {
                              setSelectedGroup(group);
                            }}
                            className="cursor-pointer rounded-md px-4 py-2 text-gray-700 hover:bg-[#f84178]/10 hover:text-[#f84178]"
                          >
                            {group.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {selectedGroup && (
                    <p className="text-sm font-medium text-[#f84178]">
                      ✓ Selected: {selectedGroup.name}
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-10 w-full rounded-full bg-gradient-to-r from-[#f84178] to-[#ff6b9d] text-sm font-semibold text-white shadow-lg shadow-[#f84178]/30 transition-all hover:shadow-xl hover:shadow-[#f84178]/40 active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    "Creating Account..."
                  ) : (
                    <>
                      Create Account
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
                    Sign up with Google
                  </p>
                </button>

                <p className="text-center text-xs text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="font-semibold text-[#f84178] hover:underline"
                  >
                    Login here
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

export default Signup;
