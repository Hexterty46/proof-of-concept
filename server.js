import express from "express"

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from "liquidjs"

// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Maak werken met data uit formulieren iets prettiger
app.use(express.urlencoded({ extended: true }))

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static("public"))

// Stel Liquid in als 'view engine'
const engine = new Liquid()
app.engine("liquid", engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set("views", "./views")

app.get("/", async function (request, response) {
  const params = {
    fields:
      "sizes.*, brand, specifications.*, description.*, summary, title, features.*, price, images.*",
  }

  const productResponse = await fetch(
    "https://fdnd-agency.directus.app/items/decathlon_products?" +
      new URLSearchParams(params)
  )
  const productData = await productResponse.json()

  const reviewsResponse = await fetch(
    "https://fdnd-agency.directus.app/items/decathlon_reviews"
  )
  const reviewsData = await reviewsResponse.json()

  const product = productData.data[0]


  const imageUrls = (product.images || []).map((img) => {
    return `https://fdnd-agency.directus.app/assets/${img.directus_files_id}`
  })


  response.render("index.liquid", {
    product,
    imageUrls,
    reviews: reviewsData.data,
  })
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000; als deze applicatie ergens gehost wordt, waarschijnlijk poort 80
app.set("port", process.env.PORT || 8000)

// Start Express op, gebruik daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console
  console.log(
    `Daarna kun je via http://localhost:${app.get("port")}/ jouw interactieve website bekijken.\n\nMaak mooie dingen 🙂`,
  )
})

app.use(function (req, res) {
  res.status(404).render("404.liquid");
});

console.log("Hier komt je server voor Sprint 12.")
