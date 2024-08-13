# Utilizamos la última versión de node
FROM node:latest

# Se establece el directorio de trabajo del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json si existe
COPY /proyect/package*.json ./

# Descarga e instala todas las dependencias
RUN npm install

# Instala Nodemon globalmente
RUN npm install -g nodemon

# Copia todos los archivos de la aplicación
COPY /proyect/ ./

# Copia el script wait-for-it.sh
#COPY /proyect/bin/wait-for-it.sh ./

# Da permisos de ejecución al script
#RUN chmod +x wait-for-it.sh

# Expone el puerto 3000 para la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación usando Nodemon
CMD ["npx", "nodemon", "index.js"]
