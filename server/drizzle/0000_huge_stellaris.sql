CREATE TYPE "public"."ticket_status" AS ENUM('OPEN', 'IN_PROGRESS', 'DONE');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ticket" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"content" varchar(1024) NOT NULL,
	"status" "ticket_status" DEFAULT 'OPEN' NOT NULL
);
