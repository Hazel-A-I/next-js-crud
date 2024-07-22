import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import hashPassword from "./hash-password";
import { NextApiRequest, NextApiResponse } from "next";

const db = new PrismaClient();

export default async function credentialHandler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const { username, password }: { username: string; password: string } =
		req.body;

	try {
		const user = await db.credentials.findUnique({ where: { username } });

		if (!user) {
			return res.status(401).json({ error: "Invalid username or password" });
		}

		const hashedPassword: string = await hashPassword(password);

		const isMatch: boolean = await compare(hashedPassword, user.password);

		if (isMatch) {
			return res.json({ success: true });
		} else {
			return res.status(401).json({ error: "Invalid username or password" });
		}
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
