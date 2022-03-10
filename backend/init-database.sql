-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "name" varchar(80) NOT NULL,
    "email" varchar(80) NOT NULL,
    "password" varchar(80) NOT NULL,
    PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "unique_email" ON "public"."users" USING BTREE ("email");
