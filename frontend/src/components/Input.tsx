import React from "react";

function Input() {
  return (
    <form className="flex flex-row space-x-4 w-full max-w-2xl">
      <input
        type="text"
        placeholder="Enter youtube link for song"
        className="bg-black h-14 border focus:outline-none focus:border-btn rounded-2xl w-full px-6"
      />
      <button className="bg-btn h-14 w-32 rounded-full text-xl shadow-xl hover:shadow-[0_0_15px_#FF2E43] transition-shadow duration-300">
        Add
      </button>
    </form>
  );
}

export default Input;
