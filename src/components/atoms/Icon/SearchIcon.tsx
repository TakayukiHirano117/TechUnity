import React, { memo } from "react";
import { IoSearch } from "react-icons/io5";

import { SearchIconProps } from "@/types/types";

const SearchIcon = memo(({ className }: SearchIconProps) => {
  return <IoSearch className={className} />;
});

SearchIcon.displayName = "SearchIcon";

export default SearchIcon;
