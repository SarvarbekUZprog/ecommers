# Node.js bazasidan foydalanish
FROM node:14

# Ishchi papkaga o'tish
WORKDIR /app

# Paketlarni nusxalash
COPY package*.json ./
RUN npm install

# Dasturiy fayllarni nusxalash
COPY . .

# Dastur ishga tushishi
CMD ["npm", "start"]
