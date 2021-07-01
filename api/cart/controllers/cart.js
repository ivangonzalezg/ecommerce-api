"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async myCart(ctx) {
    const entities = await strapi.services.cart.find({
      user: ctx.state.user.id,
    });
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.cart })
    );
  },
  async addToCart(ctx) {
    await strapi.services.cart.create({
      ...ctx.request.body,
      user: ctx.state.user.id,
    });
    const entities = await this.myCart(ctx);
    return entities;
  },
  async removeFromCart(ctx) {
    const products = await strapi.services.cart.find(ctx.request.body);
    if (products.length) {
      const { id } = products[0];
      await strapi.services.cart.delete({ id });
    }
    const entities = await this.myCart(ctx);
    return entities;
  },
};
