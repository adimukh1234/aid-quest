
import React from "react";
import { Link } from "react-router-dom";
import { AidQuestLogo } from "@/components/ui/icons";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <AidQuestLogo className="h-6 w-6" />
      <span className="font-bold">AidQuest</span>
    </Link>
  );
};

export default Logo;
