import { UserAttrs } from "services/types";
import { Subjects } from "../subjects";

export interface AuthSignedUpEvent {
  subject: Subjects.AuthSignedUp;
  data: UserAttrs;
}
