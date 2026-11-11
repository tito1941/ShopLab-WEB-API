# ShopLab - AplicaciÃ³n web con API pÃºblica

ShopLab es una pÃ¡gina web interactiva desarrollada con HTML, CSS y JavaScript.
La aplicaciÃ³n permite consultar productos, buscar por nombre, filtrar por categorÃ­a
y enviar nuevos datos mediante formularios.

## API utilizada

Para este proyecto se ha utilizado **DummyJSON**, una API pÃºblica y gratuita que
proporciona datos de prueba en formato JSON.

PÃ¡gina oficial:

https://dummyjson.com/

DocumentaciÃ³n:

https://dummyjson.com/docs

No es necesario registrarse ni utilizar una clave API.

## Funcionamiento

La aplicaciÃ³n realiza las siguientes peticiones:

### Peticiones GET

- `GET /products?limit=30`
  Obtiene una lista de productos para mostrar el catÃ¡logo.

- `GET /products/categories`
  Obtiene las categorÃ­as disponibles y las muestra en un filtro.

- `GET /products/search?q=texto`
  Busca productos segÃºn el texto introducido por el usuario.

### Peticiones POST

- `POST /posts/add`
  EnvÃ­a una reseÃ±a escrita por el usuario.

- `POST /products/add`
  EnvÃ­a una propuesta de nuevo producto.

Las peticiones POST son simuladas por DummyJSON. La API devuelve una respuesta
correcta, pero los datos no se guardan de forma permanente.

## TecnologÃ­as utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- DummyJSON
- DiseÃ±o responsive

## CÃ³mo utilizar el proyecto

1. Descargar o clonar el repositorio.
2. Abrir el archivo `index.html` en un navegador.
3. TambiÃ©n se puede utilizar la extensiÃ³n Live Server de Visual Studio Code.

No es necesario instalar dependencias adicionales.
