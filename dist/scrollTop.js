const scrollTopButton = document.getElementById("scrollTopBtn");
if (!scrollTopButton) {
    throw new Error("Scroll-to-top button not found!");
}
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollTopButton.style.display = "block";
    }
    else {
        scrollTopButton.style.display = "none";
    }
});
scrollTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
export {};
//# sourceMappingURL=scrollTop.js.map