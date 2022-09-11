const {
  NODE_ENV,
  JWT_SECRET,
  MONGO_HOST,
  MONGO_DB,
} = process.env;

const isProduction = NODE_ENV === 'production';
const JWT_SECRET_VALUE = isProduction ? JWT_SECRET : 'dev-secret';

let MONGO_CONNECTION;
if (isProduction) {
  MONGO_CONNECTION = `mongodb://${MONGO_HOST}:27017/${MONGO_DB}`;
} else {
  MONGO_CONNECTION = 'mongodb://localhost:27017/moviesdb';
}

module.exports = {
  JWT_SECRET_VALUE,
  MONGO_CONNECTION,
};
