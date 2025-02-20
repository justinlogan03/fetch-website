import { Avatar } from "@mui/material";
import * as React from "react";

type ImageCellProps = {
  alt: string;
  imgUrl: string;
};

export const ImageCell = ({ alt, imgUrl }: ImageCellProps) => {
  return <Avatar alt={alt} src={imgUrl} />;
};
