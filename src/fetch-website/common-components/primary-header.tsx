import * as React from "react";

type PrimaryHeaderProps = {
  icon: JSX.Element;
  label: string;
  button?: JSX.Element;
};

export const PrimaryHeader = ({ icon, label, button }: PrimaryHeaderProps) => {
  return (
    <div className="p-4 bg-green-200 rounded-t border-b border-green-900">
      <div className="flex text-green-900">
        {icon}
        <h1 className="font-bold ml-4 my-auto text-2xl text-green-900">
          {label}
        </h1>
        <div className="my-auto ml-auto mr-4">{button}</div>
      </div>
    </div>
  );
};
