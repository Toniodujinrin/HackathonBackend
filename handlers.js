const User = require("./user");
const handlers = {};

handlers.users = {};
handlers.authenticate = {};

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
  console.log("hello");
  const userId = data.query.id;

  try {
    const userData = await new User().get(userId);
    if (!userData.error) {
      res(200, { data: userData.data });
    } else {
      res(userData.status, { error: userData.message });
    }
  } catch (error) {
    console.log(error);
  }
};

handlers.authenticate.post = async (data, res) => {
  const payload = data.payload;
  try {
    const outcome = await new User().authenticate(payload.id, payload.password);
    res(outcome.status, outcome.data);
  } catch (error) {
    console.log(error);
    res(500, { error: "internal server error" });
  }
};

module.exports = handlers;
