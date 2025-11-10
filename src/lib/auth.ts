import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john.doe@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // This is where you'll call your Node.js backend to validate credentials.
        // The backend should return the user object along with JWT tokens.
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });
          const user = await res.json();
          // If the response is OK and we have a user object with an access token, proceed.
          if ( user && user.data?.accessToken) {
            return user.data;
          }
        } catch (error) {
          console.error("Authorize Error:", error);
          return null;
        }
        
        // Return null if authentication fails
        return null;
      },
    }),
  ],
  session: {
    // Use JSON Web Tokens for session management
    strategy: "jwt",
  },
  callbacks: {
    // This callback is called whenever a JWT is created or updated.
    async jwt({ token, user }) {
      // The 'user' object is only available on the initial sign-in.
      // We persist the access and refresh tokens from the user object to the JWT.
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    // This callback is called whenever a session is checked.
    async session({ session, token }) {
      // We pass the tokens from the JWT to the client-side session object.
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    // Redirect users to our custom sign-in page
    signIn: "/signin",
  },
};
