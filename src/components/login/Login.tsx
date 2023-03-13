import { useEffect } from "react";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../recoil/atom/filterAtom";
import { gapi } from "gapi-script";
import { isFacebookLoginResponse, isGoogleLoginResponse } from "../../interfaces/interfaces";
import styles from "./login.module.scss";

function Login() {
  const setLoginData = useSetRecoilState<string>(loginState);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENTID;

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
  }, [clientId]);

  const handleFailure = (result: string) => {
    console.log(result);
  };
  const handleLogin = async (
    googleData: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (!isGoogleLoginResponse(googleData)) {
      return;
    }
    const res = await fetch(`/api/google-login`, {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  const responseFacebook = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    if (!isFacebookLoginResponse(response)) {
      return;
    }
    response.name && setLoginData(response.name);
    localStorage.setItem("loginData", JSON.stringify(response.name));
  }
  
  return (
    <div className={styles.loginPage}>
      <h2 className={styles.loginTitle}>Login User</h2>
      {clientId && (
        <GoogleLogin
          className={styles.google}
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"SameSite=None; Secure"}
          redirectUri="https://reenbit-character-list-9nrd-d7gy38a67-yulllia.vercel.app/"
        ></GoogleLogin>
      )}
      <FacebookLogin
        appId="760160892417890"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
}

export default Login;
