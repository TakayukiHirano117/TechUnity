# 1st Stage: Builder
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# ビルド引数として Cloudinary のクラウドネームを受け取り、環境変数に設定
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

# 設定ファイルや依存ファイルをコピー
COPY package*.json tsconfig.json next.config.mjs postcss.config.mjs tailwind.config.ts ./
RUN npm install

# ビルドに必要なディレクトリをコピー
COPY prisma ./prisma
COPY ./src ./src
COPY ./public ./public

# Next.js アプリのビルド（この時点で NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME が取り込まれる）
RUN npm run build

# 2nd Stage: Runner
FROM node:20-alpine AS runner

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
