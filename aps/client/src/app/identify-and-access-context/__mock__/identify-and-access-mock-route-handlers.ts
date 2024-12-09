import { RegisterResponse, LoginResponse } from "../domain/identify-and-access-context"
import { MockUserType } from "../domain/identify-and-access-context"
import Schema from "miragejs/orm/schema"
import { Registry, AnyFactories, AnyModels } from "miragejs/-types"
import { Request } from "miragejs"
import { faker } from "@faker-js/faker"

export function registerHandlerMock(schema: Schema<Registry<AnyModels, AnyFactories>>, { requestBody }: Request) {
  const { email, password } = JSON.parse(requestBody)

  const companyId = faker.string.uuid()
  const newUser: MockUserType = {
    email,
    password,
    companyId: companyId,
    userId: faker.string.uuid(),
  }

  const user = schema.db.users.findBy({ email: email })

  if (user) {
    return {
      data: { message: "error, email already taken", status: "error" },
    }
  }

  const company = {
    companyData: {
      fullName: "",
      phoneNumber: "",
      companyName: "",
      companyAddress: "",
      companyHouseNumber: "",
      companyApartamentNumber: "",
    },

    invoiceData: {
      companyCountry: "",
      nip: "",
      accountNumber: "",
    },
    userId: newUser.userId,
    companyId: companyId,
  }

  schema.db.users.insert(newUser)
  schema.db.companies.insert(company)

  const response: RegisterResponse = {
    sessionToken: "",
    status: "success",
    message: "",
    userId: newUser.userId,
  }

  return {
    data: response,
  }
}

export function loginHandlerMock(schema: Schema<Registry<AnyModels, AnyFactories>>, { requestBody }: Request) {
  const { email, password } = JSON.parse(requestBody)

  const user = schema.db.users.findBy({ email: email, password: password })

  if (user) {
    const response: LoginResponse = {
      sessionToken: "",
      status: "success",
      message: "",
    }

    return response
  }

  return {
    data: { message: "error, something went wrong", starus: "error" },
  }
}

export function forgotPasswordHandlerMock(schema: Schema<Registry<AnyModels, AnyFactories>>, { requestBody }: Request) {
  const { email } = JSON.parse(requestBody)

  const user = schema.db.users.findBy({ email: email })

  if (user) {
    return {
      data: { message: "user found, email sended", status: "success" },
    }
  }

  return {
    data: { message: "error, user not found", status: "error" },
  }
}

export function resetPasswordHandlerMock(schema: Schema<Registry<AnyModels, AnyFactories>>, { requestBody }: Request) {
  const { password, passwordConfirmation, userId } = JSON.parse(requestBody)

  const user = schema.db.users.findBy({ id: userId })
  const passwordMatch = password === passwordConfirmation

  if (user && passwordMatch) {
    schema.db.users.update({ id: userId }, { password: password })

    return {
      data: { message: "user found, password changed", status: "success" },
    }
  }

  return {
    data: { message: "error, user not found or password not match", status: "error" },
  }
}
