// auth/[...nextauth].js
import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Cookies from "js-cookie";
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    // Add other providers as needed
  ],
  // Add custom configurations as needed

  // Custom callback for signup
  callbacks: {
    async signIn(user, account, profile) {
      console.log(user, "from user sure", user.account);
      // This callback is triggered when a user successfully signs in
      // You can customize it to send user information to your signup endpoint
      if (user.account.provider === "google") {
        // Extract user information
        const { email, name } = user.user;
        const pass_secret = process.env.PASS_SECRET;
        const password = `${pass_secret}${name}`;
        console.log(email, pass_secret, password, "from secret passed");
        try {
          //Send a POST request to your existing signup endpoint
          const response = await fetch(
            "https://inshopper.io/api/v1/authentication/register/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          const signUpResponse = await response.json();
          console.log(signUpResponse, "response");
          if (
            response.statusCode === 200 ||
            response.message ===
              "custom user with this email address already exists."
          ) {
            // console.log(response);
            console.log("User signed up successfully:", email);
          } else if (
            signUpResponse?.status === 400 &&
            signUpResponse?.message ===
              "custom user with this email address already exists."
          ) {
            const loginResponse = await fetch(
              "https://inshopper.io/api/v1/authentication/login/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: email, password }),
              }
            );
            let returnResponse = await loginResponse.json();
            if (returnResponse?.token) {
              Cookies.set("authToken", returnResponse.token, { expires: 7 });
            }
            console.log(returnResponse, "from login response");
          } else {
            console.error("Failed to send user data to signup endpoint");
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      } else {
        console.log(account, "account not found");
      }

      return true; // Return true to continue the sign-in process
    },
  },
});
