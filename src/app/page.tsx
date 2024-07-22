import CompanyDetails from "@/components/company/CompanyDetails";
import CompanyForm from "@/components/company/CompanyForm";
import CompanyList from "@/components/company/CompanyList";
import CompanyTile from "@/components/company/CompanyTile";
import Credentials from "@/components/Credentials";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LicenseDetails from "@/components/licenses/LicenseDetails";
import LicenseForm from "@/components/licenses/LicenseForm";
import LicenseList from "@/components/licenses/LicenseList";
import LicenseTile from "@/components/licenses/LicenseTile";
import { getSession } from "@/lib/utils/login-session-lib";
import React from "react";

const Page = async () => {
	const session = await getSession();
	return (
		<>
			<Credentials />
			<LicenseDetails />
			<LicenseForm />
			<LicenseList />
			<LicenseTile />
			<CompanyDetails />
			<CompanyForm />
			<CompanyList />
			<CompanyTile />
		</>
	);
};

export default Page;
