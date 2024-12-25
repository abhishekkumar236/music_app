"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useLayoutEffect } from "react";
import { redirect } from "next/navigation";

function WithAuth(Component: any) {
  return function WithAuthComponent(props: any) {
    const { user } = useAuth();

    useEffect(() => {
      if (!user) {
        redirect("/login");
      }
    }, [user]);

    return <Component {...props} />;
  };
}

export default WithAuth;
