const header = document.querySelector(".header");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");
if (!header) {
    throw new Error("Header element not found!");
}
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    }
    else {
        header.classList.remove("scrolled");
    }
});
window.addEventListener("scroll", () => {
    let currentSection = "";
    const headerHeight = header.offsetHeight;
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - headerHeight;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {
            const id = section.getAttribute("id");
            if (id) {
                currentSection = id;
            }
        }
    });
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});
export {};
//# sourceMappingURL=header.js.map