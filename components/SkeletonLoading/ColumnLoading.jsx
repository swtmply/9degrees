import React from "react";

export default function ColumnLoading() {
  return (
    <div className="w-[80%] space-y-4">
      <div className="flex items-end space-x-4">
        <div className="w-[400px] aspect-square bg-gray-300 animate-pulse"></div>

        <div className="w-[60%] flex flex-col space-y-4">
          <div className="w-[30%] h-6 bg-gray-400 animate-pulse "></div>
          <div className="space-y-2">
            <div className="w-[60%] h-8 bg-gray-400 animate-pulse "></div>
            <div className="w-[30%] h-2 bg-gray-400 animate-pulse "></div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="h-4 bg-gray-400 animate-pulse  col-span-3"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
          </div>
        </div>
      </div>
      <div className="flex items-end space-x-4">
        <div className="w-[400px] aspect-square bg-gray-300 animate-pulse"></div>

        <div className="w-[60%] flex flex-col space-y-4">
          <div className="w-[30%] h-6 bg-gray-400 animate-pulse "></div>
          <div className="space-y-2">
            <div className="w-[60%] h-8 bg-gray-400 animate-pulse "></div>
            <div className="w-[30%] h-2 bg-gray-400 animate-pulse "></div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="h-4 bg-gray-400 animate-pulse  col-span-3"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
          </div>
        </div>
      </div>
      <div className="flex items-end space-x-4">
        <div className="w-[400px] aspect-square bg-gray-300 animate-pulse"></div>

        <div className="w-[60%] flex flex-col space-y-4">
          <div className="w-[30%] h-6 bg-gray-400 animate-pulse "></div>
          <div className="space-y-2">
            <div className="w-[60%] h-8 bg-gray-400 animate-pulse "></div>
            <div className="w-[30%] h-2 bg-gray-400 animate-pulse "></div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="h-4 bg-gray-400 animate-pulse  col-span-3"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
            <div className="h-4 bg-gray-400 animate-pulse  col-span-2"></div>
            <div className="h-4 bg-gray-400 animate-pulse "></div>
          </div>
        </div>
      </div>
    </div>
  );
}
