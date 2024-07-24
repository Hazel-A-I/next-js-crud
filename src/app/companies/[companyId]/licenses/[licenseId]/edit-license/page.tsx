import CompanyUpdateForm from "@/components/company/CompanyUpdateForm";
import LicenseUpdateForm from "@/components/licenses/LicenseUpdateForm";
import { redirect } from "next/navigation";
import React from "react";

const page = ({
	params,
}: {
	params: { companyId: string; licenseId: string };
}) => {
	return (
		<div className="flex flex-col items-center">
			<a
				href={`/companies/${params.companyId}`}
				className="flex items-center justify-center font-bold my-5 h-8 w-20 bg-slate-600 text-white rounded-xl">
				Voltar.
			</a>
			<LicenseUpdateForm
				companyId={params.companyId}
				licenseId={params.licenseId}
			/>
		</div>
	);
};

export default page;
