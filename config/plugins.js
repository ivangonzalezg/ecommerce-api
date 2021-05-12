const email = process.env.EMAIL;
const password = process.env.PASSWORD;

module.exports = ({ env }) => ({
  email: {
    provider: "nodemailer",
    providerOptions: {
      host: env("SMTP_HOST", "smtp.gmail.com"),
      port: env("SMTP_PORT", 587),
      auth: {
        user: env("SMTP_USERNAME", email),
        pass: env("SMTP_PASSWORD", password),
      },
      secure: false,
    },
    settings: {
      defaultFrom: `Ivan Gonzalez <${email}>`,
      defaultReplyTo: `Ivan Gonzalez <${email}>`,
    },
  },
});
