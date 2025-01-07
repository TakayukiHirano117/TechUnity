import React from "react";
import RecruitList from "../../molecules/RecruitList";
import { getAllRecruits } from "./fetcher";

const RecruitsIndex = async () => {
	const recruits = await getAllRecruits();

	return <RecruitList recruits={recruits} />;
};

export default RecruitsIndex;
