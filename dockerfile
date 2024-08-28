# Usa una imagen base de Node.js más reciente para construir la aplicación Angular
FROM node:18-alpine as build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración de npm
COPY package.json ./
COPY package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación Angular
RUN npm run build --prod

# Usa una imagen base de Nginx para servir la aplicación Angular
FROM nginx:1.21.1-alpine

# Copia los archivos construidos desde el contenedor de construcción al contenedor de Nginx
COPY --from=build /app/dist/bitebooking-frontend/browser /usr/share/nginx/html

# Expon el puerto 80 para el servidor web
EXPOSE 80 
