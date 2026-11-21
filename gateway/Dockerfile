FROM nginxinc/nginx-unprivileged:1.27-alpine
USER root
# Create a self-signed certificate at build time, so no private key is stored in Git.
RUN apk add --no-cache openssl \
  && mkdir -p /etc/nginx/certs /etc/nginx/snippets \
  && openssl req -x509 -nodes -newkey rsa:2048 -days 365 \
    -keyout /etc/nginx/certs/selfsigned.key \
    -out /etc/nginx/certs/selfsigned.crt \
    -subj "/C=MA/O=L9aDar/CN=localhost" \
    -addext "subjectAltName=DNS:localhost,IP:127.0.0.1" \
  && chown -R nginx:nginx /etc/nginx/certs \
  && apk del openssl
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/snippets/security-headers.conf
USER nginx
EXPOSE 8080 8443
