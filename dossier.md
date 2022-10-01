# Andreeas Firoiu (077350AF)

> Duid aan welke vakken je volgt en vermeld voor deze vakken de link naar jouw GitHub repository. In het geval je slechts één vak volgt, verwijder alle inhoud omtrent het andere vak.
> Verwijder alle instructies (lijnen die starten met >)

- [X] Front-end Web Development
  - [GitHub repository](github.com/HOGENT-Web)
  - [Online versie](github.com/HOGENT-Web)
- [X] Web Services: GITHUB URL
  - [GitHub repository](https://github.com/Web-IV/2223-webservices-AFIRO)
  - [Online versie](github.com/HOGENT-Web)

**Logingegevens**

- Gebruikersnaam/e-mailadres:
- Wachtwoord:

> Vul eventueel aan met extra accounts voor administrators of andere rollen.

## Projectbeschrijving

Game Nerd, de nieuwste en heetste gaming website, zal het Belgisch landschap veranderen met zijn sterke focus op recensies, catalogeren en
degelijke nieuws.

De website zal gebruikers toelaten om games op te zoeken, gelinkte recensies en nieuws te lezen en zelf recensies online te zetten.

Technisch: 
Game entiteiten met CRUD die one to many linken met nieuws items en recensies. Hoe de content opslaan nog niet besloten (me dunkt referenties naar een blob). Uiteraard moet content dan verder doorlinken
naar users.

## Screenshots

> Voeg enkele (nuttige!) screenshots toe die tonen wat de app doet.

## Behaalde minimumvereisten

> Duid per vak aan welke minimumvereisten je denkt behaald te hebben

### Front-end Web Development

- **componenten**

  - [ ] heeft meerdere componenten - dom & slim (naast login/register)
  - [ ] definieert constanten (variabelen, functies en componenten) buiten de component
  - [ ] minstens één form met validatie (naast login/register)
  - [ ] login systeem (eigen of extern zoals bv. Auth0)
<br />

- **routing**
  - [ ] heeft minstens 2 pagina's (naast login/register)
  - [ ] routes worden afgeschermd met authenticatie en autorisatie
<br />

- **state-management**

  - [ ] meerdere API calls (naast login/register)
  - [ ] degelijke foutmeldingen indien API call faalt
  - [ ] gebruikt useState enkel voor lokale state
  - [ ] gebruikt Context, useReducer, Redux… voor globale state
<br />

- **hooks**

  - [ ] kent het verschil tussen de hooks (useCallback, useEffect…)
  - [ ] gebruikt de hooks op de juiste manier
<br />

- **varia**
  - [ ] een aantal niet-triviale testen (unit en/of e2e en/of ui)
  - [ ] minstens één extra technologie
  - [ ] duidelijke en volledige README.md
  - [ ] volledig en tijdig ingediend dossier


### Web Services

- **datalaag**

  - [x] voldoende complex (meer dan één tabel)
  - [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
  Opmerking Andreeas: connect en disconnect wordt gemanaged door Prisma ORM. Bij het uitvoeren van de eerste query opent hij een connectie en bij eindigen van de Node applicatie sluit hij de connectie. 
  https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/connection-management
  - [x] heeft migraties
  - [x] heeft seeds
<br />

- **repositorylaag**

  - [x] definieert één repository per entiteit (niet voor tussentabellen) - indien van toepassing
  - [x] mapt OO-rijke data naar relationele tabellen en vice versa
<br />

- **servicelaag met een zekere complexiteit**

  - [x] bevat alle domeinlogica
  - [x] bevat geen SQL-queries of databank-gerelateerde code
<br />

- **REST-laag**

  - [x] meerdere routes met invoervalidatie
  - [x] degelijke foutboodschappen
  - [x] volgt de conventies van een RESTful API
  - [x] bevat geen domeinlogica
  - [ ] degelijke authorisatie/authenticatie op alle routes
<br />

- **varia**
  - [ ] een aantal niet-triviale testen (min. 1 controller >=80% coverage)
  - [x] minstens één extra technologie
  - [ ] duidelijke en volledige `README.md`
  - [x] maakt gebruik van de laatste ES6-features (object destructuring, spread operator...)
  - [x] volledig en tijdig ingediend dossier


## Projectstructuur

### Front-end Web Development

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns, hiërarchie van componenten, state...)?

### Web Services

> Hoe heb je jouw applicatie gestructureerd (mappen, design patterns...)?

Voor mijn backend ging ik voor de klassieke structuur van controller - service - repository - datalaag. Gezien het niet nodig was om meer overdreven dingen te doen (integraties, messaging, gateway stuctuur, etc.), wou ik het design niet overcompliceren.

Ik heb besloten om het heel OO te doen gezien, laten we eerlijk zijn, JS binnen de industrie meer en meer marktaandeel verliest tegenover TS. Ik heb al mijn type objecten gegroepeerd in een logische ordening.

- controllers
- services
- mappers
- entiteiten met dto's
- repositories
- utility

De map prisma vervangt de datalaag gezien dit volledig gemanaged wordt door Prisma ORM. Mijn filosofie was sowieso om, gezien mijn achtergrond als Java Enterprise developer, zoveel mogelijk de backend te bouwen richting een enterprise standaard en dus zoals volgt mijn structuur min of meer hoe ik een backend zou bouwen in Java Spring voor mijn job. Het leuke aan dit project was dan weer dat ik kon rondkijken binnen het NPM landschap voor modules die doen wat ik nodig heb een manier waar ik mee akkoord kan gaan. Dit is een verademing vergeleken met Spring waar alles vaak op 1 en enkel 1 juiste manier wordt gedaan.

## Extra technologie

### Front-end Web Development

> Wat is de extra technologie? Hoe werkt het? Voeg een link naar het npm package toe!

### Web Services

> Wat is de extra technologie? Hoe werkt het? Voeg een link naar het npm package toe!

Ik heb sowieso als eerste TypeScript geimplementeerd om logische redenen. Ik denk dat ik in 2022 toch wel type-safety mag eisen van een backend. Functioneel programmeren is leuk voor kleine applicaties, maar is problematisch voor scaling en communicatie tussen teamleden. Nuances in complexere data gaat zo verloren. 

Verder leek het me interessant om Prisma ORM te gebruiken. Het combineert zeer mooi een ORM, data-modelling, migratie en seeding. Objectief gezien is Prisma als framework mogelijk iets te krachtig voor de use case, maar vroege implementatie hiervan heeft dan weer voordelen qua scaling. De queries die het genereert zijn min of meer wat de gemiddelde developer zou schrijven (zeker vergeleken met het soort queries dat Hibernate soms durft te genereren), dus me dunkt zijn de voordelen veel hoger dan eventuele nadelen.

Gezien ik toch al full TypeScript ben gegaan, vond ik class-validator goed passen in het geheel. Joi's implementatie was niet echt mijn ding en gezien ik al Dto's had gemaakt voor al mijn entiteiten, was ze decoreren met constraints veel logischer dan de builder interface van Joi. Het zou gewoon dubbel werk zijn geweest.

Een laatste is een unsubtiel genaamd "koa-better-error-handler". Deze vervangt de standaard error handler door een leukere met built-in support status codes, status messages en mooie formatting van de error richting de gebruiker.
Het pakt deze dan op gebruiksvriendelijke manier onder de ctx.throw. Ik heb ook zitten zoeken naar een meer globalere oplossing, maar ik kon direct eentje vinden waarmee ik een error handler kon definieren die, op basis van opties in een error object, een flow kon volgen analoog aan de Global Advisor van Spring. Helaas. Dat had de implementatie veel cleaner gemaakt.

https://www.npmjs.com/package/typescript
https://www.npmjs.com/package/prisma
https://www.npmjs.com/package/class-validator
https://www.npmjs.com/package/koa-better-error-handler

## Testresultaten

### Front-end Web Development

> Schrijf hier een korte oplijsting en beschrijving van de geschreven testen

### Web Services

> Schrijf hier een korte oplijsting en beschrijving van de geschreven testen + voeg een screenshot van de coverage en uitvoering toe

## Gekende bugs

### Front-end Web Development

> Zijn er gekende bugs?

### Web Services

> Zijn er gekende bugs?

## Wat is er verbeterd/aangepast?

> Deze sectie is enkel voor 2e zittijd, verwijder deze in 1e zittijd.

### Front-end Web Development

- Dit en dat

### Web Services

- Oh en dit ook
