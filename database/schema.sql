set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "Users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"email" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Items" (
	"itemId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"measurementUnit" TEXT NOT NULL,
	"foodCategory" TEXT NOT NULL,
	CONSTRAINT "Items_pk" PRIMARY KEY ("itemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Recipes" (
	"recipeId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"recipeUrl" TEXT NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"ingredients" TEXT NOT NULL,
	"nutritionInfo" TEXT NOT NULL,
	CONSTRAINT "Recipes_pk" PRIMARY KEY ("recipeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "plannedRecipes" (
	"plannedRecipeId" serial NOT NULL,
	"userId" integer NOT NULL,
	"recipeId" integer NOT NULL,
	CONSTRAINT "plannedRecipes_pk" PRIMARY KEY ("plannedRecipeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "favoritedRecipes" (
	"favoritedRecipeId" serial NOT NULL,
	"userId" integer NOT NULL,
	"recipeId" integer NOT NULL,
	CONSTRAINT "favoritedRecipes_pk" PRIMARY KEY ("favoritedRecipeId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "neededItems" (
	"neededItemId" serial NOT NULL,
	"itemId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "neededItems_pk" PRIMARY KEY ("neededItemId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "stockedItems" (
	"stockedItemId" serial NOT NULL,
	"itemId" integer NOT NULL,
	"userId" integer NOT NULL,
	"quantity" DECIMAL NOT NULL,
	CONSTRAINT "stockedItems_pk" PRIMARY KEY ("stockedItemId")
) WITH (
  OIDS=FALSE
);






ALTER TABLE "plannedRecipes" ADD CONSTRAINT "plannedRecipes_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
ALTER TABLE "plannedRecipes" ADD CONSTRAINT "plannedRecipes_fk1" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("recipeId");

ALTER TABLE "favoritedRecipes" ADD CONSTRAINT "favoritedRecipes_fk0" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
ALTER TABLE "favoritedRecipes" ADD CONSTRAINT "favoritedRecipes_fk1" FOREIGN KEY ("recipeId") REFERENCES "Recipes"("recipeId");

ALTER TABLE "neededItems" ADD CONSTRAINT "neededItems_fk0" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId");
ALTER TABLE "neededItems" ADD CONSTRAINT "neededItems_fk1" FOREIGN KEY ("userId") REFERENCES "Users"("userId");

ALTER TABLE "stockedItems" ADD CONSTRAINT "stockedItems_fk0" FOREIGN KEY ("itemId") REFERENCES "Items"("itemId");
ALTER TABLE "stockedItems" ADD CONSTRAINT "stockedItems_fk1" FOREIGN KEY ("userId") REFERENCES "Users"("userId");
