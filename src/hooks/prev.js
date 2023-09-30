import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async signIn(user, account, profile) {
      // This callback is triggered when a user successfully signs in
      // You can customize it to send user information to your signup endpoint
      if (account.provider === "google") {
        // Extract user information
        const { email, name } = user;

        try {
          // Send a POST request to your existing signup endpoint
          console.log(email, "from email");
          // const response = await fetch("/api/signup", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({ email, name }),
          // });

          // if (response.ok) {
          //   console.log("User signed up successfully:", email, name);
          // } else {
          //   console.error("Failed to send user data to signup endpoint");
          // }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }

      return true; // Return true to continue the sign-in process
    },
    // async jwt({ token, account, profile }) {
    //   if (account) {
    //     token.accessToken = account.access_token;
    //     token.id = profile.sub;
    //     console.log("token", account);
    //   }
    //   return token;
    // },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
};
export default NextAuth(authOptions);
