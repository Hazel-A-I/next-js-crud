import CompanyUpdateForm from "@/components/company/CompanyUpdateForm";
import { redirect } from "next/navigation";
import React from "react";

const page = ({ params }: { params: { companyId: string } }) => {
	return (
		<div className="flex flex-col items-center">
			<a
				href={`/companies/${params.companyId}`}
				className="flex items-center justify-center font-bold my-5 h-8 w-20 bg-slate-600 text-white rounded-xl">
				Voltar.
			</a>
			<CompanyUpdateForm companyId={params.companyId} />
		</div>
	);
};

export default page;
