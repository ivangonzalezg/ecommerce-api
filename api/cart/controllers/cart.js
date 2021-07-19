"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async myCart(ctx) {
    const entity = await strapi.services.cart.findOne({
      user: ctx.state.user.id,
    });
    let items = [];
    if (entity) {
      items = sanitizeEntity(entity, { model: strapi.models.cart }).items;
    }
    return items;
  },
  async addToCart(ctx) {
    const cart = await strapi.services.cart.findOne({
      user: ctx.state.user.id,
    });
    if (cart) {
      let quantityInsufficient = false;
      let isProduct = false;
      const items = cart.items.map((item) => {
        let quantity = item.quantity;
        if (item.product.id === ctx.request.body.product) {
          if (quantity >= item.product.quantity) {
            quantityInsufficient = true;
          }
          quantity += 1;
          isProduct = true;
        }
        return {
          id: item.id,
          product: item.product.id,
          quantity,
        };
      });
      if (quantityInsufficient) {
        return ctx.badRequest(null, {
          messages: [
            {
              id: "Cart.addToCart.error.product.quantity",
              message: "There is no more stock of this product",
            },
          ],
        });
      }
      if (!isProduct) {
        items.push({
          product: ctx.request.body.product,
          quantity: 1,
        });
      }
      await strapi.services.cart.update({ id: cart.id }, { items });
    } else {
      await strapi.services.cart.create({
        items: [{ product: ctx.request.body.product, quantity: 1 }],
        user: ctx.state.user.id,
      });
    }
    const entities = await this.myCart(ctx);
    return entities;
  },
  async removeFromCart(ctx) {
    const cart = await strapi.services.cart.findOne({
      user: ctx.state.user.id,
    });
    if (cart) {
      let items = cart.items.map((item) => {
        let quantity = item.quantity;
        if (item.product.id === ctx.request.body.product) {
          quantity -= 1;
        }
        return {
          id: item.id,
          product: item.product.id,
          quantity,
        };
      });
      items = items.filter((item) => item.quantity > 0);
      if (items.length > 0) {
        await strapi.services.cart.update({ id: cart.id }, { items });
        const entities = await this.myCart(ctx);
        return entities;
      } else {
        await strapi.services.cart.delete({ id: cart.id });
        return [];
      }
    } else {
      return [];
    }
  },
  async deleteItem(ctx) {
    const { id } = ctx.params;
    const cart = await strapi.services.cart.findOne({
      user: ctx.state.user.id,
    });
    const items = cart.items
      .map((item) => ({
        id: item.id,
        product: item.product.id,
        quantity: item.quantity,
      }))
      .filter((item) => item.id !== id);
    if (items.length > 0) {
      await strapi.services.cart.update({ id: cart.id }, { items });
      const entities = await this.myCart(ctx);
      return entities;
    } else {
      await strapi.services.cart.delete({ id: cart.id });
      return [];
    }
  },
};
