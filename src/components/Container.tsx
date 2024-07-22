import React from "react";

type containerChild = {
	children: React.ReactNode;
};

const MyContainer = ({ children }: containerChild) => {
	return <div className="mt-16 w-full max-w-[90rem]">{children}</div>;
};

export default MyContainer;
