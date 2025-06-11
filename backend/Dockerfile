FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    default-mysql-client \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files first for better caching
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --no-scripts --no-autoloader --optimize-autoloader

# Copy application code
COPY . .

# Complete composer setup
RUN composer dump-autoload --optimize

# Create required directories and set permissions
RUN mkdir -p storage/logs storage/framework/cache/data storage/framework/sessions storage/framework/views \
    && chmod -R 775 storage \
    && chmod -R 775 bootstrap/cache

# Copy environment file
RUN cp env.example .env

# Create startup script
RUN echo '#!/bin/bash\n\
echo "Waiting for database..."\n\
while ! mysqladmin ping -h database --silent; do\n\
    sleep 1\n\
done\n\
echo "Database is ready!"\n\
echo "Starting Laravel server..."\n\
php artisan serve --host=0.0.0.0 --port=8000' > /usr/local/bin/start.sh \
    && chmod +x /usr/local/bin/start.sh

# Expose port
EXPOSE 8000

# Start application
CMD ["/usr/local/bin/start.sh"] 