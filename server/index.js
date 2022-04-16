require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const db = require('./db');

const app = express();

const jsonMiddleware = express.json();

app.use(staticMiddleware);

app.use(jsonMiddleware);

app.get('/api/stockedItems', (req, res, next) => {
  const userId = 1;

  const sql = `
    select
      "s"."stockedItemId",
      "i"."name",
      "i"."measurementUnit",
      "i"."foodCategory",
      "s"."quantity"
    from "Items" as "i"
    join "stockedItems" as "s" using ("itemId")
    join  "Users" as "u" using ("userId")
    where "u"."userId" = $1;
  `;

  const params = [userId];

  db.query(sql, params)
    .then(results => {
      const items = results.rows;

      res.json(items);
    })
    .catch(err => next(err));
});

app.patch('/api/stockedItemQuantity/:stockedItemId', (req, res, next) => {
  const stockedItemId = Number(req.params.stockedItemId);
  if (!Number.isInteger(stockedItemId) || stockedItemId < 1) {
    res.status(400).json({
      error: 'stockedItemId must be a positive integer'
    });
    return;
  }

  const { quantity } = req.body;
  if (Number.isNaN(quantity) || quantity < 0 || !quantity) {
    res.status(400).json({
      error: 'quantity must be a number greater than 0'
    });
  }

  const sql = `
    update "stockedItems"
      set "quantity" = $2
    where "stockedItemId" = $1
    returning "quantity"
  `;
  const params = [stockedItemId, quantity];

  db.query(sql, params)
    .then(results => {
      const [updatedQuantity] = results.rows;
      if (!updatedQuantity) {
        res.status(404).json({
          error: `Could not find quantity with stockedItemId ${stockedItemId}`
        });
        return;
      }
      res.json(updatedQuantity);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
