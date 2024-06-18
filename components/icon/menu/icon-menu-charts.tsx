import { FC } from "react";

interface IconMenuChartsProps {
  className?: string;
}

const IconMenuCharts: FC<IconMenuChartsProps> = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.485 2 2 6.485 2 12C2 17.515 6.485 22 12 22C17.515 22 22 17.515 22 12C22 6.485 17.515 2 12 2Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M15 11H13V9C13 8.44771 12.5523 8 12 8C11.4477 8 11 8.44771 11 9V11H9C8.44771 11 8 11.4477 8 12C8 12.5523 8.44771 13 9 13H11V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V13H15C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11Z"
        fill="currentColor"
      />
      <path
        d="M16.5 19H7.5C7.08579 19 6.75 18.6642 6.75 18.25C6.75 17.8358 7.08579 17.5 7.5 17.5H16.5C16.9142 17.5 17.25 17.8358 17.25 18.25C17.25 18.6642 16.9142 19 16.5 19Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconMenuCharts;
