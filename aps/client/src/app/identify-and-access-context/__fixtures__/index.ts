import { faker } from "@faker-js/faker"

import { LoginRequest } from "../domain/identify-and-access-context"

export const loginData: LoginRequest = {
  email: faker.internet.email(),
  password: faker.internet.password(),
}
