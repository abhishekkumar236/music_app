"use client";

import Input from "@/components/Input";
import List from "@/components/List";
import Video from "@/components/Video";
import WithAuth from "@/utils/PrivateRoutes";
import React from "react";

function Dashboard() {
  return (
    <div className="flex flex-row justify-between">
      <div className="w-full mt-10">
        <Video />
      </div>
      <div className="flex justify-center w-full">
        <div className="w-full flex flex-col items-center justify-center">
          <Input />
          <List />
        </div>
      </div>
    </div>
  );
}

export default WithAuth(Dashboard);
