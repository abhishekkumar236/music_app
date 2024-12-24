"use client";
import React from "react";
import Image from "next/image";
import Form from "@/components/Form";
import fetchData from "@/utils/Fetch";
import endpoints from "@/networkConfig";
import { redirect } from "next/navigation";

function page() {
  const fields = [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter password",
      required: true,
    },
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    const data = await fetchData({
      url: endpoints.login,
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data?.status === 200) {
      localStorage.setItem("token", data?.token);
      redirect("/dashboard");
    }
  };
  return (
    <div className="flex justify-around items-center w-full h-full">
      <div className="w-full h-full">
        <Image
          src="/auth.jpg"
          alt="auth"
          width={1000}
          height={1000}
          className="w-full h-full object-cover"
          unoptimized
        />
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <Form
          title="Login"
          fields={fields}
          buttonText="Login"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default page;
