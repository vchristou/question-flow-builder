
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);
  
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full mb-8">
      <div 
        className="bg-primary h-full rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
