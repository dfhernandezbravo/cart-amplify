# hadolint ignore=DL3007
FROM registry.gitlab.com/cencosud-ds/cencommerce/utils/docker-images/new-relic-builder:latest as newrelic
RUN /tmp/get-new-relic-js.sh

FROM ghcr.io/cencosud-cencommerce/dpt-images/utils/docker-images/node:18.18-alpine3.18
WORKDIR /app

COPY . ./

COPY --from=newrelic /tmp/newrelic.js .

ARG NEXT_PUBLIC_ENV
ARG NEXT_PUBLIC_BFF_WEB_URL
ARG NEXT_PUBLIC_API_KEY_BFF_WEB
ARG NEXT_PUBLIC_CHECKOUT_URL
ARG NEXT_PUBLIC_HOST
ARG NEXT_PUBLIC_HOST_HYBRID
ARG NEXT_PUBLIC_CHECKOUT_URL_V2
ARG NEXT_PUBLIC_TOKEN_COOKIE_NAME

ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_BFF_WEB_URL=$NEXT_PUBLIC_BFF_WEB_URL
ENV NEXT_PUBLIC_API_KEY_BFF_WEB=$NEXT_PUBLIC_API_KEY_BFF_WEB
ENV NEXT_PUBLIC_CHECKOUT_URL=$NEXT_PUBLIC_CHECKOUT_URL
ENV NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST
ENV NEXT_PUBLIC_HOST_HYBRID=$NEXT_PUBLIC_HOST_HYBRID
ENV NEXT_PUBLIC_CHECKOUT_URL_V2=$NEXT_PUBLIC_CHECKOUT_URL_V2
ENV NEXT_PUBLIC_TOKEN_COOKIE_NAME=$NEXT_PUBLIC_TOKEN_COOKIE_NAME

RUN echo "NEXT_PUBLIC_ENV -- $NEXT_PUBLIC_ENV"
RUN echo "NEXT_PUBLIC_BFF_WEB_URL -- $NEXT_PUBLIC_BFF_WEB_URL"
RUN echo "NEXT_PUBLIC_API_KEY_BFF_WEB -- $NEXT_PUBLIC_API_KEY_BFF_WEB"
RUN echo "NEXT_PUBLIC_CHECKOUT_URL -- $NEXT_PUBLIC_CHECKOUT_URL"
RUN echo "NEXT_PUBLIC_HOST -- $NEXT_PUBLIC_HOST"
RUN echo "NEXT_PUBLIC_HOST_HYBRID -- $NEXT_PUBLIC_HOST_HYBRID"
RUN echo "NEXT_PUBLIC_CHECKOUT_URL_V2 -- $NEXT_PUBLIC_CHECKOUT_URL_V2"
RUN echo "NEXT_PUBLIC_TOKEN_COOKIE_NAME -- $NEXT_PUBLIC_TOKEN_COOKIE_NAME"

RUN npm config set -- //gitlab.com/api/v4/packages/npm/:_authToken=glpat-8ASRwMRojB3hcxaFgx3J
RUN echo "npm config set -- //gitlab.com/api/v4/packages/npm/:_authToken=glpat-8ASRwMRojB3hcxaFgx3J"

RUN npm config set -- //node-registry.bit.cloud/:_authToken=f91ccd4c-0f9a-4ee7-ba17-40404dd9b05a
RUN echo "npm config set -- //node-registry.bit.cloud/:_authToken=f91ccd4c-0f9a-4ee7-ba17-40404dd9b05a"

RUN NODE_ENV='' yarn install && \
yarn build

# CMD ["sh", "-c", "pm2-runtime dist/src/main.js"]
EXPOSE 8081
CMD [ "yarn", "start", "-p", "8081"]