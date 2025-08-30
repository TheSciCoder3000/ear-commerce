import React from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}
const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      sizes="100vw"
      width={0}
      height={0}
      className={cn("object-cover", className)}
    />
  );
};

export default Image;
