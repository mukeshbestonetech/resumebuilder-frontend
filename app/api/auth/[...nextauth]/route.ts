import { authOptions } from "@/src/lib/auth";
import NextAuth from "next-auth";

// The handler exposes the authOptions to NextAuth.js.
// It creates the /api/auth/* routes (e.g., /api/auth/signin, /api/auth/session).
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
