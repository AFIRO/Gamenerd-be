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
## Opstarten

Draai allereerst een NPM install om alle dependencies binnen te halen.

Maak een .env bestand aan met de volgende parameters en hun invullen. 

- DATABASE_URL=*database url: verwacht standaard een msql databasis*
- DATABASE_HOST=*host van db*
- DATABASE_PORT=*poort van db*
- DATABASE_USERNAME=*username van de toepassingsuser die rechten heeft op de db*
- DATABASE_PASSWORD=*username van de toepassingsuser die rechten heeft op de db*

Ik voeg hieronder de gegevens toe van mijn databasis zoals mij werd doorgegeven. Uiteraard is dit in een echt project een massieve faux pas en hoort dit enkel in env bestanden te staan bij de dev lokaal en idealiter remote geinjecteerd  via een configuratie server of via de pipeline van Github Actions of Jenkins als variabelen. Dit is gewoon gedaan om het het evalueren makkelijker te maken voor de docent. Als ik dit project ooit op mijn publiek git voor mijn portfolio ga ik dit uiteraard verwijderen.

DATABASE_URL="mysql://077350af:vUIwN8ktNVWCGxAXq33f@vichogent.be:40043/077350af?connection_limit=10&pool_timeout=180"
DATABASE_HOST="vichogent.be"
DATABASE_PORT=40043
DATABASE_USERNAME="077350af"
DATABASE_PASSWORD="vUIwN8ktNVWCGxAXq33f"
DATABASE_NAME="077350af"

Indien een nieuwe db wordt gekoppeld, gelieve de volgende commando's uit te voeren.

- yarn prisma:push
- yarn prisma:seed

Hiermee zal Prisma ORM de nieuwe DB aanmaken op basis van migratie bestand en deze vervolgens seeden met dummy data.
Applicatie zal starten met yarn start:local in de omgeving doorgegeven in de .env.

Er is ook een gewone start. Deze dient puur voor Heroku. Daar Heroku geen TypeScript kan draaien moet er een tweede start commando zijn waar Heroku op kan draaien. Mijn Heroku is afgesteld opdat deze eerst heel het project transpileert naar JS en dan de nieuwe JS bestanden draait. als het project.

## Documentatie
Documentatie rond de endpoints is te vinden in de Excel in de root folder.
Swaggerdoc is geimplementeerd om te tonen dat ik dit kan en zou kunnen aangevuld worden met extra definities in de Swagger.yml, maar met mijn voltijdse job heb ik niet genoeg vrije tijd om naast al het ander schoolwerk om 27 endpoints te documenteren in swagger definities. Na overleg in een Github Issue werd dit tevens bestempeld als een nice-to-have.

## Testen
Gelieve de instructies hierboven te volgen voor de correcte .env.
Applicatie zal testen met yarn test en coverage tests uitvoeren met yarn test:coverage.

Indien testen lokaal draaien, gelieve uiteraard eerst prisma de DB te laten configureren en dummy data te seeden.
