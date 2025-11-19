# Stage 1: Build
FROM node:22-alpine as builder

# Habilitar Corepack y PNPM
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV PNPM_HOME=/usr/local/bin

WORKDIR /app

# Configurar registry de Verdaccio (opcional)
RUN npm set registry https://npm.adric.me/ \
  && pnpm config set registry https://npm.adric.me/

# Copiar archivos de dependencias
COPY package*.json pnpm-lock.yaml ./

# Instalar dependencias
RUN pnpm i

# Copiar el resto del código
COPY . .

# Construir la SPA
RUN pnpm build

# Stage 2: Deploy
FROM nginx:alpine

# Eliminar configuración default de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar archivo de configuración Nginx
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/

# Copiar build de Vue
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
