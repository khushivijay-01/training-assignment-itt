const footer = document.getElementById("footer") as HTMLElement | null;

if(!footer) {
    throw new Error("Footer element not found!");
}

const copyright: HTMLParagraphElement = document.createElement("p");
copyright.textContent = "© 2026 Roots & Bistro. All Rights Reserved.";

footer.appendChild(copyright);
