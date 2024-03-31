-- CreateTable
CREATE TABLE "announces" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "building_id" INTEGER,
    "date" DATE,
    "time" TIME(6),

    CONSTRAINT "announces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bank_accounts" (
    "id" SERIAL NOT NULL,
    "iban" VARCHAR(255),
    "holder" VARCHAR(255),
    "bank" VARCHAR(255),
    "currency" VARCHAR(55),
    "description" TEXT,

    CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banking_transactions" (
    "id" SERIAL NOT NULL,
    "account_id" INTEGER,
    "property_id" INTEGER,
    "description" TEXT,
    "category" VARCHAR(255),
    "date" DATE,
    "time" TIME(6),
    "amount" DECIMAL(10,2),

    CONSTRAINT "banking_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buildings" (
    "id" SERIAL NOT NULL,
    "address_type" VARCHAR(255),
    "street_address" VARCHAR(255),
    "number" VARCHAR(255),
    "district" VARCHAR(255),
    "postal_code" VARCHAR(255),
    "locality" VARCHAR(255),
    "province" VARCHAR(255),
    "country" VARCHAR(255),
    "admin_dni" VARCHAR(255),
    "president_dni" VARCHAR(255),
    "build_year" INTEGER,
    "floors" INTEGER,
    "elevators" INTEGER,
    "parking_slots" INTEGER,
    "image_url" VARCHAR(255),

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incidences" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT,
    "user_dni" VARCHAR(255),
    "building_id" INTEGER,
    "provider_id" INTEGER,
    "date" DATE,
    "time" TIME(6),
    "status" VARCHAR(55),

    CONSTRAINT "incidences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "neighbors_to_properties" (
    "id" SERIAL NOT NULL,
    "property_id" INTEGER NOT NULL,
    "neighbor_dni" VARCHAR(55) NOT NULL,
    "starting_date" DATE,
    "ending_date" DATE,

    CONSTRAINT "neighbors_to_properties_pkey" PRIMARY KEY ("id","property_id","neighbor_dni")
);

-- CreateTable
CREATE TABLE "owners_to_properties" (
    "property_id" INTEGER NOT NULL,
    "owner_dni" VARCHAR(55) NOT NULL,

    CONSTRAINT "owners_to_properties_pkey" PRIMARY KEY ("property_id","owner_dni")
);

-- CreateTable
CREATE TABLE "people" (
    "id" SERIAL NOT NULL,
    "forename" VARCHAR(255) NOT NULL,
    "surname" VARCHAR(255) NOT NULL,
    "second_surname" VARCHAR(255),
    "email" VARCHAR(255),
    "phone_code" VARCHAR(55),
    "phone_number" VARCHAR(255),
    "birth" DATE,
    "dni" VARCHAR(55),

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" SERIAL NOT NULL,
    "building_id" INTEGER,
    "floor" VARCHAR(55),
    "door" VARCHAR(55),
    "owner_dni" VARCHAR(55),

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "providers" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(255),
    "phone_code" VARCHAR(55) NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "person_dni" VARCHAR(255),
    "username" VARCHAR(255),
    "hash" VARCHAR(255),
    "is_validated" BOOLEAN DEFAULT false,
    "is_system_admin" BOOLEAN DEFAULT false,
    "portrait_url" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "people_dni_key" ON "people"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "users_person_dni_key" ON "users"("person_dni");

-- AddForeignKey
ALTER TABLE "announces" ADD CONSTRAINT "fk_building_id" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "banking_transactions" ADD CONSTRAINT "fk_account_id" FOREIGN KEY ("account_id") REFERENCES "bank_accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "banking_transactions" ADD CONSTRAINT "fk_property_id" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "fk_admin_dni" FOREIGN KEY ("admin_dni") REFERENCES "people"("dni") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "buildings" ADD CONSTRAINT "fk_president_dni" FOREIGN KEY ("president_dni") REFERENCES "people"("dni") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incidences" ADD CONSTRAINT "fk_building_id" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incidences" ADD CONSTRAINT "fk_provider_id" FOREIGN KEY ("provider_id") REFERENCES "providers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "incidences" ADD CONSTRAINT "fk_user_dni" FOREIGN KEY ("user_dni") REFERENCES "users"("person_dni") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "neighbors_to_properties" ADD CONSTRAINT "fk_neighbor_dni" FOREIGN KEY ("neighbor_dni") REFERENCES "people"("dni") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "neighbors_to_properties" ADD CONSTRAINT "fk_property_id" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "owners_to_properties" ADD CONSTRAINT "fk_owner_dni" FOREIGN KEY ("owner_dni") REFERENCES "people"("dni") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "owners_to_properties" ADD CONSTRAINT "fk_property_id" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "dk_owner_dni" FOREIGN KEY ("owner_dni") REFERENCES "people"("dni") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "fk_building_id" FOREIGN KEY ("building_id") REFERENCES "buildings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "fk_person_dni" FOREIGN KEY ("person_dni") REFERENCES "people"("dni") ON DELETE NO ACTION ON UPDATE NO ACTION;

