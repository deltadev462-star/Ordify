import React from "react";
import { ThemePreview } from "@/components/admin/ThemePreview";

const ThemePreviewDemo: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Theme Preview with Cart Demo</h1>
      <ThemePreview device="desktop" />
    </div>
  );
};

export default ThemePreviewDemo;