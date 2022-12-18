let {
    signup,
    login,
    forgotPass,
    resend,
} = require("../utils/template.utils")

exports.signup = (name, otp) => {
    const obj = {
        name: name.toUpperCase(),
        otp
    };
    for (const value in obj) {
        signup = signup.replace("#var", obj[value])
    }
    return signup;
};

exports.login = (name, otp) => {
    const obj = {
        name: name.toUpperCase(),
        otp
    };
    for (const value in obj) {
        login = login.replace("#var", obj[value])
    }
    return login;
};

exports.resend = (name, otp) => {
    const obj = {
        name: name.toUpperCase(),
        otp
    };
    for (const value in obj) {
        resend = resend.replace("#var", obj[value])
    }
    return resend;
};

exports.forgotPass = (name, otp) => {
    const obj = {
        name: name.toUpperCase(),
        otp
    };
    for (const value in obj) {
        forgotPass = forgotPass.replace("#var", obj[value])
    }
    return forgotPass;
};