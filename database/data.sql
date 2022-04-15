insert into "Users"
  ("firstName", "lastName", "email", "hashedPassword")
  values ('user1', 'user1byun', 'user1@gmail.com', '1234');

insert into "Items"
  ("name","measurementUnit","foodCategory")
  values ('Tomato', 'Oz','fruits'),
  ('Steak', 'Oz', 'meat'),
  ('Carrot', '#', 'veggies');

insert into "stockedItems"
  ("quantity", "itemId", "userId")
  values (1, 1, 1),
  (1,2,1),
  (1,3,1);
