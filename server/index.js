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

app.get('/api/stockedItemAt/:stockedItemId', (req, res, next) => {
  const userId = 1;
  const stockedItemId = req.params.stockedItemId;
  if (!Number.isInteger(Number(stockedItemId)) || stockedItemId < 1) {
    res.status(400).json({
      error: 'stockedItemId must be a positive integer'
    });
  }
  const sql = `
    select
      "i"."name",
      "i"."measurementUnit",
      "i"."foodCategory",
      "s"."quantity"
    from "Items" as "i"
    join "stockedItems" as "s" using ("itemId")
    join "Users" as "u" using ("userId")
    where "u"."userId" = $1
    and "s"."stockedItemId" = $2;
  `;

  const params = [userId, stockedItemId];

  db.query(sql, params)
    .then(results => {
      const [items] = results.rows;
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

app.patch('/api/stockedItemDetails/:stockedItemId', (req, res, next) => {
  const userId = 1;
  const id = Number(req.params.stockedItemId);
  if (!Number.isInteger(id) || id < 1) {
    res.status(400).json({
      error: 'stockedItemId must be a positive integer'
    });
  }
  const { quantity, name, measurementUnit, foodCategory } = req.body;
  const sql1 = `
    update "stockedItems"
      set "quantity" = $3
    where "stockedItemId" = $1
      and "userId" = $2
    returning *
  `;
  const params1 = [id, userId, quantity];

  db.query(sql1, params1)
    .then(result1 => {
      const [newItem] = result1.rows;
      const sql2 = `
        update "Items"
          set "name" = $2,
          "measurementUnit" = $3,
          "foodCategory" = $4
        where "itemId" = $1
        returning *
      `;

      const params2 = [newItem.itemId, name, measurementUnit, foodCategory];

      db.query(sql2, params2)
        .then(result => {
          const [newStockedItem] = result.rows;
          const responseObject = {
            name: newStockedItem.name,
            quantity: newItem.quantity,
            measurementUnit: newStockedItem.measurementUnit,
            foodCategory: newStockedItem.foodCategory,
            stockedItemId: newItem.stockedItemId
          };
          res.json(responseObject);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.delete('/api/deleteStockedItems', (req, res, next) => {
  const userId = 1;
  const idArray = (req.body.idArray);

  if (!idArray) {
    res.status(400).json({
      error: 'idArray cannot be empty'
    });
  }
  const sql = `
    delete from "stockedItems"
      where "userId" = $1
      and "stockedItemId" = any($2::int[])
    returning *;
  `;
  const params = [userId, idArray];

  db.query(sql, params)
    .then(result1 => {
      const itemId = result1.rows;
      const deleteItemArray = [];
      for (let i = 0; i < itemId.length; i++) {
        deleteItemArray.push(itemId[i].itemId);
      }
      const sql2 = `
        delete from "Items"
          where "itemId" = any($1::int[])
        returning *
      `;

      const params2 = [deleteItemArray];

      db.query(sql2, params2)
        .then(result2 => {
          const [deletedItem] = result2.rows;
          res.json(deletedItem);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
