const LoginDataSchema = require("../utils/data_schemas/auth");
const AuthService = require("../services/auth_service");

module.exports = {
  /**
   * @typedef Authentication
   * @property {string} user.required
   * @property {string} password.required
   */
  /**
   * @typedef AuthenticationRefresh
   * @property {string} token.required
   */
  /**
   * @typedef AuthenticationResponse
   * @property {string} token.required
   * @property {string} refreshToken.required
   */
  /**
   * User authentication endpoint
   * @route POST /login
   * @group Authentication - Operations about user authentication
   * @param {Authentication.model} auth.body.required.
   * @produces application/json
   * @consumes application/json
   * @returns {AuthenticationResponse.model} 200 - A authenticated user info
   * @returns {Error} 400 default - Please enter all fields
   * @returns {Error} 404 - User does not exist
   * @returns {Error} 401 - Invalid Credentials / The user is not active
   * @returns {Error} 500 - Unexpected error
   * @security JWT
   */
  async login(request, response, next) {
    try {
      const { user, password } = await LoginDataSchema.validateAsync(
        request.body
      );
      //Validations
      if (!user || !password) {
        return response.status(400).send({ msg: "Please enter all fields" });
      }
      const auth = await AuthService.login(user, password);
      return response.status(200).json(auth);
    } catch (err) {
      return response.status(400).send({ msg: err.message });
    }
  },
};
