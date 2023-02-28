// backend api route for signing up a new user

import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../../lib/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {

    const { email, password } = req.body;
    try {const user = await prisma.user.create({
        data: {
        fullName: "John Doe",
        email,
        password,
        },
    })
    console.log("🚀 ~ file: signup.ts:21 ~ user:", user)
    return res.status(200).json(user);
}
    catch (error: unknown) {
        console.log("🚀 ~ file: signup.ts:24 ~ error:", error)
        return res.status(400).json({ message: error });
    }
    }
