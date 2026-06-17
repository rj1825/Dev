FROM nginx:1.25-alpine
# Copy our static mock folder directly to Nginx
COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]