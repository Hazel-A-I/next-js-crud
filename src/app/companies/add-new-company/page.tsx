import CompanyForm from "@/components/company/CompanyForm";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
	return (
		<div className="flex flex-col items-center">
			<a
				href="/companies"
				className="flex items-center justify-center font-bold my-5 h-8 w-20 bg-slate-600 text-white rounded-xl">
				Voltar.
			</a>
			<CompanyForm />
		</div>
	);
};

export default page;
