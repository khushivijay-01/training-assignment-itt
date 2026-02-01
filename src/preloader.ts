const preloader = document.querySelector<HTMLElement>("[data-preload]");

if (!preloader) {
  throw new Error("Preloader element not found!");
}

window.addEventListener("load", (): void => {
    preloader.classList.add("loaded");
    
    setTimeout((): void => {
        preloader.style.display = "none";
    }, 500);
});