import CompanyDetails from "@/components/company/CompanyDetails";
import LicenseList from "@/components/licenses/LicenseList";
import prisma from "@/lib/utils/db";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

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
const page = ({ params }: { params: { companyId: string } }) => {
	return (
		<form action={deleteCompany}>
			<div className="flex flex-col items-center">
				<a
					href="/companies"
					className="flex items-center justify-center font-bold my-5 h-8 w-20 bg-slate-600 text-white rounded-xl">
					Voltar.
				</a>
				<CompanyDetails companyId={parseInt(params.companyId)} />
				<div className="flex gap-4 p-2">
					<Link
						className="border border-white px-2 py-1"
						href={`/companies/${params.companyId}/edit-company`}>
						Editar
					</Link>
					<input type="hidden" name="id" value={parseInt(params.companyId)} />
					<button type="submit" className="border border-white px-2 py-1">
						Deletar
					</button>
				</div>
				<a
					href={`/companies/${params.companyId}/licenses/add-new-license`}
					className="flex items-center justify-center text-center font-bold mt-5 h-16 w-20 bg-slate-600 text-white rounded-xl">
					Criar licença
				</a>
				<LicenseList companyId={parseInt(params.companyId)} />
			</div>
		</form>
	);
};

export default page;
