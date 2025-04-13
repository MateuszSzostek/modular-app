enum CODES {
  SERVER = 'server',
  //fields
  EMIAL = 'email',
  PASSWORD = 'password',
  FIRST_NAME = 'first-name',
  LAST_NAME = 'last-name',
  //validations
  MUST_BE_AN_EMAIL = 'must-be-an-email',
  MUST_NOT_BE_EMPTY = 'must-not-be-empty',
  MUST_BE_A_STRING = 'must-be-a-string',
  MUST_MATCH_PASSWORD_REGEX = 'must-match-password-regex',
  AT_LEAST_6_CHARACTERS_LONG = 'at-least-6-characters-long',
  SOMETHING_WENT_WRONG = 'something-went-wrongs',
}

export default CODES;
