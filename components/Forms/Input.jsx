import React from "react";

export default function Input({ name, type, label, data, setData }) {
  return (
    <div className="flex w-full justify-between rounded-md px-8 py-4">
      <label className="font-semibold text-xl">{label}</label>
      <input
        className="w-[60%] !font-bold text-lg rounded focus:ring-transparent focus:border-padeepBlue focus:border-2 border-2 outline-none"
        type={type}
        name={name}
        value={data[name]}
        onChange={(e) => {
          setData({ ...data, [e.target.name]: e.target.value });
        }}
      />
    </div>
  );
}
