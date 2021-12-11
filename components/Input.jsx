import React from "react";

export default function Input({ name, type, label, data, setData }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="font-bold text-xl tracking-wide">{label}:</label>
      <input
        className="border-b border-gray-300 outline-none p-2 bg-transparent focus:border-black"
        type={type}
        name={name}
        onChange={(e) => {
          setData({ ...data, [e.target.name]: e.target.value });
        }}
      />
    </div>
  );
}
