import React from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

const disabledClassname =
  "text-white font-bold py-2 px-4 rounded bg-gray-400 cursor-not-allowed";

export const PrimaryButton = ({
  label,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const defaultClassname =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

  return (
    <button
      className={disabled ? disabledClassname : defaultClassname}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export const SecondaryButton = ({
  label,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const defaultClassname =
    "bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";

  return (
    <button
      className={disabled ? disabledClassname : defaultClassname}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
