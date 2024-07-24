import React from "react";
import CompanyList from "@/components/company/CompanyList";
const Page = () => {
	return (
		<div className="flex flex-col items-center">
			<a
				href="/companies/add-new-company"
				className="flex items-center justify-center text-center font-bold mt-5 h-16 w-20 bg-slate-600 text-white rounded-xl">
				Criar empresa
			</a>
			<CompanyList />
		</div>
	);
};

export default Page;
