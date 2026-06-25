document.addEventListener("DOMContentLoaded", () => {
  // Algemene product-gallery word gezocht
  const gallery  = document.querySelector(".product-gallery")
  // Als er geen product-gallery word gevonden dan stopt de code
  if (!gallery) return


  const mainImg     = gallery.querySelector("#main-image")
  // hoofdafbeelding

  const mainLink    = gallery.querySelector(".product-main-link")
  // link om de hoofdafbeelding bijvoorbeeld in een lightbox of nieuwe pagina te openen
  const mainPicture = gallery.querySelector(".main-section-images picture")
  // Pakt de picture element
  const mainSources = mainPicture
    ? mainPicture.querySelectorAll("source")
    : []

  // Kleine afbeeldingen die aangeklikt kunnen worden
  const thumbs = gallery.querySelectorAll(".sub-section-images a")

  // Als er iets ontbreekt word er direct gestopt
  if (!mainImg || !mainLink || thumbs.length === 0) return

  thumbs.forEach((thumb) => { 
    thumb.addEventListener("click", (event) => { // Voor elke thumbnail word een event listener toegevoegd
      event.preventDefault()

      const full = thumb.getAttribute("data-full")
      if (!full) return

      // verschillende formaten van de hoofdafbeelding
      const urlImg   = full + "?fit=cover&width=400&quality=80"
      const urlAvif  = full + "?fit=cover&format=avif&width=400&quality=80"
      const urlWebp  = full + "?fit=cover&format=webp&width=400&quality=80"

      // fallback
      mainImg.src = urlImg
      mainImg.alt = thumb.querySelector("img")?.alt || mainImg.alt // alt tekst word gewijzigd op basis van de thumbnail afbeelding

      mainSources.forEach((source) => {
        const type = source.getAttribute("type")
        if (type === "image/avif") {
          source.srcset = urlAvif
        } else if (type === "image/webp") {
          source.srcset = urlWebp
        } else {
          // dit is een fallback
          source.srcset = urlImg
        }
      })

      mainLink.href = full
      mainLink.dataset.full = full

      thumbs.forEach(t => t.classList.remove("is-active"))
      thumb.classList.add("is-active")
    });

    // thumb.setAttribute("role", "button")
    // thumb.setAttribute("tabindex", "0")

    thumb.addEventListener("keydown", (e) => {
      // event listener voor als er op enter of spatie word geklikt 
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        thumb.click() // simuleert alsof er echt geklikt is met je muis
      }
    })
  })
})