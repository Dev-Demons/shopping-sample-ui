import { useRouter } from "next/router";
import React from "react";
import GoogleLogin from "react-google-login";

// Internal Imports
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { googleUserLogin } from "../features/userSlice";

export const SocialGoogleLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function responseGoogle(response: any) {
    await dispatch(googleUserLogin(response.accessToken));
    router.push("/");
  }

  return (
    <div className="px-16 py-8">
      <GoogleLogin
        className="!rounded-lg"
        clientId="865137569538-2k4mc40dur78flg8p1ncbu39h9n1tjtr.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={(err) => console.log(err)}
      />
    </div>
  );
};
