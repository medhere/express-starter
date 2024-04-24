module.exports = {
  HTTP_CODES: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    PRECONDITION_FAILED: 412,
    UNSUPPORTED_MEDIA: 415,
    UNPROCESSABLE_ENTITY: 422,
    FAILED_DEPENDENCY: 424,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
  },
  RESPONSE_MESSAGES: {
    OK: `Sucess`,
    CREATED: "Created Successfully",
    UPDATE_FAILED: `Update Failed`,
    CREATION_FAILED: `Creation Failed`,
    NOT_COMPLETE: `Not Complete`,
    BAD_REQUEST: `Request contains invalid or incomplete data.`,
    FILE_REQUIRED: `FILE Required`,
    IMAGE_REQUIRED: `Image Required`,
    EVENT_REQUIRED: `Event Required`,
    ENV_REQUIRED: `Environment Variables Required`,
    EMPTY_UPDATE: `Nothing to update`,
    CONTEXT_REQUIRED: `Context Required`,
    NOT_AUTHORIZED: "The request for this resource is not authorized.",
    JWT_TOKEN_EXPIRED_AUTH: "TOKEN_EXPIRED",
    INVALID_TOKEN_AUTH: "Invalid_TOKEN",
    JWT_TOKEN_EXPIRED_REFRESH: "TOKEN_EXPIRED",
    AUTH_CREATION_FAILED: "TOKEN creation failed",
    INVALID_TOKEN_REFRESH: "Invalid TOKEN",
    DELETE_FAILED: `Resource Does not exists`,
    API_NOT_FOUND: `The request entity for this api is not found.`,
    NO_RECORD_FOUND: `Data Not Found.`,
    DATA_CONFLICT: `Data Conflict`,
    OTP_EXPIRED: `OTP expired`,
    EMAIL_EXIST: "Email Already Exists",
    INVALID_ENTITY: "Invalid Entity",
    ENTITY_ALREADY_EXIT: "Entity already exist",
    MOB_EXIST: "MobileNumber Already Exists",
    WRONG_DATA: "Already Exists",
    ACCOUNT_LOCKED: "Sorry your Account is locked, Please reset your password.",
    EMAIL_SENDFAILED: "Failed Dependency Send Failure",
    INTERNAL_ERROR: `Internal error occurred while processing the request`,
    ACCOUNT_LOCKED: `Sorry your Account is locked, Please reset your password.`,
    ACCOUNT_SUSPEND: `Sorry your Account is blocked, Please contact the  support team.`,
    ALREADY_EXIST: `Already Exist`,
    ACCOUNT_REG: `Account Created Successfully Please Verify your email`,
    CREATED_SUCCESS: `Created Successfully`,
    DELETED: "Resource deleted.",
    DELETE_ERROR: "Error Removing.",
    EMAIL_VALIDATE: `Email is not valid.`,
    EMPTY_EVENT: `Event is null or empty`,
    EMPTY_CONTEXT: `Context is null or empty`,
    EMAIL_SEND_SUCCESS: `Email send successfully`,
    GENERATED_SUCCESS: `Generated Successfully`,
    LOGIN_SUCCESS: "Login Successfully.",
    LOGOUT_SUCCESS: "Logout Successfully.",
    IMAGE_UPLOAD: `Upload an Image`,
    INVALID_OTP: `Invalid OTP`,
    INVALID_LOGIN: `Invalid Credentials`,
    INVALID_MOBILENO: `Mobile Number is not valid.`,
    INVALID_DATA: `is not valid.`,
    NOT_REGISTER: "User not registerd.",
    NOT_EXIST: "Resource does not exist.",
    NOT_VERIFIED: "Sorry your account is not verified.",
    NULL_DATA: "Null Data",
    OOPS: `Oops Something went wrong`,
    OTP_EXPIRED: `OTP expired`,
    OTP_FAILED: `OTP sent failed`,
    OTP_SEND_SUCCESS: `OTP sent successfully`,
    OTP_VERIFIED_SUCCESS: `OTP verified successfully`,
    OTP_VERIFIED_FAIL: `OTP verification failed`,
    REGISTER_SUCCESS: `Registration successfully`,
    TOKEN_GENERATE: `Token Generated Successfully`,
    USER_NOT_EXIST: "User does not exist.",
    UPDATE_SUCCESS: "Updated successfully.",
    UPDATE_ERROR: "Error updating.",
    LOGIN_SUCCESS: 'Login successful',
    LOGIN_FAILED: 'Login failed',
    WRONG_PASSWORD: 'Incorrect password',
    CREATED: 'Successfully created',
    TOGGLE_TRACKER: 'Toggle Successfully Tracked',
    FILE_UPLOAD: 'Successfully File Upload.',
    REGISTER_USER: 'You are successfully registered.',
    SEND_OTP: 'Otp has been sent your register number.',
    SEND_OTP_EMAIL: 'Otp has been sent your register email.',
    SUCCESS_OTP: 'Otp Verified',
    FAILED_OTP: 'Invalid Otp.',
    INVALID_USERNAME: 'Invalid username.',
    CREATE_FAILED: 'Failed to create record',
    GET_RECORD_SUCCESS: 'Retrieved records successfully',
    GET_SINGLE_RECORD: 'Retrieved single record successfully',
    UPDATE_SUCCESS: 'Record updated successfully',
    PASSWORD_CHANGES: 'Password has been changed.',
    DELETE_SUCCESS: 'Record deleted successfully',
    NOT_FOUND: 'Record Not Found.',
    NOT_FOUND_FUN: (message) => `${message} does not exist.`,
    ROUTE_NOT_FOUND: 'Route Not Found!',
    EMAIL_NOT_VERIFIED: 'Email must be verified',
    EMAIL_ALREADY_TAKEN: 'Email Already taken',
    BAD_REQUEST: 'Bad request',
    BAD_ROUTINE_ID: 'Invalid routine id',
    BAD_PILLAR_ID: 'Invalid pillar id',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    PRECONDITION_FAILED: 'Precondition failed',
    TOO_MANY_REQUESTS: 'Too many requests',
    SERVICE_UNAVAILABLE: 'Service unavailable',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    EMAIL_ALREADY_EXISTS: 'The email address is already in use by another account.',
    AUTH_ERRORS: {
      TOKEN_HEADER: 'Token header not found',
      TOKEN: 'Token not found',
      UNAUTHORIZED: 'Oops! Unauthorised access',
      BLOCKED: 'Oops! You are block. Contact to admin.',
    },
    LOGIN: {
      USERNAME: 'Incorrect username or password. Please try again',
      WRONG_PASS: 'Password is incorrect. Please try again',
    },
  },
}