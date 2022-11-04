# Andreeas Firoiu (077350AF)

- [X] Front-end Web Development
  - [GitHub repository](https://github.com/Web-IV/2223-frontendweb-AFIRO)
  - [Online versie](https://gamenerd-fe.vercel.app/)
- [X] Web Services: GITHUB URL
  - [GitHub repository](https://github.com/Web-IV/2223-webservices-AFIRO)
  - [Online versie](https://gamenerd-api.herokuapp.com/)

**Logingegevens**

De namen van de accounts komen overeen met hun rol. Admin heeft rol ADMIN en WRITER. Writer heeft enkel WRITER en user enkel USER. Dit is belangrijk omdat verschillende paden en UI elementen niet gerendered worden zonder de juiste rollen. Zo kan enkel een writer een nieuwsbericht of review aanmaken of wijzigen. Enkel een admin kan verwijderen.

**ADMIN**
- Gebruikersnaam: admin
- Wachtwoord: admin

**WRITER**
- Gebruikersnaam: writer
- Wachtwoord: writer

**USER**
- Gebruikersnaam: user
- Wachtwoord: user

## Projectbeschrijving

Game Nerd, de nieuwste en heetste gaming website, zal het Belgisch landschap veranderen met zijn sterke focus op recensies, catalogeren en
degelijke nieuws.

De website zal gebruikers toelaten om games op te zoeken, gelinkte recensies en nieuws te lezen en zelf recensies online te zetten.

ERD: 

![image](https://user-images.githubusercontent.com/74510849/199118037-9f55c70f-2af4-4080-ae24-4d8c9777eb72.png)

## Screenshots
### Game overzicht net view admin
![image](https://user-images.githubusercontent.com/74510849/199117411-157766ed-d6b6-4471-9b8e-c868e86f1c14.png)

### Nieuws overzicht. Merk op dat een writer enkel zijn eigen berichten kan editeren.
![image](https://user-images.githubusercontent.com/74510849/199117618-19a930dd-b3b4-401a-9295-4bfc92efe026.png)

### Review overzicht. Idem
![image](https://user-images.githubusercontent.com/74510849/199117711-f1beafb1-bd13-443e-a991-67c4bd87e0c8.png)

### Admin only user tab
![image](https://user-images.githubusercontent.com/74510849/199117811-3e06d877-9954-4c2c-bc8f-eff95e4f41ef.png)

### Password aanpassing waar admin niet aan kan
![image](https://user-images.githubusercontent.com/74510849/199117887-0664507e-cbcc-4f93-8aa2-b3e5a74cf4c4.png)



## Behaalde minimumvereisten

> Duid per vak aan welke minimumvereisten je denkt behaald te hebben

### Front-end Web Development

- **componenten**

  - [x] heeft meerdere componenten - dom & slim (naast login/register)
  - [x] definieert constanten (variabelen, functies en componenten) buiten de component
  - [x] minstens één form met validatie (naast login/register)
  - [x] login systeem (eigen of extern zoals bv. Auth0)
<br />

- **routing**
  - [x] heeft minstens 2 pagina's (naast login/register)
  - [x] routes worden afgeschermd met authenticatie en autorisatie
<br />

- **state-management**

  - [x] meerdere API calls (naast login/register)
  - [x] degelijke foutmeldingen indien API call faalt
  - [x] gebruikt useState enkel voor lokale state
  - [x] gebruikt Context, useReducer, Redux… voor globale state
<br />

- **hooks**

  - [x] kent het verschil tussen de hooks (useCallback, useEffect…)
  - [x] gebruikt de hooks op de juiste manier
<br />

- **varia**
  - [x] een aantal niet-triviale testen (unit en/of e2e en/of ui)
  - [x] minstens één extra technologie
  - [x] duidelijke en volledige README.md
  - [x] volledig en tijdig ingediend dossier


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
  - [x] degelijke authorisatie/authenticatie op alle routes
<br />

- **varia**
  - [x] een aantal niet-triviale testen (min. 1 controller >=80% coverage)
  - [x] minstens één extra technologie
  - [x] duidelijke en volledige `README.md`
  - [x] maakt gebruik van de laatste ES6-features (object destructuring, spread operator...)
  - [x] volledig en tijdig ingediend dossier


## Projectstructuur

### Front-end Web Development

Voor mijn frontend heb ik gekozen om de domeinen altijd afzonderlijk te houden daar de features op zichzelf kunnen staan. 
Qua structuur bevat de api map per domein een service die alle calls naar de backend regelt en de modellen die de applicatie gebruikt. Ik werk zo veel mogelijk type-safe waardoor de dto's van front en backend elkaar volgen. Ik acht dit als noodzakelijk daar het good practice is om nooit front en back elkaar te laten vertrouwen.

De map compomenents bevat de componenten per domein met een slim en dom components voor de READ en aparte components voor CREATE, UPDATE en DELETE. Deze gebruiken de id param uit de url om hun data te halen uit de backend indien nodig. Komende vanuit een microservices achtergrond is dit voor mij het meest logische. Ze houden de data bij in hun eigen state zolang nodig om de operatie uit te voeren.

De map context bevat de authprovider die zorgt voor gedeelde login state.

### Web Services

Voor mijn backend ging ik voor een domain-driven structuur met hexagonale architectuur. Al het zware werk qua logica wordt door de services in de domain-laag gedaan met de controllers en repo's als input en output poorten. Gezien het niet nodig was om meer overdreven dingen te doen (integraties, messaging, gateway structuren voor gecombineerde backends, etc.), wou ik het design niet overcompliceren.

Gezien mijn nadruk op domain-driven design leek het ook logisch om object-oriented te werken. TypeScript was dan ook de logische keuze hierbij. Ik heb al mijn type objecten gegroepeerd in een logische ordening.

- controllers
- services
- mappers
- entiteiten met dto's
- repositories
- utility

De map prisma vervangt de datalaag gezien dit volledig gemanaged wordt door Prisma ORM. Mijn filosofie was sowieso om, gezien mijn achtergrond als Java Enterprise developer, zoveel mogelijk de backend te bouwen richting een enterprise standaard en dus zoals volgt mijn structuur min of meer hoe ik een backend zou bouwen in Java Spring voor mijn job. Het leuke aan dit project was dan weer dat ik kon rondkijken binnen het NPM landschap voor modules die doen wat ik nodig heb een manier waar ik mee akkoord kan gaan. Dit is een verademing vergeleken met Spring waar alles vaak op 1 en enkel 1 juiste manier wordt gedaan.

## Extra technologie

### Front-end Web Development

Ik heb het project onmiddellijk gestart als een TypeScript project. Dit garandeerde mijn type-safety en de nuttige definitions hielpen zeker. Het feit dat ik mijn dto's uit de backend kon hergebruiken was dan ook zeer mooi meegenomen.
Als extra technologie heb ik de validatie van alle input uit handen gegeven aan de Yup library. Deze maakt schema's vergelijkbaar met Joi uit de lessen Webservices voor inputvalidatie. Interessant is dat hij werkt ook als het de gebruiker lukt om de HTML velden van het component te omzeilen. Zolang het eindresultaat die naar de handler wordt gestuurd niet strookt met het validatieschema wordt de handler gewoon nooit opgeroepen.

https://www.npmjs.com/package/typescript
https://www.npmjs.com/package/yup

### Web Services

Ik heb sowieso als eerste TypeScript geimplementeerd om logische redenen. TypeScript is sterk opkomend en wordt veelal gezien als good practice in de back-end waar data typing cruciaal is. Hier en daar zorgte dit uiteraard voor de nodige frustraties daar niet alle frameworks graag samenwerken met TypeScript. Koa heeft gelukkig degelijke type definitions.

Verder leek het me interessant om Prisma ORM te gebruiken. Het combineert zeer mooi een ORM, data-modelling, migratie en seeding. Objectief gezien is Prisma als framework mogelijk iets te krachtig voor de use case, maar vroege implementatie hiervan heeft dan weer voordelen qua scaling. De queries die het genereert zijn min of meer wat de gemiddelde developer zou schrijven (zeker vergeleken met het soort queries dat Hibernate soms durft te genereren), dus me dunkt zijn de voordelen veel hoger dan eventuele nadelen.

Gezien ik toch al full TypeScript ben gegaan, vond ik class-validator goed passen in het geheel. Joi's implementatie was niet echt mijn ding en gezien ik al Dto's had gemaakt voor al mijn entiteiten, was ze decoreren met constraints veel logischer dan de builder interface van Joi. Het zou gewoon dubbel werk zijn geweest.

Een laatste is de unsubtiel genaamd "koa-better-error-handler". Deze vervangt de standaard error handler door een leukere met built-in support status codes, status messages en mooie formatting van de error richting de gebruiker.
Het pakt deze dan op gebruiksvriendelijke manier onder de ctx.throw. 

https://www.npmjs.com/package/typescript
https://www.npmjs.com/package/prisma
https://www.npmjs.com/package/class-validator
https://www.npmjs.com/package/koa-better-error-handler

## Testresultaten

### Front-end Web Development

Ik ga zeker en vast akkoord met de redenering dat unit testing in FE een beetje achterhaald is. Unit testing in de front end heb ik al vaak moeten doen  via shallow en mounted rendering, maar ervaring leert dat deze niet 100% waterdicht zijn. Ergens hoort men op twee oren te kunnen slapen indien een component goed doorlopen is met unit testing, maar dat is niet altijd het geval. Ik ben daarom altijd fan geweest van automatische testing via frameworks zoals Cypress en PlayWright. Het enige wat een beetje zout is, is dat response timings bij Cypress kunnen zorgen voor false positives. Ik heb dit opgevangen door strategisch gebruik van timeouts.

Qua structuur heb ik besloten om domein per domein te werken in dezelfde structuur als mijn front-end. Dit leek me logisch gezien mijn design zeer domain-driven is. Waar nodig probeer ik de back-end te mocken. Dit is dan geen echte e2e gezien we nooit de backend bereiken, maar tegelijkertijd vind ik persoonlijk e2e testing buiten een testomgeving of zonder een testcontainer enorm gevaarlijk voor databevuiling. Degelijke mocking hoort normaal gezien ook de uitgaande requests te checken (wat ik ook gedaan heb in elke test) en als de backend doorgetest is... ja, hoeveel nut heeft e2e dan? Er zijn tegenwoordig ook opties zoals Pact-testing om de link tussen FE en BE te testen. Ik heb mijn focus gelegd op  CRUD te testen van alle functionaliteiten gevolgd door alle negatieve paden. Waar relevant check ik ook de correcte rendering van UI elementen. 

Na het configureren van Cypress heb ik merendeel van mijn testen geschreven vanuit het oogpunt van de admin. Reden hiervoor is dat mijn site vrij veel features bevat die enkel zichtbaar zijn voor specifieke rollen. Admin heeft zowel de ADMIN als WRITER rol waardoor deze de meeste rechten bezit. Indien bepaalde zaken afgeschermd zijn, dan switch ik van user. Ik heb het mezelf makkelijker gemaakt door allerhande commando's te definieren zoals heel de login flow of bepaalde mock responses. Hierdoor kon ik vaart maken in de testen.

Resultaat: 119 groene testen. Indien gewenst heb ik ook all.cy.ts bestand gemaakt om deze allemaal tegelijk te draaien. Er staat ook een filmpje van de all run in de cypress map.

![image](https://user-images.githubusercontent.com/74510849/199813239-b6fafc5b-dd87-435c-8282-297c5192ef67.png)


### Web Services

Zoals good practice stipuleert bevatten de entities en dto's geen logica en dus valt er niets te testen. We verwachten dat dit impliciet getest worden door de andere testen.
Om de testen neutraal te houden en menselijke fouten te mijden, heb ik als good practice mijn test data in een eigen bestand gestoken zodat die data statisch kan worden opgeroepen.

Uiteraard gaan we niet rechtstreeks testen op onze databasis, want dat is een enorme bad practice. Prisma heeft echter als voordeel dat we een centraal object hebben dat de connectie managed tussen ons en onze databasis. We kunnen deze met jest-mock mocken, verregaande checks uitvoeren en onze unit tests uitvoeren. Het nadeel is dat we dit object publiek moeten zetten opdat we onze mock kunnen injecteren. Een min-puntje qua encapsulatie, maar een noodzakelijk kwaad. Ik heb een eigen implementatie proberen schrijven met deep-mocking, maar die liep tegen circulaire dependencies aan. Blijkbaar een vaak voorkomend probleem in kader van Prisma en mocking.

Verder gingen de testen goed tot ik bij mijn authentification service kwam. Deze haalt de auth header uit de context van koa. Dit object is echter in typescript niet te mocken daar het meer dan 52 velden bevat als ik mijn compiler mag geloven. Rechtstreeks data erin injecteren en doorgeven is blijkbaar ook geen optie, dus ik kreeg dit niet getest. Er zal wel ergens een correcte manier zijn van dit te mocken (zo heb ik een package gevonden van shopify die dit doet), maar dat leek mij de scope van het project voorbij te gaan.

Het testen van de controllers was een uitdaging. In andere frameworks zijn de endpoints ook effectief functies met een gekoppelde listener, ergo deze kunnen onderworpen aan traditionele unit testing. Daar heel de controller structuur van Koa zich centreert op de twee centrale Koa en Router objecten, is dit niet mogelijk. Router mocken zou weinig opleveren daar de endpoints in dit object worden gegoten. Ik kon mijn controllers dus enkel testen via volledige integratrietesten, wat ergens een beetje verkeerd aanvoelt. 

Na het configureren van supertest begonnen er al een aantal problemen te verschijnen. Om 1 of andere reden vond supertest het niet tof als ik mijn server instantie, prismaclient instantie en request instantie in een ander bestand deed om het daarna door te sluizen naar de test. Hij vond het evenmin leuk om het request object door te sturen naar 
een hulpklasse om mijn tokens te regelen. Nadat ik besloot om dit allemaal in de testbestanden zelf te houden, begon het vlot te gaan en kon ik alle positieve en negatieve paden testen. Ik had ook liever een soort testcontainer databasis gebruikt die verschijnt en verdwijnt aan de start en einde van de testen door middel van Docker gezien dit meer en meer de trend is. Ik heb de nodige packages gevonden daarvoor, maar dit leek me de scope van dit project ver vooruit te gaan dus ik heb hier een lijn getrokken.

Resultaat: 95% coverage op heel applicatie via 155 tests in totaal.

![image](https://user-images.githubusercontent.com/74510849/199118122-8033ce59-cd4f-4919-a381-d8f4c0025e18.png)

## Gekende bugs

### Front-end Web Development

Zodra de JWT token expired, moet de user nog manueel uitloggen en herinloggen. Hij krijgt wel een fout melding.
Bij een harde refresh of harde route change moet de user herinloggen.

Ik begrijp min of meer het probleem. Ergens moet de user opgeslagen worden in localStorage zodat de provider hem kan ophalen bij een bezoek zolang de token nog ok is. Een andere optie is werken met een refresh token waardoor de houder een nieuwe token krijgt zonder in te loggen. Ik vond dit echter vooral nice to haves gezien dit soort login procedures oftewel door libraries, oftewel door 3rd parties geregeld worden.

### Web Services

Geen die ik mij voor de geest kan halen. Het geheel is zeer goed doorgetest.

## Wat is er verbeterd/aangepast?

> Deze sectie is enkel voor 2e zittijd, verwijder deze in 1e zittijd.

### Front-end Web Development

- Dit en dat

### Web Services

- Oh en dit ook
