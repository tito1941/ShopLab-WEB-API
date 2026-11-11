const API_URL = "https://dummyjson.com";
const state = { products: [], getRequests: 0, postRequests: 0 };
const elements = {
  grid: document.querySelector("#product-grid"),
  empty: document.querySelector("#empty-message"),
  search: document.querySelector("#search-input"),
  category: document.querySelector("#category-select"),
  status: document.querySelector("#status-message"),
  getCount: document.querySelector("#get-count"),
  postCount: document.querySelector("#post-count")
};

function updateRequestCounter(type) {
  state[type === "GET" ? "getRequests" : "postRequests"] += 1;
  elements.getCount.textContent = state.getRequests;
  elements.postCount.textContent = state.postRequests;
}

async function request(path, options = {}) {
  const method = options.method || "GET";
  updateRequestCounter(method);
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) }
  });
  if (!response.ok) throw new Error(`La API respondió con ${response.status}`);
  return response.json();
}

function renderProducts() {
  const term = elements.search.value.trim().toLowerCase();
  const category = elements.category.value;
  const products = state.products.filter((product) =>
    product.title.toLowerCase().includes(term) &&
    (category === "all" || product.category === category)
  );
  elements.grid.innerHTML = products.map((product) => `
    <article class="product">
      <div class="product-image"><img src="${product.thumbnail}" alt="${product.title}" loading="lazy"></div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.title}</h3>
        <div class="product-bottom"><span class="price">${product.price.toFixed(2)} €</span><span class="rating">★ ${product.rating.toFixed(1)}</span></div>
      </div>
    </article>
  `).join("");
  elements.empty.classList.toggle("hidden", products.length > 0);
}

function fillCategories(categories) {
  elements.category.innerHTML = '<option value="all">Todas las categorías</option>' +
    categories.map((category) => `<option value="${category}">${category}</option>`).join("");
}

async function loadCatalog() {
  elements.status.textContent = "Consultando productos y categorías...";
  try {
    // GET 1: lista de productos; GET 2: lista de categorías.
    const [productData, categories] = await Promise.all([
      request("/products?limit=30"),
      request("/products/categories")
    ]);
    state.products = productData.products;
    fillCategories(categories);
    renderProducts();
    elements.status.textContent = `${state.products.length} productos cargados correctamente`;
  } catch (error) {
    elements.status.textContent = "No se pudo cargar el catálogo. Revisa tu conexión.";
    console.error(error);
  }
}

async function searchProducts() {
  const term = elements.search.value.trim();
  if (term.length < 3) {
    renderProducts();
    return;
  }
  try {
    // GET 3: búsqueda remota en la API.
    const data = await request(`/products/search?q=${encodeURIComponent(term)}`);
    state.products = data.products;
    renderProducts();
    elements.status.textContent = `${data.total} resultado(s) para «${term}»`;
  } catch (error) {
    elements.status.textContent = "No se pudo realizar la búsqueda.";
    console.error(error);
  }
}

async function submitReview(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const feedback = document.querySelector("#review-feedback");
  const data = Object.fromEntries(new FormData(form));
  feedback.textContent = "Enviando...";
  try {
    // POST 1: crea una publicación de reseña (respuesta simulada).
    const created = await request("/posts/add", {
      method: "POST",
      body: JSON.stringify({ title: data.title, body: data.body, userId: 1 })
    });
    feedback.textContent = `✓ Reseña creada con ID ${created.id}`;
    form.reset();
  } catch (error) {
    feedback.textContent = "No se pudo enviar la reseña.";
    console.error(error);
  }
}

async function submitProduct(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const feedback = document.querySelector("#product-feedback");
  const data = Object.fromEntries(new FormData(form));
  feedback.textContent = "Enviando...";
  try {
    // POST 2: crea un producto (respuesta simulada, no persistente).
    const created = await request("/products/add", {
      method: "POST",
      body: JSON.stringify({ title: data.title, price: Number(data.price), category: data.category })
    });
    feedback.textContent = `✓ Propuesta creada con ID ${created.id}`;
    form.reset();
  } catch (error) {
    feedback.textContent = "No se pudo enviar la propuesta.";
    console.error(error);
  }
}

elements.search.addEventListener("input", searchProducts);
elements.category.addEventListener("change", renderProducts);
document.querySelector("#refresh-button").addEventListener("click", loadCatalog);
document.querySelector("#review-form").addEventListener("submit", submitReview);
document.querySelector("#product-form").addEventListener("submit", submitProduct);
loadCatalog();
