# --------------> The base image
FROM node:16.14.0 as base

RUN npm i -g npm@">=8.1.2 <9.0.0" && yarn global add yarn zx


# --------------> The builder image
FROM base as builder

# Set node environment
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ARG GITHUB_TOKEN

ENV GITHUB_TOKEN=${GITHUB_TOKEN}
ARG NEXT_PUBLIC_BUILD_PATH=replace
ENV NEXT_PUBLIC_BUILD_PATH=${NEXT_PUBLIC_BUILD_PATH}
ARG NEXT_PUBLIC_COMMERCE_API_URL=replace
ENV NEXT_PUBLIC_COMMERCE_API_URL=${NEXT_PUBLIC_COMMERCE_API_URL}
ARG NEXT_PUBLIC_PIXWAY_ID_API_URL=replace
ENV NEXT_PUBLIC_PIXWAY_ID_API_URL=${NEXT_PUBLIC_PIXWAY_ID_API_URL}
ARG NEXT_PUBLIC_PIXWAY_KEY_API_URL=replace
ENV NEXT_PUBLIC_PIXWAY_KEY_API_URL=${NEXT_PUBLIC_PIXWAY_KEY_API_URL}
# ARG NEXT_UTM_EXPIRATION=replace
# ENV NEXT_UTM_EXPIRATION=${NEXT_UTM_EXPIRATION}


# ARG NEXT_PUBLIC_COMPANY_ID=replace
# ENV NEXT_PUBLIC_COMPANY_ID=${NEXT_PUBLIC_COMPANY_ID}
ARG NEXT_PUBLIC_NEXTAUTH_SECRET=replace
ENV NEXT_PUBLIC_NEXTAUTH_SECRET=${NEXT_PUBLIC_NEXTAUTH_SECRET}
ARG NEXT_PUBLIC_BASE_URL=replace
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ARG NEXT_PUBLIC_ENVIRONMENT=replace
ENV NEXT_PUBLIC_ENVIRONMENT=${NEXT_PUBLIC_ENVIRONMENT}
ARG NEXTAUTH_URL=replace
ENV NEXTAUTH_URL=${NEXTAUTH_URL}
# ARG SENDINBLUE_API_KEY=replace
# ENV SENDINBLUE_API_KEY=${SENDINBLUE_API_KEY}
ARG NEXT_PUBLIC_PDF_API_URL=replace
ENV NEXT_PUBLIC_PDF_API_URL=${NEXT_PUBLIC_PDF_API_URL}
ARG NEXT_PUBLIC_POLL_API_URL=replace
ENV NEXT_PUBLIC_POLL_API_URL=${NEXT_PUBLIC_POLL_API_URL}
ARG NEXT_PUBLIC_PASS_API_URL=replace
ENV NEXT_PUBLIC_PASS_API_URL=${NEXT_PUBLIC_PASS_API_URL}
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
ARG NEXT_PUBLIC_GOOGLE_API_KEY=
ENV NEXT_PUBLIC_GOOGLE_API_KEY=${NEXT_PUBLIC_GOOGLE_API_KEY}

# Set working directory
WORKDIR /app

COPY package.json yarn.lock ./
COPY .npmrc ./
COPY scripts ./scripts
COPY Dockerfile Dockerfile

# Use cached npm repo
# RUN echo 'registry = https://sonatype.tropix.io/repository/npm/' >> ~/.npmrc

RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" >> ~/.npmrc

# Check required building variables
RUN ./scripts/check-build-env.mjs

# Set yarn network timeout
RUN yarn config set network-timeout 300000

# Install dependencies
RUN yarn install --frozen-lockfile

COPY . .


# Run typescript compiler
RUN yarn run build

# Install only production dependencies

# --------------> The production image
FROM base as production
# Set node environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN mkdir /app && chown node:node /app
# Set non root user
USER node

# Set working directory
WORKDIR /app

# Add package.json to WORKDIR
COPY package*.json ./

#COPY newrelic.js ./

# Application port
# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

# EXPOSE 9229
COPY --from=builder --chown=node:node ./app/public ./public
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/next-i18next.config.js ./next-i18next.config.js

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["yarn", "run", "start"]
