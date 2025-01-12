import React from "react";

const getUser = async () => {
  const res = await fetch("http://localhost:3000/api/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
};


const HeaderWrapper = async () => {
  const user = await getUser();
  console.log(user);

  return <div></div>;
};

export default HeaderWrapper;
