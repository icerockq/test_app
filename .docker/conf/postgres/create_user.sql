\c test_database;

-- Adminer 4.6.3 PostgreSQL dump

DROP TABLE IF EXISTS "users_person";
DROP SEQUENCE IF EXISTS users_person_id_seq;
CREATE SEQUENCE users_person_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."users_person" (
    "id" integer DEFAULT nextval('users_person_id_seq') NOT NULL,
    "login" character(100) NOT NULL,
    "password" character(100) NOT NULL,
    "status" smallint DEFAULT '1' NOT NULL
) WITH (oids = false);

COMMENT ON COLUMN "public"."users_person"."status" IS '1-on, 0-off';

INSERT INTO "users_person" ("id", "login", "password", "status") VALUES
(1,	'dima',	'0f5b25cd58319cde0e6e33715b66db4c',	1),
(2,	'admin',	'21232f297a57a5a743894a0e4a801fc3',	1),
(3,	'vova',	'9804f858419594400647c354a1d8d235',	2),
(4,	'anton',	'784742a66a3a0c271feced5b149ff8db',	2),
(5,	'gena',	'6f5197bcdb821fb5bc2acb874538f106',	1);

DROP TABLE IF EXISTS "users_person_hash";
DROP SEQUENCE IF EXISTS users_person_hash_id_seq;
CREATE SEQUENCE users_person_hash_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."users_person_hash" (
    "id" integer DEFAULT nextval('users_person_hash_id_seq') NOT NULL,
    "user_id" integer NOT NULL,
    "hash" character(100) NOT NULL
) WITH (oids = false);

DROP TABLE IF EXISTS "users_person_status";
DROP SEQUENCE IF EXISTS users_person_status_id_seq;
CREATE SEQUENCE users_person_status_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1;

CREATE TABLE "public"."users_person_status" (
    "id" integer DEFAULT nextval('users_person_status_id_seq') NOT NULL,
    "name" character(100) NOT NULL,
    "color" character(100) NOT NULL
) WITH (oids = false);

INSERT INTO "users_person_status" ("id", "name", "color") VALUES
(1,	'Активен', 'success'),
(2,	'Заблокирован', 'danger');

-- 2018-11-15 08:28:40.130611+00