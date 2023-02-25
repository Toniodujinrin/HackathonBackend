const { MongoClient } = require("mongodb");
require("dotenv").config();
const client = new MongoClient(process.env.MONGO_URI);

const data = {};

data.post = async (folder, data) => {
  try {
    await client.connect();
    const res = await client.db("hackathon").collection(folder).insertOne(data);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  } finally {
    client.close();
  }
};

data.get = async (folder, file) => {
  try {
    await client.connect();
    const res = await client
      .db("hackathon")
      .collection(folder)
      .findOne({ _id: file });
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  } finally {
    client.close();
  }
};

module.exports = data;
