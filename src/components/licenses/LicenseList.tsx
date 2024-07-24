import Link from "next/link";
import prisma from "@/lib/utils/db";

async function LicenseList({ companyId }: { companyId: number }) {
	const licenses = await prisma.license.findMany({
		where: {
			companyId: companyId,
		},
	});
	return (
		<div className="flex flex-col w-full items-center mt-16 gap-16">
			<h1>Licenças da empresa</h1>
			<ul className="border border-white w-full max-w-[50rem] mx-8 bg-slate-900">
				{licenses.map((license) => (
					<li key={license.id}>
						<Link
							href={`/companies/${companyId}/licenses/${license.id}`}
							className="flex gap-5 justify-between items-center px-[2rem] border-y-white border h-fit">
							{license.agency}{" "}
							<div>
								<p>{license.number}</p>
								<h3>Clique para ver detalhes da licença</h3>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default LicenseList;
