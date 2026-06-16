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

engine.registerFilter('relative_time', function (iso) {
  if (!iso) return '';
  // Directus may return datetimes without a timezone offset.
  // Treat bare ISO datetimes as UTC so 'just now' works correctly for recent posts.
  var normIso = iso;
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(iso)) {
    normIso = iso + 'Z';
  }
  var date = new Date(normIso);
  if (isNaN(date)) return iso;
  var now = new Date();
  var diffMs = now - date;
  var diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return diffMin + 'min ago';
  var diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return diffH + 'h ago';
  var diffD = Math.floor(diffH / 24);
  if (diffD < 7) return diffD + 'd ago';
  var diffW = Math.floor(diffD / 7);
  if (diffW < 4) return diffW + 'w ago';
  var diffM = Math.floor(diffD / 30);
  if (diffM < 12) return diffM + 'm ago';
  var diffY = Math.floor(diffD / 365);
  return diffY + 'y ago';
})

app.engine("liquid", engine.express())

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set("views", "./views")

const userReview = {
  name: 'Semih',
  rating: 5,
  id: 31
}

app.get("/", async function (request, response) {
  const params = {
    fields:
      "sizes, brand, specifications.*, description.*, summary, title, features.*, price, images.*, id",
  }

  const productResponse = await fetch(
    "https://fdnd-agency.directus.app/items/decathlon_products?" +
      new URLSearchParams(params)
  )
  const productData = await productResponse.json()

  const reviewsResponse = await fetch(
    "https://fdnd-agency.directus.app/items/decathlon_reviews"
  )

  // console.log("Status reviews:", reviewsResponse.status)

  const reviewsData = await reviewsResponse.json()
  // console.log("reviews data:", reviewsData)
  // console.log("reviews array:", reviewsData.data)

  const product = productData.data[0]

  const imageUrls = (product.images || []).map((img) => {
    return `https://fdnd-agency.directus.app/assets/${img.directus_files_id}`
  })

  // console.log("product =", product)
  // console.log("product.sizes =", product.sizes)

  response.render("index.liquid", {
    product,
    imageUrls,
    reviews: reviewsData.data,
    userReview,
  })
})

app.post("/reviews", async function (req, res) {
  try {
    const {
      title,
      description,
      grip,
      foot_support,
      lightweight,
      value_for_money,
      look_design,
      rating,
      name,
      location,
    } = req.body

    const attributes = [
      { criteria: "Grip",           score: Number(grip) },
      { criteria: "Foot support",   score: Number(foot_support) },
      { criteria: "Lightweight",    score: Number(lightweight) },
      { criteria: "Value for money",score: Number(value_for_money) },
      { criteria: "Look / design",  score: Number(look_design) },
    ]

    const newReview = {
      title,
      description,
      rating: Number(rating),
      attributes,
      verified_buyer: false,
      name: userReview.name,
      location: location || null,
      product: 8974697,
    }

    console.log("nieuwe review:", newReview)

    const responseDirectus = await fetch(
      "https://fdnd-agency.directus.app/items/decathlon_reviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      }
    )

    if (!responseDirectus.ok) {
      console.error("Directus fout:", await responseDirectus.text())
      return res.status(500).send("Review opslaan mislukt")
    }

    res.redirect("/#reviews")
  } catch (error) {
    console.error(error)
    res.status(500).send("Serverfout bij het opslaan van de review")
  }
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
