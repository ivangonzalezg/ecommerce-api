"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async findMe(ctx) {
    ///const response = await strapi.request("post","/users/me",{}
    const entities = await strapi.services.cart.find({
      user: ctx.state.user.id,
    });
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.cart })
    );
  },
};
