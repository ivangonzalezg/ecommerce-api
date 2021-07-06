"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async userByCode(ctx) {
    const { code: resetPasswordToken } = ctx.query;
    if (!resetPasswordToken) {
      return ctx.badRequest(null, {
        messages: [
          {
            id: "Custom.form.error.code.provide",
            message: "Please provide your code",
          },
        ],
      });
    }
    const entity = await strapi.plugins[
      "users-permissions"
    ].services.user.fetch({
      resetPasswordToken,
    });
    return sanitizeEntity(entity, {
      model: strapi.plugins["users-permissions"].models.user,
    });
  },
};
