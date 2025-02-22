import * as React from "react";

type SecondaryHeaderProps = {
  label: string;
  pillLabel?: string;
  button?: JSX.Element;
};

export const SecondaryHeader = ({
  label,
  pillLabel,
  button,
}: SecondaryHeaderProps) => {
  return (
    <div className="flex bg-gray-100 border">
      <div className="flex">
        <h3 className="p-4 font-bold">{label}</h3>
        {pillLabel && (
          <div className="flex">
            <div className=" bg-blue-100 rounded-full my-auto px-3 py-1 text-xs font-bold text-blue-600">
              {pillLabel}
            </div>
          </div>
        )}
      </div>
      <div className="my-auto ml-auto mr-4">{button}</div>
    </div>
  );
};
