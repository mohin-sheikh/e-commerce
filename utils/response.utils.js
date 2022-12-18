exports.getResponseStructure = (status, message, data) => {
    return {
        status,
        message,
        response: data || {}
    };
};

exports.status = {
    success: 200,
    successCreated: 201,
    accepted: 202,
    successNoRecords: 204,
    badRequest: 400, // if parameter missing
    unauthenticated: 401, // if token is invalid
    unauthorized: 403, // if token is invalid
    conflict: 409, // when user already exist.
    unsupportedMediaType: 422,
    sessionExpired: 440, // if the token is expired
    internalServerError: 500,
    notfound: 404,
    gone: 410,
    notAllow: 405
};

exports.message = {
    tokenMissing: "TOKEN MISSING",
    badRequest: "Bad Request payload",
    otpSend: " created successfully. Registration code has been sent via email.",
    codeSent: "Verification code has been sent to ",
    alreadyExist: " Already Exist.",
    notFound: " Not Found.",
    codeExpire: " Verification code has been expired.",
    verifiedSuccess: " Verified Successfully!",
    otpNotMatch: "OTP Not Match!",
    tokenGenerateSuccess: " Token has been generated Successfully.",
    unauthorized: "Unauthorized User.",
    addedProductSuccess: "Product has been added successfully",
    addedCartSuccess: "Product has been added in cart successfully",
    orderSuccess: "Product has been ordered successfully",
}