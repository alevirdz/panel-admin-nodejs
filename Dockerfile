# Utiliza la última versión de Node.js 20
FROM node:20-alpine

# Establece el directorio de trabajo del contenedor
WORKDIR /app

# Copia los archivos de dependencias al directorio de trabajo
COPY package*.json ./

# Instala todas las dependencias de la aplicación
RUN npm install



# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto que la aplicación va a usar
EXPOSE 3000

# Define el comando por defecto para ejecutar la aplicación en modo desarrollo usando el script `dev` definido en package.json
CMD ["npm", "run", "dev"]




