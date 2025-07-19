import React from "react";

function Loader() {
  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="animate-spin h-15 w-15 border-dashed border-4 rounded-full"></div>
    </div>
  );
}

export default Loader;
