import { GoogleLogout } from "react-google-login";

const clientId =
  "609849944733-kcufeaglgkhndbv7vlkhsr244pt313tt.apps.googleusercontent.com";

function GogLogout() {
  const onSuccess = () => {
    console.log("Log out Successfull !");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
export default GogLogout;
