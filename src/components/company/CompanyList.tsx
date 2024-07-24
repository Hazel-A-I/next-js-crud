import Link from "next/link";
import prisma from "@/lib/utils/db";

async function CompanyList() {
	const companies = await prisma.company.findMany();
	return (
		<div className="flex flex-col w-full items-center mt-16 gap-16">
			<h1>Empresas</h1>
			<ul className="border border-white w-full max-w-[50rem] mx-8 bg-slate-900">
				{companies.map((company) => (
					<li key={company.id}>
						<Link
							href={`/companies/${company.id}`}
							className="flex gap-5 justify-between items-center px-[2rem] border-y-white border h-fit">
							{company.companyName}{" "}
							<div>
								<p>
									{company.city} - {company.state}
								</p>
								<h3>Clique para ver detalhes e licenças</h3>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default CompanyList;
