# Examenopdracht Front-end Web Development / Web Services

> Schrap hierboven wat niet past

- Student: ANDREEAS FIROIU
- Studentennummer: 077350AF
- E-mailadres: andreeas.firoiu@student.hogent.be

## Vereisten

Ik verwacht dat volgende software reeds geïnstalleerd is:

- [NodeJS](https://nodejs.org)
- [Yarn](https://yarnpkg.com)
- [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- [TypeScript](https://www.typescriptlang.org/)

> Vul eventueel aan

## Opstarten

Draai allereerst een NPM install om alle dependencies binnen te halen.

Maak een .env bestand aan met de volgende parameters en hun invullen. 

NODE_ENV=*naam omgeving hier*

DATABASE_URL=*database url: verwacht standaard een msql databasis*
DATABASE_HOST=*host van db*
DATABASE_PORT=*poort van db*
DATABASE_USERNAME=*username van de toepassingsuser die rechten heeft op de db*
DATABASE_PASSWORD=*username van de toepassingsuser die rechten heeft op de db*

Indien een nieuwe db wordt gekoppeld, gelieve de volgende commando's uit te voeren.

yarn prisma:migrate
yarn prisma:seed

Hiermee zal Prisma ORM de nieuwe DB aanmaken op basis van migratie bestand en deze vervolgens seeden met dummy data.
Applicatie zal starten met yarn start in de omgeving doorgegeven in de .env.

## Testen
Gelieve de instructies hierboven te volgen voor de correcte .env.
Applicatie zal testen met yarn test en coverage tests uitvoeren met yarn test:coverage
