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

app.get('/api/itemsInCategory/:categoryName', (req, res, next) => {
  const userId = 1;
  const categoryName = req.params.categoryName;
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
    where "u"."userId" = $1
    and "i"."foodCategory" = $2;
  `;

  const params = [userId, categoryName];

  db.query(sql, params)
    .then(results => {
      const items = results.rows;
      res.json(items);
    })
    .catch(err => next(err));
});

app.post('/api/newItem', (req, res, next) => {
  const userId = 1;
  const { name, quantity, measurementUnit, foodCategory } = req.body;
  if (!name) {
    res.status(400).json({
      error: 'Item must have name'
    });
  }
  if (!quantity || Number.isNaN(Number(quantity)) || quantity < 1) {
    res.status(400).json({
      error: 'Item must have quantity greater than 0'
    });
  }
  if (!measurementUnit) {
    res.status(400).json({
      error: 'Item must have measurement unit'
    });
  }
  if (!foodCategory) {
    res.status(400).json({
      error: 'Item must have food Category'
    });
  }

  const sql1 = `
    insert into "Items" ("name", "measurementUnit", "foodCategory")
    values ($1, $2, $3)
    returning *
  `;
  const params1 = [name, measurementUnit, foodCategory];

  db.query(sql1, params1)
    .then(result1 => {
      const [newItem] = result1.rows;
      const sql2 = `
        insert into "stockedItems" ("quantity", "userId", "itemId")
        values ($1, $2, $3)
        returning *
      `;

      const params2 = [quantity, userId, newItem.itemId];

      db.query(sql2, params2)
        .then(result => {
          const [newStockedItem] = result.rows;
          res.json(newStockedItem);
        })
        .catch(err => next(err));
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
  if (Number.isNaN(quantity) || quantity < 0) {
    res.status(400).json({
      error: 'quantity must be a number greater than or equal to 0'
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
