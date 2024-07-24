import prisma from "@/lib/utils/db";
import { Company } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const CompanyDetails = async ({ companyId }: { companyId: number }) => {
	const company: Company | null = await prisma.company.findFirst({
		where: {
			id: companyId,
		},
	});
	if (!company) {
		return <div>Company not found.</div>;
	}
	return (
		<div>
			<h2>{company.companyName}</h2>
			<ul>
				<li>CNPJ: {company.cnpj}</li>
				<li>City: {company.city}</li>
				<li>State: {company.state}</li>
				<li>Neighborhood: {company.neighborhood}</li>
				<li>Complement: {company.complement}</li>
				<li>Added By: {company.addedBy}</li>
				<li>Added On: {company.addedOn.toLocaleDateString()}</li>
				<li>Last Change On: {company.lastChangeOn.toLocaleDateString()}</li>
			</ul>
		</div>
	);
};

export default CompanyDetails;
