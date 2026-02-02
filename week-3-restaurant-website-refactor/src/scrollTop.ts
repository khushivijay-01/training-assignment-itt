const scrollTopButton = document.getElementById("scrollTopBtn") as HTMLButtonElement | null;

if (!scrollTopButton) {
  throw new Error("Scroll-to-top button not found!");
}

window.addEventListener("scroll", (): void => {
  if (window.scrollY > 200) {
    scrollTopButton.style.display = "block";
  } else {
    scrollTopButton.style.display = "none";
  }
});

scrollTopButton.addEventListener("click", (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
