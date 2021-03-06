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
  upload: {
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: env("AWS_ACCESS_KEY_ID"),
      secretAccessKey: env("AWS_ACCESS_SECRET"),
      region: "us-east-2",
      params: {
        Bucket: "ecommerce-nw5g4w",
      },
    },
  },
});
