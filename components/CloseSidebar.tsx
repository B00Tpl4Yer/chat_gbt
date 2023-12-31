import {
  AdjustmentsHorizontalIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import React from "react";

interface CloseSidebarProps {
  onClick: () => void;
}

const CloseSidebar: React.FC<CloseSidebarProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className="border-gray-700 border chatRow">
      <AdjustmentsHorizontalIcon className="h-5 w-5 text-white " />
    </div>
  );
};

export default CloseSidebar;
