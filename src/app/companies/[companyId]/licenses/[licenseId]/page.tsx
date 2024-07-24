import React from "react";
import LicenseDetails from "@/components/licenses/LicenseDetails";
import prisma from "@/lib/utils/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

const deleteLicense = async (formData: FormData) => {
	"use server";
	const companyId: string = formData.get("companyId") as string;
	const licenseId: string = formData.get("licenseId") as string;
	await prisma.license.delete({
		where: {
			id: parseInt(licenseId),
		},
	});
	revalidatePath(`/companies/${companyId}`);
	redirect(`/companies/${companyId}`);
};

const Page = ({
	params,
}: {
	params: { companyId: string; licenseId: string };
}) => {
	return (
		<form action={deleteLicense}>
			<div className="flex flex-col items-center">
				<a
					href={`/companies/${params.companyId}`}
					className="flex items-center justify-center font-bold my-5 h-8 w-20 bg-slate-600 text-white rounded-xl">
					Voltar.
				</a>
				<LicenseDetails
					companyId={parseInt(params.companyId)}
					licenseId={parseInt(params.licenseId)}
				/>
				<div className="flex gap-4 p-2">
					<Link
						className="border border-white px-2 py-1"
						href={`/companies/${params.companyId}/licenses/${params.licenseId}/edit-license`}>
						Editar
					</Link>
					<input
						type="hidden"
						name="companyId"
						value={parseInt(params.companyId)}
					/>
					<input
						type="hidden"
						name="licenseId"
						value={parseInt(params.licenseId)}
					/>
					<button type="submit" className="border border-white px-2 py-1">
						Deletar
					</button>
				</div>
			</div>
		</form>
	);
};

export default Page;
