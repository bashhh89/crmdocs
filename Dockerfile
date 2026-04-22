FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
# Skip postinstall scripts — fumadocs-mdx postinstall needs content files + vite peer
RUN npm ci --ignore-scripts
COPY . .
# Run the MDX codegen now that content is in place, then build Next
RUN npx fumadocs-mdx && npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=80
ENV HOSTNAME=0.0.0.0
ENV OLLAMA_BASE_URL=https://ollama.com/v1
ENV OLLAMA_MODEL=gpt-oss:120b
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
# Docs screenshots and any other static assets live under /public and must
# ship with the runtime image or every <img src="/..."> URL 404s in prod.
COPY --from=build /app/public ./public
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ > /dev/null || exit 1
CMD ["node", "server.js"]
