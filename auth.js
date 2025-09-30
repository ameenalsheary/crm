// auth.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // 1️⃣ Sign-in callback: create user if not exists
    async signIn({ user, profile }) {
      try {
        await connectDB();
        let existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          existingUser = await User.create({
            firstName: profile.given_name || "User",
            lastName: profile.family_name || "Private",
            email: user.email,
          });
        }
        // Attach DB user info to user object for JWT callback
        user.id = existingUser._id.toString();
        user.role = existingUser.role;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Prevent sign-in on error
      }
      return true;
    },

    // 2️⃣ JWT callback: store role once in token
    async jwt({ token, user }) {
      if (user) {
        // Only set role and id when user signs in
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },

    // 3️⃣ Session callback: expose role and id to client
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },
});
