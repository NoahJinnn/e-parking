const App = {
  LoaderPrepareData: "Loading data...",
};

const Error = {
  "error-with-status": "A {{ statusCode }} error occurred on server",
  "error-without-status": "An error occurred on the server",
};

const HomeNavigate = {
  homeMap: "Map",
  homeHistory: "History",
  homeMessage: "Message",
  homeAccount: "Account",
  homeSetting: "Setting",
};

const LoginPage = {
  loginTitle: "Sign up with phone",
  loginSubTitle:
    "An SMS may be sent to your phone. Message & data rates may apply.",
  loginVerTitle: "Enter verification code",
  loginVerSub: "Please enter the vertification code sent to {{ phone }}",
  loginVerResendP1: "Didn’t get code?",
  loginVerResendP2: "Resend",
  loginInfoTitle: "Your information",
  loginInfoSubTitle: "Please enter the following information",
  loginInfoAcceptPolicy: "I understand and accept all",
  loginInfoAcceptPolicyLink: "e-Parking's policy.",
};

const MapPage = {
  mapSearchUnits: "Search parking units...",
};

const Tools = {
  firstName: "Firstname",
  lastName: "Lastname",
  birth: "Birth",
  continue: "Continue",
};

export default {
  ...App,
  ...Error,
  ...HomeNavigate,
  ...LoginPage,
  ...MapPage,
  ...Tools,
};
