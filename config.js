const config = {};

config.port = process.env.PORT || 3000;
config.secretKey = "food-menu-api";
config.mongoose = {
  url: "mongodb://localhost:27017/food-menu",
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
};

module.exports = config;
