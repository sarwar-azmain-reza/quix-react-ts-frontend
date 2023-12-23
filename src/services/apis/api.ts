import axios from "../plugins/axios";
import Auth from "./Auth";
import Questions from "./Questions";

export default {
  auth: new Auth(axios),
  questions: new Questions(axios),

}