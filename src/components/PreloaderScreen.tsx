
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

interface PreloaderScreenProps {
  onComplete: () => void;
  progress?: number;
}

const PreloaderScreen: React.FC<PreloaderScreenProps> = ({
  onComplete,
  progress = 100,
}) => {
  const [interacted, setInteracted] = useState(false);

  const handleEnterClick = () => {
    setInteracted(true);
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-orange-500 mb-2">
            Modern Brand
          </h1>
          <p className="text-lg text-gray-400">Experience the showcase</p>
        </div>

        <div className="space-y-4">
          {!interacted ? (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Loading resources...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="py-4">
                <Skeleton className="h-8 w-full mb-2" />
                <Skeleton className="h-8 w-3/4" />
              </div>
              
              <Button 
                onClick={handleEnterClick}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              >
                ENTER SITE
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                Click "ENTER SITE" to enable sound
              </p>
            </>
          ) : (
            <div className="text-center">
              <div className="animate-pulse text-orange-500">Loading...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreloaderScreen;
