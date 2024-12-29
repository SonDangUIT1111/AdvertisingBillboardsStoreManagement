import { cleanEnv } from "envalid";
import { str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  REACT_APP_PASSWORD_STRING: str(),
});
