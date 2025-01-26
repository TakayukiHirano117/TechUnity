import React from "react";

import HeaderContent from "@/components/molecules/header/HeaderContent";
import { getUser } from "@/lib/fetcher/user";

const HeaderIndex = async () => {
  const user = await getUser();

  return <HeaderContent user={user} />;
};

export default HeaderIndex;
