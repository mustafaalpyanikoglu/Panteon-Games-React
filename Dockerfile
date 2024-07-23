# Build aşaması
FROM node:18 AS build

# Çalışma dizinini oluştur ve ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kaynak kodunu kopyala
COPY . .

# React uygulamasını derle
RUN npm run build

# Production aşaması için bir Nginx imajını temel alın
FROM nginx:alpine

# Yapılan build dizinini Nginx'e kopyala
COPY --from=build /app/build /usr/share/nginx/html

# Nginx için default.conf dosyasını kopyala
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Nginx portunu expose et
EXPOSE 80

# Nginx'i başlat
CMD ["nginx", "-g", "daemon off;"]
