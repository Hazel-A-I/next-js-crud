import CompanyDetails from "@/components/company/CompanyDetails";
import prisma from "@/lib/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

const page = ({ params }: { params: { companyId: string } }) => {
	const deleteCompany = async (formData: FormData) => {
		"use server";
		const id: string = formData.get("id") as unknown as string;
		await prisma.company.delete({
			where: {
				id: parseInt(id),
			},
		});
		revalidatePath("/companies");
		redirect("/companies");
	};
	return (
		<form action={deleteCompany}>
			<div className="flex flex-col items-center">
				<a
					href="/companies"
					className="flex items-center justify-center font-bold my-5 h-8 w-20 bg-slate-600 text-white rounded-xl">
					Voltar.
				</a>
				<CompanyDetails companyId={parseInt(params.companyId)} />
				<div className="flex gap-4">
					<button>Editar</button>
					<input type="hidden" name="id" value={parseInt(params.companyId)} />
					<button type="submit">Deletar</button>
				</div>
			</div>
		</form>
	);
};

export default page;
