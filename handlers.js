const User = require("./user");
const handlers = {};

handlers.users = {};

handlers.users.post = async (data, res) => {
  const payload = data.payload;
  try {
    const outcome = await new User(
      payload.id,
      payload.firstName,
      payload.lastName,
      payload.faculty,
      payload.email,
      payload.password
    ).post();

    res(outcome.status, outcome.message);
  } catch (error) {
    console.log(error);
    res(500, { error: "internal server error" });
  }
};

handlers.users.get = async (data, res) => {
  userId = data.query;
};

module.exports = handlers;
