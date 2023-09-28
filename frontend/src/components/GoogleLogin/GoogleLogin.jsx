import { GoogleLogin } from "react-google-login";

const clientId =
  "609849944733-kcufeaglgkhndbv7vlkhsr244pt313tt.apps.googleusercontent.com";

function GogLogin() {
  const onSuccess = (res) => {
    console.log("Login Success ! Current user :", res.profileObj);
  };
  const onFailure = (res) => {
    console.log("Login Failed ! res:", res);
  };
  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
}
export default GogLogin;
