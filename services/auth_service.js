const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const moment = require("moment");

class AuthService {
  /**
   * Login Service
   * @param {*} user
   * @param {*} password
   */
  static login = (user, password) => {
    return new Promise((resolve, reject) => {
      // Validate password
      bcrypt.compare(password, process.env.PASSWORD_DEMO).then((isMatch) => {
        if (!isMatch) {
          reject(new Error(`Invalid Credentials`));
          return;
        }
        if (user != process.env.USER_DEMO) {
          reject(new Error(`Invalid Credentials`));
          return;
        }
        jwt.sign(
          {
            id: user,
            typ: "Access-Token",
          },
          config.get("jwtSecret"),
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRED_TIME,
          },
          async (err, token) => {
            if (err) throw err;
            const tokenId = crypto.randomBytes(16).toString("hex");
            const refreshToken = jwt.sign(
              {
                id: user,
                typ: "Refresh-Token",
                jti: tokenId,
              },
              config.get("jwtSecretRefresh"),
              {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRED_TIME,
              }
            );

            resolve({
              token,
              refreshToken,
              expires: moment().add(1, "hours").format(),
              user: {
                username: user,
              },
            });
          }
        );
      });
    });
  };
}

module.exports = AuthService;
