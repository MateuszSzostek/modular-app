enum CODES {
  SERVER = 'server',
  //fields
  EMIAL = 'email',
  //profile
  PROFILE_ID = 'profile-id',
  PROFILE_NAME = 'profile-name',
  PROFILE_AVATAR = 'profile-avatar',
  PASSWORD = 'password',
  NEW_PASSWORD = 'new-password',
  NEW_PASSWORD_CONFIRMATION = 'new-password-confirmation',
  FIRST_NAME = 'first-name',
  LAST_NAME = 'last-name',
  EMAIL_CONFORMATION_TOKEN = 'email-confirmation-token',
  //validations
  MUST_BE_AN_EMAIL = 'must-be-an-email',
  MUST_NOT_BE_EMPTY = 'must-not-be-empty',
  MUST_BE_A_STRING = 'must-be-a-string',
  MUST_MATCH_PASSWORD_REGEX = 'must-match-password-regex',
  MUST_BE_TRUE = 'must-be-true',
  AT_LEAST_6_CHARACTERS_LONG = 'at-least-6-characters-long',
  AT_LEAST_3_CHARACTERS_LONG = 'at-least-3-characters-long',
  SOMETHING_WENT_WRONG = 'something-went-wrongs',
}

export default CODES;
