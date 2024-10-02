CREATE TABLE IF NOT EXISTS "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"category" varchar(255) NOT NULL,
	"brand" varchar(255) NOT NULL,
	"price" integer NOT NULL,
	"sale_price" integer,
	"total_stock" integer NOT NULL,
	"average_review" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
