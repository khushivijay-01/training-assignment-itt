const footer = document.getElementById("footer");
if (!footer) {
    throw new Error("Footer element not found!");
}
const copyright = document.createElement("p");
copyright.textContent = "© 2026 Roots & Bistro. All Rights Reserved.";
footer.appendChild(copyright);
export {};
//# sourceMappingURL=footer.js.map