import { UserAttrs } from "services/types";
import { Subjects } from "../subjects";

export interface UserUpdatedEvent {
  subject: Subjects.UserUpdated;
  data: UserAttrs;
}
