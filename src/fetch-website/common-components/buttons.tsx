import React from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export const PrimaryButton = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export const SecondaryButton = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
