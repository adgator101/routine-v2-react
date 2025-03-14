import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-100 to-sky-100 font-poppins">
        <Card className="m-3 flex flex-col items-center p-3 text-center">
          <CardHeader>
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription>Please Login to continue</CardDescription>
          </CardHeader>
          <CardContent className="mt-5 space-y-1 text-left sm:w-96">
            <Label htmlFor="email" className="">
              Enter email
            </Label>
            <Input
              type="email"
              placeholder="e.g. np...@gmail.com"
              className="focus-visible:ring-0"
            />
            <div className="h-7"></div>
            <Label htmlFor="password" className="">
              Enter password
            </Label>
            <div className="relative">
              <Input
                type={!isVisible && "password"}
                placeholder=""
                className="pr-10 focus-visible:ring-0"
              />
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="absolute right-2 top-2 text-gray-700"
              >
                {!isVisible ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </CardContent>
          <Button
            onClick={() => setIsLogin(true)}
            className="rounded-full bg-[#f84178] px-10 py-5 shadow-[0_2px_5px_#f84178] transition hover:bg-[#f84178] active:scale-90"
          >
            Login
          </Button>
          <div className="my-5 flex w-full items-center justify-evenly text-gray-400">
            <div className="h-0.5 w-1/3 flex-shrink-0 bg-gray-300"></div>
            <p>OR</p>
            <div className="h-0.5 w-1/3 flex-shrink-0 bg-gray-300"></div>
          </div>
          <CardFooter>
            <a
              href=""
              className="flex items-center gap-3 rounded-xl p-3 shadow-[0_1px_3px_gray] transition active:scale-90"
            >
              <img
                className="h-5 w-5"
                src="https://cdn.iconscout.com/icon/free/png-512/free-google-logo-icon-download-in-svg-png-gif-file-formats--youtube-pack-logos-icons-1721659.png?f=webp&w=256"
                alt="google"
              />
              <p className="text-sm text-gray-500">Login with Google</p>
            </a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
