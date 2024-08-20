# Creación de un backend con Node js
Para el desarrollo de este proyecto se opto por está tecnologia por su flexibilidad y crecimiento continuo que ofrece.

# Desarrollo de una API con Node js
Para instalar el proyecto se tiene que contar previamente con los siguientes pasos:


- Tener instalado una versión de node
- Tener instalado Docker en nuestra computadora

Una vez realizado los pasos anteriores es importante conocer los siguientes comandos para la aplicación:

- Utilizar nuestra consola de comandos
 Ubicar la ruta donde se descargo el proyecto de GIT por ejemplo:
 user/Documents/www/panel-admin-nodejs/proyect

- Ejecución y contrucción de la imagen de docker
 docker-compose up --build 


- Si necesitas bajar los servicios o construirlo manualmente:
 docker-compose down
docker-compose build
docker-compose up


# Conexión a base de datos
Necesitas crear la base de datos para que se pueda conectar correctamente

# Acceder a la API
 Finalmente entramos en la siguiente ruta:
 http://localhost:3000,


- Si por algun motivo se necesita eliminar la imagen de docker se debe utilizar el siguiente comando:
docker-compose down

# Eliminar caché
npm cache clean --force


# comprobar desde Docker la BD
mysql -u alevi -p