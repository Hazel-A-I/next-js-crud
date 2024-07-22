import { compare } from "bcrypt";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";
import hashPassword from "./hash-password";
import { config } from "dotenv";
config();

const db = new PrismaClient();
const secretKey = process.env.SECRET_KEY_SESSION;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("5 min from now")
		.sign(key);
}

export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ["HS256"],
	});
	return payload;
}

export async function login(formData: FormData) {
	const username = (formData.get("username") ?? "").toString();
	const password = (formData.get("password") ?? "").toString();
	const usernameRegex = /^[a-zA-Z0-9_]+$/;

	if (!usernameRegex.test(username)) {
		throw new Error("O nome de usuário contém caracteres inválidos");
	}

	const user = await db.credentials.findUnique({
		where: {
			username,
		},
	});
	if (!user) {
		throw "Nome de usuário ou senha inválidos";
	}
	const hashedPassword: string = await hashPassword(password);
	const isMatch = await compare(password, user.password);
	if (isMatch) {
	} else {
		throw "Nome de usuário ou senha inválidos";
	}
	const expires = new Date(Date.now() + 300 * 1000);
	const session = await encrypt({ user, expires });
	cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
	cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
	const session = cookies().get("session")?.value;
	if (!session) return null;
	return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
	const session = request.cookies.get("session")?.value;
	if (!session) return;

	// refresh the session so it doesn't expire
	const parsed = await decrypt(session);
	parsed.expires = new Date(Date.now() + 300 * 1000);
	const res = NextResponse.next();
	res.cookies.set({
		name: "session",
		value: await encrypt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});
	return res;
}
