# Examenopdracht  Web Services

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

- DATABASE_URL=*database url: verwacht standaard een msql databasis*
- DATABASE_HOST=*host van db*
- DATABASE_PORT=*poort van db*
- DATABASE_USERNAME=*username van de toepassingsuser die rechten heeft op de db*
- DATABASE_PASSWORD=*username van de toepassingsuser die rechten heeft op de db*

De gegevens zijn in een text bestand in de root van het project. Dit is normaal

DATABASE_URL="mysql://OssIeUgXcE:d6L1Qa10JK@remotemysql.com:3306/OssIeUgXcE"

Indien een nieuwe db wordt gekoppeld, gelieve de volgende commando's uit te voeren.

- yarn prisma:push
- yarn prisma:seed

Hiermee zal Prisma ORM de nieuwe DB aanmaken op basis van migratie bestand en deze vervolgens seeden met dummy data.
Applicatie zal starten met yarn start:local in de omgeving doorgegeven in de .env.

## Documentatie
Documentatie rond de endpoints is te vinden in de Excel in de root folder.
Swaggerdoc is geimplementeerd om te tonen dat ik dit kan en zou kunnen aangevuld worden met extra definities in de Swagger.yml, maar met mijn voltijdse job heb ik niet genoeg vrije tijd om naast al het ander schoolwerk 27 endpoints te documenteren in swagger definities. Na overleg in een Github Issue werd dit tevens bestempeld als een nice-to-have.

## Testen
Gelieve de instructies hierboven te volgen voor de correcte .env.
Applicatie zal testen met yarn test en coverage tests uitvoeren met yarn test:coverage
