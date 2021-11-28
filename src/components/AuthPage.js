import { Box } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import Navbar from "./Navbar";
import { AmplifyAuthenticator, AmplifySignUp } from "@aws-amplify/ui-react";

import { useSelector } from "react-redux";
import { userLoggedIn } from "store/auth/selector";

function AuthPage() {
  const userIsLoggedIn = useSelector(userLoggedIn);

  if (userIsLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Box minHeight="100vh" flexDirection="column" display="flex">
      <Navbar />

      <Box
        flexGrow={1}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
      >
        <Box minWidth="300px" maxWidth="400px">
          <AmplifyAuthenticator>
            <AmplifySignUp slot="sign-up" />
          </AmplifyAuthenticator>
        </Box>
      </Box>
    </Box>
  );
}

export default AuthPage;
