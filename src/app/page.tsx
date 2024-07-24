import { getSession } from "@/lib/utils/login-session-lib";
import React from "react";
import { redirect } from "next/navigation";

const Page = async () => {
	const session = await getSession();
	if (!session) {
		redirect("/companies");
	} // auth below, need to have further ellaboration
	return <>{/* <Credentials /> */}</>;
};

export default Page;
