import { FC } from "react";

interface IconMenuDatatablesProps {
  className?: string;
}

const IconMenuDatatables: FC<IconMenuDatatablesProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 4H20V20H4V4Z" fill="currentColor" />
      <path d="M8 8H16V10H8V8Z" fill="white" />
      <path d="M8 12H16V14H8V12Z" fill="white" />
      <path d="M8 16H12V18H8V16Z" fill="white" />
    </svg>
  );
};

export default IconMenuDatatables;
