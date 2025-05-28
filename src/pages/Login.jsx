import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const Login = () => {
  return (
    <div>
        <Card className="grid lg:grid-cols-2 gap-10 p-3 lg:p-20 items-center min-h-screen rounded-none bg-[#F8F7FC] font-manrope">
          <div className="space-y-7 hidden lg:block">
            <h1 className="font-bold text-[3rem]">Sign Up to Manage Your Studies & Stay Organized</h1>
            <p>If you don't have an account you can <span className="text-[#f84178] font-bold cursor-pointer">Register here!</span></p>
          </div>
          <div className="flex flex-col gap-10">
            <CardHeader className="p-0">
              <CardTitle className="text-3xl lg:text-4xl">Welcome User</CardTitle>
            </CardHeader>
            <CardContent className="text-left w-full xl:w-1/2 p-0">
              <Label htmlFor="email" className="text-lg">
                Email
              </Label>
              <Input type="email" placeholder="e.g. np...@gmail.com" />
              <div className="p-3"></div>
              <Label htmlFor="password" className="text-lg">
                Password
              </Label>
              <Input type="password" placeholder="" />
            </CardContent>
            <div>
            <Button
              onClick={() => setIsLogin(true)}
              className="px-10 py-5 bg-[#f84178] hover:bg-[#f84178] shadow-[0_2px_5px_#f84178] active:scale-90 rounded-full transition w-full xl:w-1/2"
            >
              Login
            </Button>
            <div className="flex items-center justify-evenly text-gray-400 w-full my-5 xl:w-1/2">
              <div className="flex-shrink-0 h-0.5 w-1/3 bg-gray-300"></div>
              <p>OR</p>
              <div className="flex-shrink-0 h-0.5 w-1/3 bg-gray-300"></div>
            </div>
            <CardFooter>
              <a
                href=""
                className="p-3 shadow-[0_1px_3px_gray] rounded-xl active:scale-90 transition flex items-center gap-3 xl:w-1/2 w-full justify-center"
              >
                <img
                  className="w-5 h-5"
                  src="https://cdn.iconscout.com/icon/free/png-512/free-google-logo-icon-download-in-svg-png-gif-file-formats--youtube-pack-logos-icons-1721659.png?f=webp&w=256"
                  alt="google"
                />
                <p className="text-gray-500 text-sm">Login with Google</p>
              </a>
            </CardFooter>
            </div>
          </div>
        </Card>
    </div>
  );
};

export default Login;
