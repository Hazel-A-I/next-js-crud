import prisma from "@/lib/utils/db";
import { License } from "@prisma/client";
import React from "react";

const LicenseDetails = async ({
	companyId,
	licenseId,
}: {
	companyId: number;
	licenseId: number;
}) => {
	const license: License | null = await prisma.license.findFirst({
		where: {
			companyId: companyId,
			id: licenseId,
		},
	});
	if (!license) {
		return <div>License not found.</div>;
	}
	const licenseCompany: { companyName: string } | null =
		await prisma.company.findFirst({
			where: {
				id: license.companyId,
			},
			select: {
				companyName: true,
			},
		});
	if (!licenseCompany) {
		return <div>Invalid license.</div>;
	}
	return (
		<div>
			<h2>Empresa: {licenseCompany.companyName}</h2>
			<ul>
				<li>Número: {license.number}</li>
				<li>Órgão Ambiental: {license.agency}</li>
				<li>Emissão: {license.issueDate.toLocaleDateString()}</li>
				<li>Validade: {license.validityDate.toLocaleDateString()}</li>
				<li>Added By: {license.addedBy}</li>
				<li>Added On: {license.addedOn.toLocaleDateString()}</li>
				<li>Last Change On: {license.lastChangeOn.toLocaleDateString()}</li>
			</ul>
		</div>
	);
};

export default LicenseDetails;
