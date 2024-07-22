import { hash, genSalt } from "bcrypt";

export default async function hashPassword(password: string): Promise<string> {
	if (!password) {
		throw new Error("Password cannot be empty");
	}
	const salt = await genSalt(10);
	return hash(password, salt);
}
