"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async myDirections(ctx) {
    const entities = await strapi.services.direction.find({
      user: ctx.state.user.id,
    });
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.direction })
    );
  },
};
