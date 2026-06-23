document.addEventListener("DOMContentLoaded", () => {
  const gallery  = document.querySelector(".product-gallery")
  if (!gallery) return

  const mainImg     = gallery.querySelector("#main-image")
  const mainLink    = gallery.querySelector(".product-main-link")
  const mainPicture = gallery.querySelector(".main-section-images picture")
  const mainSources = mainPicture
    ? mainPicture.querySelectorAll("source")
    : []

  const thumbs = gallery.querySelectorAll(".sub-section-images a")

  if (!mainImg || !mainLink || thumbs.length === 0) return

  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", (event) => {
      event.preventDefault()

      const full = thumb.getAttribute("data-full")
      if (!full) return

      const urlImg   = full + "?fit=cover&width=400&quality=80"
      const urlAvif  = full + "?fit=cover&format=avif&width=400&quality=80"
      const urlWebp  = full + "?fit=cover&format=webp&width=400&quality=80"

      // fallback
      mainImg.src = urlImg
      mainImg.alt = thumb.querySelector("img")?.alt || mainImg.alt

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

    thumb.setAttribute("role", "button")
    thumb.setAttribute("tabindex", "0")
    thumb.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        thumb.click()
      }
    })
  })
})