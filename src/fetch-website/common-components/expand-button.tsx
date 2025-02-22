import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as React from "react";

type ExpandButtonProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ExpandButton = ({ isOpen, setIsOpen }: ExpandButtonProps) => {
  const onClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button className={"rounded-full hover:bg-blue-100"} onClick={onClick}>
      <div className="h-8 w-8">
        {isOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </div>
    </button>
  );
};
