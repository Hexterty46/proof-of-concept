const menuOpen = document.querySelector("#menuOpen")
const menu = document.querySelector(".menu")
const menuClose = document.querySelector("#menuClose")

menuOpen.addEventListener("click", function (event) {
  event.preventDefault()
  menu.classList.add("is-open")
})

menuClose.addEventListener("click", function (event) {
  event.preventDefault()
  menu.classList.remove("is-open")
})

console.log("menuOpen:", menuOpen)
console.log("menu:", menu)
console.log("menuClose:", menuClose)