"use strict";

/**
 * `is-product` policy.
 */

module.exports = async (ctx, next) => {
  if (ctx.request.body?.product) {
    return await next();
  }
  ctx.badRequest(null, {
    messages: [
      {
        id: "Cart.addToCart.error.product.provide",
        message: "Please provide a product",
      },
    ],
  });
};
