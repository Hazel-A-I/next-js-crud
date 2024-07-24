import React from "react";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/utils/db";
import { redirect } from "next/navigation";

const createLicense = async (formData: FormData) => {
	"use server";

	const id: string = formData.get("id") as string;

	const issueDate = new Date(formData.get("issueDate") as string);
	const validityDate = new Date(formData.get("validityDate") as string);
	const issueDateISO = issueDate.toISOString();
	const validityDateISO = validityDate.toISOString();
	const rawLicenseData = {
		number: formData.get("number") as string,
		agency: formData.get("agency") as string,
		issueDate: issueDateISO,
		validityDate: validityDateISO,
		addedBy: formData.get("addedBy") as string,
	};
	await prisma.license.create({
		data: {
			company: {
				connect: { id: parseInt(id) },
			},
			...rawLicenseData,
			addedOn: new Date(),
			lastChangeOn: new Date(),
		},
	});

	revalidatePath(`/companies/${id}`);
	revalidatePath("/companies");
	redirect(`/companies/${id}`);
};

const LicenseForm = ({ companyId }: { companyId: string }) => {
	return (
		<form action={createLicense}>
			<div className="flex flex-col gap-2 w-full max-w-[50rem] text-black">
				<input type="text" placeholder="Número" name="number" required />
				<input
					type="text"
					placeholder="Órgão Ambiental"
					name="agency"
					required
				/>
				<input
					type="datetime-local"
					placeholder="Emissão"
					name="issueDate"
					required
				/>
				<input
					type="datetime-local"
					placeholder="Validade"
					name="validityDate"
					required
				/>
				<input
					type="text"
					placeholder="Usuário (temporário)"
					name="addedBy"
					required
				/>
				<input type="hidden" name="companyId" value={parseInt(companyId)} />

				<button type="submit" className="text-white">
					Enviar
				</button>
			</div>
		</form>
	);
};

export default LicenseForm;
