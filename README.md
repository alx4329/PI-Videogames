<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Videogames


<p align="right">
  <img height="200" src="./videogame.png" />
</p>


## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.


Henry VideoGames es una SPA en la cual se puedan ver los distintos videojuegos disponibles junto con información relevante de los mismos utilizando la api externa [rawg](https://rawg.io/apidocs) y a partir de ella poder, entre otras cosas:

  - Buscar videjuegos
  - Filtrarlos / Ordenarlos
  - Agregar nuevos videojuegos


#### Tecnologías utilizadas:
    - [✔️] React
    - [✔️] Redux
    - [✔️] Express
    - [✔️] Sequelize - Postgres

#### Frontend
Compuesto por 
__Pagina inicial__: 
    - [✔️] Alguna imagen de fondo representativa al proyecto
    - [✔️] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__:
    - [✔️] Input de búsqueda para encontrar videojuegos por nombre
    - [✔️] Área donde se verá el listado de videojuegos. Deberá mostrar su:
          - Imagen
          - Nombre
          - Géneros
    - [✔️] Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
    - [✔️] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
    - [✔️] Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 9 en la primer pagina.


__Ruta de detalle de videojuego__: 
    - [✔️] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
    - [✔️] Descripción
    - [✔️] Fecha de lanzamiento
    - [✔️] Rating
    - [✔️] Plataformas

__Ruta de creación de videojuegos__: debe contener
    - [✔️] Un formulario __controlado__ con los siguientes campos
          - Nombre
          - Descripción
          - Fecha de lanzamiento
          - Rating
    - [✔️] Posibilidad de seleccionar/agregar varios géneros
    - [✔️] Posibilidad de seleccionar/agregar varias plataformas
    - [✔️] Botón/Opción para crear un nuevo videojuego

#### Base de datos
Compuesta por las siguientes entidades 

    - [✔️] Videojuego con las siguientes propiedades:
          - ID: * Distinto al ID de un videojuego ya existente en la API rawg
          - Nombre *
          - Descripción *
          - Fecha de lanzamiento
          - Rating
          - Plataformas *
    - [✔️] Genero con las siguientes propiedades:
          - ID
          - Nombre



#### Backend

Servidor desarrollado en Node/Express con los siguientes endpoints:

    - [✔️] __GET /videogames__:
          - Obtener un listado de los videojuegos
          - Debe devolver solo los datos necesarios para la ruta principal
    - [✔️] __GET /videogames?name="..."__:
          - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
          - Si no existe ningún videojuego mostrar un mensaje adecuado
    - [✔️] __GET /videogame/{idVideogame}__:
          - Obtener el detalle de un videojuego en particular
          - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
          - Incluir los géneros asociados
    - [✔️] __GET /genres__:
          - Obtener todos los tipos de géneros de videojuegos posibles
          - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
    - [✔️] __POST /videogame__:
          - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
          - Crea un videojuego en la base de datos


#### Testing
    - [✔️] Al menos tener un componente del frontend con sus tests respectivos
    - [✔️] Al menos tener una ruta del backend con sus tests respectivos
    - [✔️] Al menos tener un modelo de la base de datos con sus tests respectivos
