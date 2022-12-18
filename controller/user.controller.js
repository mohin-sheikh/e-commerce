const argon2 = require('argon2');
const moment = require("moment");
const { generateOTP } = require('../helper/otp.helper');
const userSchema = require('../schema/users.schema');
const { status, message, getResponseStructure } = require('../utils/response.utils');
let mailTemplate = require("../helper/template.helper");
const { mail } = require('../helper/mail.helper');
const { getJWTToken } = require("../security/jwt");

exports.createUser = async (req, res) => {
    try {
        const user = new userSchema({
            full_name: req.body.first_name + " " + req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            password: await argon2.hash(req.body.password),
            mobile_number: req.body.country_code + req.body.mobile_number,
            gender: req.body.gender,
            otp: generateOTP(),
            confirmation_code_expiry: moment().add(15, "minutes").toDate(),
        });
        const findUser = await userSchema.find({
            $or: [{ email: user["email"] }, { mobile_number: user["mobile_number"] }],
        });
        if (findUser["length"] !== 0) {
            return res
                .status(status.conflict)
                .send(
                    getResponseStructure(status.conflict, "User" + message.alreadyExist)
                );
        }
        const signup = mailTemplate.signup(req.body.first_name, user["otp"]);
        await mail(user["email"], "Account Verify", signup);
        await user.save();
        return res
            .status(status.successCreated)
            .send(
                getResponseStructure(
                    status.successCreated,
                    "User" + message.otpSend,
                    {
                        name: user.full_name,
                        email: user.email,
                        address: user.address,
                    }
                )
            );
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.message.toString()));
    }
};

exports.verify = async (req, res) => {
    try {
        let user = await userSchema.find({
            $or: [
                { email: req.body.email },
                { mobile_number: req.body.country_code + req.body.mobile_number },
            ],
        });
        if (user["length"] === 0) {
            return res
                .status(status.notfound)
                .send(getResponseStructure(status.notfound, "User" + message.notFound));
        }
        if (moment(user[0]["confirmation_code_expiry"]).isBefore(moment())) {
            return res
                .status(status.gone)
                .send(getResponseStructure(status.gone, "User" + message.codeExpire));
        }
        if (user[0]["otp"] === req.body.otp) {
            user[0].confirmation_code_expiry = "";
            user[0].otp = "";
            user[0].status = "verified";
            user[0].is_verified = true;
            user = user[0];
            await user.save();
            return res
                .status(status.success)
                .send(
                    getResponseStructure(
                        status.success,
                        "User" + message.verifiedSuccess
                    )
                );
        } else {
            return res
                .status(status.notfound)
                .send(
                    getResponseStructure(status.notfound, "User " + message.otpNotMatch)
                );
        }
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.message.toString()));
    }
};

exports.login = async (req, res) => {
    try {
        let user = await userSchema.aggregate([
            {
                $match: {
                    $or: [
                        { email: req.body.email },
                        { mobile_number: req.body.country_code + req.body.mobile_number },
                    ],
                    status: "verified",
                    is_verified: true,
                    is_deleted: false
                },
            },
        ]);
        user = user[0];
        if (!user) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "user" + message.notFound));
        }
        if (await argon2.verify(user["password"], req.body.password)) {
            user.otp = generateOTP();
            user.confirmation_code_expiry = moment().add(15, "minutes").toDate();
            await userSchema.updateOne({ _id: user._id }, user);
            const login = mailTemplate.login(user["full_name"], user.otp);
            await mail(user["email"], "Login Code Verify", login);
            return res
                .status(status.success)
                .send(
                    getResponseStructure(status.success, message.codeSent + req.body.email || req.body.country_code + req.body.mobile_number)
                );
        }
        return res
            .status(status.success)
            .send(status.notfound, message.notMatchPassword);
    } catch (error) {
        console.log(error);
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.message.toString()));
    }
};

exports.login2FA = async (req, res) => {
    try {
        let user = await userSchema.aggregate([
            {
                $match: {
                    $or: [
                        { email: req.body.email },
                        { mobile_number: req.body.country_code + req.body.mobile_number },
                    ],
                    status: "verified",
                    is_verified: true,
                    is_deleted: false
                },
            },
        ]);
        user = user[0];
        if (user["length"] === 0) {
            return res
                .status(status.success)
                .send(getResponseStructure(status.notfound, "user" + message.notFound));
        }

        if (user.otp !== req.body.otp) {
            return res
                .status(status.notfound)
                .send(getResponseStructure(status.notfound, message.otpNotMatch));
        }
        if (moment(user["confirmation_code_expiry"]).isBefore(moment())) {
            return res
                .status(status.gone)
                .send(getResponseStructure(status.gone, "User" + message.codeExpire));
        }
        await userSchema.updateOne(
            { _id: user["_id"] },
            {
                $set: {
                    otp: "",
                    confirmation_code_expiry: "",
                },
            }
        );
        const generateToken = await getJWTToken({ user }); // Generating Token.
        return res
            .status(status.success)
            .send(
                getResponseStructure(
                    status.success,
                    "User" + message.tokenGenerateSuccess,
                    { token: generateToken }
                )
            );
    } catch (error) {
        return res
            .status(status.success)
            .send(getResponseStructure(status.notfound, error.message.toString()));
    }
};