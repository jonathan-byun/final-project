require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const db = require('./db');

const app = express();

app.use(staticMiddleware);

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

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
