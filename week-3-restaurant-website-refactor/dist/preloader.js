const preloader = document.querySelector("[data-preload]");
if (!preloader) {
    throw new Error("Preloader element not found!");
}
window.addEventListener("load", () => {
    preloader.classList.add("loaded");
    setTimeout(() => {
        preloader.style.display = "none";
    }, 500);
});
export {};
//# sourceMappingURL=preloader.js.map