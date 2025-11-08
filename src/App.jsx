import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import { toast } from "react-hot-toast";
import MainLayout from "./components/MainLayout";
import ToDo from "./pages/ToDo";
import AboutPage from "./pages/AboutPage";
import Admin from "@/pages/Admin.jsx";
import Dashboard from "@/components/admin/Dashboard.jsx";
import Users from "@/components/admin/Users.jsx";
import Groups from "@/components/admin/Groups";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  AuthenticatedRoute,
  UnauthenticatedRoute,
  PublicRoute,
} from "@/components/RouteGuards";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIsIOS(isIOSDevice);

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      toast(
        (t) => (
          <div>
            <p>Install our app for a better experience!</p>
            <button
              onClick={() => {
                handleInstallClick();
                toast.dismiss(t.id);
              }}
            >
              Install Now
            </button>
          </div>
        ),
        {
          duration: 6000,
          position: "bottom-center",
        },
      );
    });
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
        toast.success("App installed successfully!");
      }
    }
  };

  useEffect(() => {
    if (isIOS) {
      toast(
        (t) => (
          <div>
            <p>
              To install on iOS: tap share button{" "}
              <span role="img" aria-label="share">
                ⬆️
              </span>
              then "Add to Home Screen"{" "}
              <span role="img" aria-label="plus">
                ➕
              </span>
            </p>
          </div>
        ),
        {
          duration: 6000,
          position: "bottom-center",
        },
      );
    }
  }, [isIOS]);

  return (
    <div className="routine-wrapper dark:bg-dark dark:text-white">
      <Routes>
        <Route element={<UnauthenticatedRoute />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>
        <Route element={<AuthenticatedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/todo" element={<ToDo />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Route>
        <Route element={<AuthenticatedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="groups" element={<Groups />} />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
