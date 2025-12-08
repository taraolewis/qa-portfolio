const navButtons = document.querySelectorAll(".nav-btn");
const pageContent = document.getElementById("page-content");

async function loadPage(pageId) {
  try {
    const response = await fetch(`pages/${pageId}.html`);
    if (!response.ok) throw new Error(`Could not load page: ${pageId}`);

    const html = await response.text();
    pageContent.innerHTML = html;

    navButtons.forEach((btn) => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error(error);
    pageContent.innerHTML =
      "<h2>Error</h2><p>Sorry, this page could not be loaded.</p>";
  }
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const pageId = btn.getAttribute("data-page");
    loadPage(pageId);
  });
});

loadPage("about");
