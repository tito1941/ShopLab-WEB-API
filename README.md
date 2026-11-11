# ShopLab

Página web interactiva desarrollada con HTML, CSS y JavaScript para consumir la API pública y gratuita [DummyJSON](https://dummyjson.com/).

## Peticiones realizadas

- **GET `/products?limit=30`**: carga el catálogo inicial.
- **GET `/products/categories`**: obtiene las categorías disponibles para el filtro.
- **GET `/products/search?q=...`**: busca productos cuando se escriben al menos tres caracteres.
- **POST `/posts/add`**: publica una reseña desde el formulario.
- **POST `/products/add`**: envía un nuevo producto desde el formulario.

DummyJSON devuelve respuestas simuladas para las operaciones POST; los datos sirven para demostrar el envío, pero no se guardan de forma permanente.

## Cómo ejecutarlo

Abre `index.html` en un navegador o utiliza la extensión **Live Server** de VS Code. No requiere instalación de dependencias.
