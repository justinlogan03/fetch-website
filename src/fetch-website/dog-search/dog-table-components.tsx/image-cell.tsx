import { Avatar } from "@mui/material";
import * as React from "react";

type ImageCellProps = {
  alt: string;
  imgUrl: string;
  size?: number;
};

export const ImageCell = ({ alt, imgUrl, size }: ImageCellProps) => {
  return <Avatar alt={alt} src={imgUrl} sx={{ width: size, height: size }} />;
};
