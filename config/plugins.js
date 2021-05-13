const path = require("path");

module.exports = ({ env }) => ({
  email: {
    provider: "googleapis",
    providerOptions: {
      credentialsPath: path.join(__dirname, "../credentials.gmail.json"),
      tokenPath: path.join(__dirname, "../token.gmail.json"),
    },
    settings: {
      defaultFrom: "Ivan Gonzalez <ivan.gonzalez.testing.email@gmail.com>",
      defaultReplyTo: "Ivan Gonzalez <ivan.gonzalez.testing.email@gmail.com>",
    },
  },
});
