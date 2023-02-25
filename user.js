const helpers = require("./helpers");
const _data = require("./mongoConnect");

helpers;
class User {
  constructor(id, firstName, lastName, faculty, email, password) {
    this._id = typeof id == "string" ? id.trim() : false;
    this.firstName = typeof firstName == "string" ? firstName.trim() : false;
    this.lastName = typeof lastName == "string" ? lastName.trim() : false;
    this.faculty = typeof faculty == "string" ? faculty.trim() : false;
    this.email = typeof email == "string" ? email.trim() : false;
    this.password = typeof password == "string" ? password.trim() : false;
  }

  post = async () => {
    if (
      this._id &&
      this.faculty &&
      this.firstName &&
      this.lastName &&
      this.password &&
      this.email
    ) {
      const data = {
        _id: this._id,
        firstName: this.firstName,
        email: this.email,
        password: helpers.hash(this.password),

        lastName: this.lastName,
        faculty: this.faculty,
        courser: [],
      };

      try {
        await _data.post("users", data);
        return {
          error: false,
          data: true,
          status: 200,
          message: "user successfully created",
        };
      } catch (error) {
        return {
          error: true,
          data: null,
          status: 404,
          message: "user already exists",
        };
      }
    } else
      return { error: true, data: null, status: 403, message: "invalid data" };
  };
  get = async (userId) => {
    userId =
      typeof userId == "string" && userId.trim().length > 0
        ? userId.trim()
        : false;
    if (userId) {
      try {
        const data = await _data.get("users", userId);
        if (data) {
          return {
            error: false,
            data: data,
            status: 200,
            message: "user successfully created",
          };
        }
      } catch (error) {
        return {
          error: true,
          data: null,
          status: 404,
          message: "user foes not exist",
        };
      }
    } else {
      return { error: true, data: null, status: 403, message: "invalid data" };
    }
  };

  authenticate = async (id, password) => {
    id = typeof id == "string" && id.trim().length !== 0 ? id : false;
    password =
      typeof password == "string" && password.trim().length !== 0
        ? password
        : false;

    if (id && password) {
      try {
        const userData = await _data.get("users", id);
        if (userData && userData.password === helpers.hash(password)) {
          delete userData.password;
          return {
            error: false,
            data: userData,
            status: 200,
            message: "success",
          };
        }
      } catch (error) {
        return {
          error: true,
          data: null,
          status: 404,
          message: "user does not exist",
        };
      }
    } else
      return {
        error: true,
        data: null,
        status: 405,
        message: "invalid data",
      };
  };
}

module.exports = User;
