import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const Page = () => {
  return (
    <ProtectedRoute>
      <div className="flex  items-center justify-center h-screen p-4  flex-1">
        <h1>Budget</h1>
      </div>
    </ProtectedRoute>
  );
};

export default Page;
