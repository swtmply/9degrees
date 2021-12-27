import React from "react";

export default function Input({ name, type, label, data, setData }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="font-bold text-lg tracking-wide">{label}</label>
      <input
        className="w-full rounded-md border-b border-gray-300 outline-none py-2 px-5 bg-transparent focus:border-none"
        type={type}
        name={name}
        onChange={(e) => {
          setData({ ...data, [e.target.name]: e.target.value });
        }}
      />
    </div>
  );
}