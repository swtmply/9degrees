import React from "react";

export default function NineDegreesArticle() {
  return (
    <div className="w-full flex justify-center">
      <div className="lg:max-w-[1280px] flex space-x-4">
        <div className="w-[400px] h-[450px] bg-gray-200"></div>

        <div className="flex flex-col space-y-4">
          <div className="w-[100px] h-[50px] bg-gray-200"></div>
          <div className="w-[600px] h-[150px] bg-gray-200"></div>
          <div className="w-[200px] h-[50px] bg-gray-200"></div>
          <div className="w-[1000px] h-[50px] bg-gray-200"></div>
          <div className="w-[400px] h-[100px] bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
