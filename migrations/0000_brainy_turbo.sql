CREATE TABLE IF NOT EXISTS "user" (
	"clerk_id" varchar(255) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"image_url" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar(255) DEFAULT 'user' NOT NULL,
	"created_at" date DEFAULT now() NOT NULL
);
