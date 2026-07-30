import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-400 shadow-lg">
        {/* LH Logo */}
        <span className="text-3xl font-black tracking-tight text-black">L</span>

        <span className="absolute left-10 top-9 text-2xl font-black text-white">
          H
        </span>

        {/* Subtle Pulse */}
        <span className="absolute inset-0 animate-ping rounded-2xl border border-yellow-500 opacity-70"></span>
      </div>
    </div>
  );
};

export default Loader;
