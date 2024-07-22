import hashPassword from "@/lib/utils/hash-password";
import { Prisma, PrismaClient } from "@prisma/client";
import { config as envConfig } from "dotenv";
envConfig();
const db = new PrismaClient();

async function main() {
	const credentials: Prisma.BatchPayload = await db.credentials.createMany({
		data: [
			{
				username: "John Doe",
				password: await hashPassword(process.env.INTERVIEW_PASSWORD),
			},
			{
				username: "Jane Doe",
				password: await hashPassword(process.env.SECOND_USER_PASSWORD),
			},
		],
	});
	const companies: Prisma.BatchPayload = await db.company.createMany({
		data: [
			{
				companyName: "Acme Corporation",
				cnpj: "12345678901234",
				cep: "88888-888",
				city: "Blumenau",
				state: "SC",
				neighborhood: "Centro",
				complement: "Rua das Flores, 123",
				addedBy: "John Doe",
				addedOn: new Date(),
				lastChangeOn: new Date(),
			},
			{
				companyName: "Lethal Company",
				cnpj: "98765432109876",
				cep: "40028-922",
				city: "São Paulo",
				state: "SP",
				neighborhood: "Jardins",
				complement: "Avenida Paulista, 69",
				addedBy: "Jane Doe",
				addedOn: new Date(),
				lastChangeOn: new Date(),
			},
		],
	});
	const licenses: Prisma.BatchPayload = await db.license.createMany({
		data: [
			{
				companyId: 1,
				number: "ABC-12345",
				agency: "SEMA",
				issueDate: new Date("2023-07-19"),
				validityDate: new Date("2024-07-19"),
				addedBy: "John Doe",
				addedOn: new Date(),
				lastChangeOn: new Date(),
			},
			{
				companyId: 1,
				number: "DEF-67890",
				agency: "IBAMA",
				issueDate: new Date("2022-01-01"),
				validityDate: new Date("2025-12-31"),
				addedBy: "John Doe",
				addedOn: new Date(),
				lastChangeOn: new Date(),
			},
			{
				companyId: 2,
				number: "GHI-12345",
				agency: "SEMA",
				issueDate: new Date("2021-10-10"),
				validityDate: new Date("2024-09-09"),
				addedBy: "John Doe",
				addedOn: new Date(),
				lastChangeOn: new Date(),
			},
		],
	});
	console.log(
		`Seeding done with: ${credentials.count} credentials, ${companies.count} companies and ${licenses.count} licenses.`,
	);
}
main() // i kinda like promises due to not looking too messy like a try catch
	.catch((e) => {
		console.error("Error seeding database:", e);
		process.exit(1);
	})
	.finally(async () => {
		await db.$disconnect();
	});
// prisma db seed (its on package.json)
