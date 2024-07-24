import React from "react";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/utils/db";
import { redirect } from "next/navigation";

const createCompany = async (formData: FormData) => {
	"use server";
	const rawCompanyData = {
		companyName: formData.get("companyName") as string,
		cnpj: formData.get("cnpj") as string,
		cep: formData.get("cep") as string,
		city: formData.get("city") as string,
		state: formData.get("state") as string,
		neighborhood: formData.get("neighborhood") as string,
		complement: formData.get("complement") as string,
		addedBy: formData.get("addedBy") as string,
	};
	await prisma.company.create({
		data: {
			...rawCompanyData,
			addedOn: new Date(),
			lastChangeOn: new Date(),
		},
	});

	revalidatePath("/companies");
	redirect("/companies");
};

const CompanyForm = () => {
	return (
		<form action={createCompany}>
			<div className="flex flex-col gap-2 w-full max-w-[50rem] text-black">
				<input
					type="text"
					placeholder="Nome da empresa"
					name="companyName"
					required
				/>
				<input type="text" placeholder="CNPJ" name="cnpj" required />
				<input type="text" placeholder="CEP" name="cep" required />
				<input type="text" placeholder="Cidade" name="city" required />
				<input type="text" placeholder="Estado" name="state" required />
				<input type="text" placeholder="Bairro" name="neighborhood" required />
				<input
					type="text"
					placeholder="Complemento"
					name="complement"
					required
				/>
				<input
					type="text"
					placeholder="Usuário (temporário)"
					name="addedBy"
					required
				/>
				<button type="submit" className="text-white">
					Enviar
				</button>
			</div>
		</form>
	);
};

export default CompanyForm;
