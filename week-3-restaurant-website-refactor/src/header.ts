const header = document.querySelector<HTMLElement>(".header");
const sections = document.querySelectorAll<HTMLElement>("section");
const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav a");

if (!header) {
  throw new Error("Header element not found!");
}

window.addEventListener("scroll", (): void => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

window.addEventListener("scroll", (): void => {
  let currentSection: string = "";
  const headerHeight: number = header.offsetHeight;

  sections.forEach((section: HTMLElement): void => {
    const sectionTop: number = section.offsetTop - headerHeight;
    const sectionHeight: number = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      const id: string | null = section.getAttribute("id");
      if (id) {
        currentSection = id;
      }
    }
  });

  navLinks.forEach((link: HTMLAnchorElement): void => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});
