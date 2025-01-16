import React from "react";

import Header from "./Header";

const getUser = async () => {
  const res = await fetch("http://localhost:3000/api/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // console.log("res: " + res)

  return res.json();
};

const HeaderWrapper = async () => {
  const user = await getUser();

  return <Header user={user || ""} />;
};

export default HeaderWrapper;
