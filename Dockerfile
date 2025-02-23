# 1st Stage: Builder
FROM node:20-alpine AS builder

# Build arguments
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET

# Set as environment variable for build stage
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET

WORKDIR /usr/src/app

# 設定ファイル（エイリアス設定含む）と依存ファイルをコピー
COPY package*.json tsconfig.json next.config.mjs postcss.config.mjs tailwind.config.ts  ./
RUN npm install

# ビルドに必要なディレクトリをコピー
COPY prisma ./prisma
COPY ./src ./src
COPY ./public ./public

# Prismaクライアント生成とNext.jsアプリのビルド
# RUN npx prisma generate
RUN npm run build

# 2nd Stage: Runner
FROM node:20-alpine AS runner

# Build arguments (必要に応じて実行時の環境変数として設定)
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG CLOUDINARY_API_KEY
ARG CLOUDINARY_API_SECRET

ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY
ENV CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET

WORKDIR /usr/src/app

# production 用の依存のみをコピー
COPY --from=builder /usr/src/app/node_modules ./node_modules
# ビルド済みの成果物をコピー
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/public ./public
# ランタイムで必要な設定ファイルをコピー
COPY tsconfig.json next.config.mjs package*.json ./

EXPOSE 3000

CMD ["npm", "start"]