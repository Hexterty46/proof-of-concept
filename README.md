Ontwerp en maak een data driven online concept voor een opdrachtgever

De instructies voor deze opdracht staan in: [docs/INSTRUCTIONS.md](https://github.com/fdnd-task/proof-of-concept/blob/main/docs/INSTRUCTIONS.md)

# Titel
<!-- Geef je project een titel en schrijf in één zin wat het is -->

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->
Dit project richt zich op het verbeteren van de productdetailpagina (PDP) voor Decathlon Travel. Het doel was om een ​​gebruiksvriendelijkere en mobielvriendelijkere ervaring te creëren voor de productgalerij en interactieve functies toe te voegen.

De opdracht omvatte het ontwikkelen van een responsieve afbeeldingengalerij met miniaturen, een zoomfunctie en prestatieoptimalisaties. Extra aandacht werd besteed aan toegankelijkheid, gebruiksvriendelijkheid en laadsnelheid om de algehele gebruikerservaring te verbeteren.

website: https://proof-of-concept-zmh2.onrender.com/

<img width="388" height="730" alt="image" src="https://github.com/user-attachments/assets/a592c20e-00d3-4b45-ba98-6ec5bdf41e02" />


## Gebruik
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->
Op de pagina kom je meteen een carrousel tegen waarin je meerdere foto's kan bekijken van de product.

https://github.com/user-attachments/assets/8505f457-a0cc-4840-91a2-a3cafcfcc2c9

Ook kan je op de pagina reviews geven op het product.


https://github.com/user-attachments/assets/5224d56a-403c-48c9-b3bb-e4ec5adfc609


## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->
### HTML
De pagina is opgebouwd met behulp van semantische HTML-elementen zoals `header`, `body`, `footer` `main`. `nav`, `section`. Ook is er gebruik gemaakt van, partials om de HTML in stukjes te delen voor een betere inzicht op je code.
https://github.com/Hexterty46/proof-of-concept/blob/a6be8e759e434ab451f6b1bfc7e90671a59ca918/views/index.liquid#L4

## CSS
Met CSS word gebruik gemaakt van custom properties. Hierdoor blijft de styling consistent en onderhoudbaar. Ook word er rekening gehouden met toegankelijkheid.

https://github.com/Hexterty46/proof-of-concept/blob/5dc3e45ae90f20bb42f647e43bd85e614ec8bbc9/public/styles/style.css#L10

https://github.com/Hexterty46/proof-of-concept/blob/5dc3e45ae90f20bb42f647e43bd85e614ec8bbc9/public/styles/style.css#L72-L74

## Progressive Enhancement
Op de pagina is op 2 plekken progressive enhancement toegepast, op de carrousel en op de meun knop links boven
<img width="39" height="42" alt="image" src="https://github.com/user-attachments/assets/0364265b-5316-47cc-863b-5c42a482d523" />
<img width="387" height="474" alt="image" src="https://github.com/user-attachments/assets/5e44f78c-072a-48d2-98d6-1e9bec35cccb" />

Met client side javascript zorg ik ervoor, dat de menu altijd geopend, en gesloten kan worden. Met of zonder javascript.

https://github.com/user-attachments/assets/da73f84f-969e-45eb-9754-40e49c1e7ee8

https://github.com/Hexterty46/proof-of-concept/blob/5dc3e45ae90f20bb42f647e43bd85e614ec8bbc9/public/script.js#L1-L17

Op de carrousel zorg ik ervoor dat de afbeeldingen die onder de hoofd afbeelding staan, als hoofdafbeelding geselecteerd kan worden.

<img width="348" height="465" alt="image" src="https://github.com/user-attachments/assets/015b34c1-514a-4b40-bc2c-e5084aef12cf" />

https://github.com/user-attachments/assets/acf4b43d-aa82-4501-9a34-b28eb11f2c4f

Door javascript uit te schakelen kunnen de producten nog steeds bekeken worden. Als je op een van de foto's klikt, word je naar een andere pagina geleidt om de foto's in detail te bekijken

https://github.com/Hexterty46/proof-of-concept/blob/5dc3e45ae90f20bb42f647e43bd85e614ec8bbc9/public/client.js#L1-L59



## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->
- installeer npm
- Clone de repository
- Open de folder in VSCodium
- Open de terminal en vul in:
1. npm install
2. npm start

Ga naar localhost:8000 in je browser om het live te bekijken


## Bronnen

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
