const main = document.querySelector("#main");
const crs = document.querySelector(".cursor");

main.addEventListener("mousemove", (e) => {
  crs.style.left = e.x + "px";
  crs.style.top = e.y + "px";
});
