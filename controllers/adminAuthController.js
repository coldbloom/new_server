const express = require('express')
const crypto = require('crypto')
const cookie = require('cookie')
const {
    getTokens, refreshTokenAge
} = require("../auth/utils");
const { passwordSecret, fakeUser } = require('../auth/data')


class AdminAuthController {
    async login(req, res, next) {
        const { login, password } = req.body;

        const hash = crypto
            .createHmac("sha256", passwordSecret)
            .update(password)
            .digest("hex")
        const isVerifiedPassword = hash === fakeUser.passwordHash;

        if (login !== fakeUser.login || isVerifiedPassword) {
            return res.status(401).send("Login fail");
        }

        const { accessToken, refreshToken } = getTokens(login);

        res.setHeader(
            "Set-Cookie",
            cookie.serialize("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: refreshTokenAge
            })
        );
        res.send({accessToken});
    };

    async logout(req, res, next){
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("refreshToken", "", {
                httpOnly: true,
                maxAge: 0,
            })
        );
        res.sendStatus(200);
    }

    async refresh(req, res, next){
        const { accessToken, refreshToken } = getTokens(req.user.login);

        res.setHeader(
            "Set-Cookie",
            cookie.serialize("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60
            })
        );
        res.send({ accessToken });
    }

    async profile(req, res, next){
        res.send("admin");
    }
}

module.exports = new AdminAuthController()