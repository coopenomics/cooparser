FROM node:alpine

# Создаем рабочую директорию и устанавливаем права доступа
RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

# Копируем файлы зависимостей
COPY package.json pnpm-lock.yaml ./

USER node

# Устанавливаем pnpm через npm для большей надежности, используя флаг --unsafe-perm
RUN npm install -g pnpm --unsafe-perm && \
    pnpm install

# Копируем остальные файлы проекта
COPY --chown=node:node . .

# Открываем порт
EXPOSE 4000

# Запускаем приложение
CMD ["npx", "ts-node", "src/index.ts"]