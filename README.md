## Opstarten

Draai allereerst een NPM install om alle dependencies binnen te halen.

Maak een .env bestand aan met de volgende parameters en hun invullen. 
- NODE_ENV=development (test of production mag ook).
- DATABASE_URL=*database url: verwacht standaard een msql databasis*
- DATABASE_HOST=*host van db*
- DATABASE_PORT=*poort van db*
- DATABASE_USERNAME=*username van de toepassingsuser die rechten heeft op de db*
- DATABASE_PASSWORD=*username van de toepassingsuser die rechten heeft op de db*

Indien een nieuwe db wordt gekoppeld, gelieve de volgende commando's uit te voeren.

- yarn prisma:push
- yarn prisma:seed

Hiermee zal Prisma ORM de nieuwe DB aanmaken op basis van migratie bestand en deze vervolgens seeden met dummy data.
Applicatie zal starten met yarn start:local in de omgeving doorgegeven in de .env.

Er is ook een gewone start. Deze dient puur voor Heroku. Daar Heroku geen TypeScript kan draaien moet er een tweede start commando zijn waar Heroku op kan draaien. Mijn Heroku is afgesteld opdat deze eerst heel het project transpileert naar JS en dan de nieuwe JS bestanden draait. als het project.

## Documentatie
Documentatie rond de endpoints is te vinden in de Excel in de root folder.
Swaggerdoc is geimplementeerd om te tonen dat ik dit kan en zou kunnen aangevuld worden met extra definities in de Swagger.yml, maar met mijn voltijdse job heb ik niet genoeg vrije tijd om naast al het ander schoolwerk om 27 endpoints te documenteren in swagger definities.

## Testen
Gelieve de instructies hierboven te volgen voor de correcte .env.
Applicatie zal testen met yarn test en coverage tests uitvoeren met yarn test:coverage.

Indien testen lokaal draaien, gelieve uiteraard eerst prisma de DB te laten configureren en dummy data te seeden.
