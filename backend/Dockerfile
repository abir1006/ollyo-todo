# Use the official PHP image with FPM (FastCGI Process Manager)
FROM php:8.2-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libxml2-dev \
    zip \
    git \
    libzip-dev \
    libicu-dev \
    libmemcached-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip bcmath intl \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory in the container
WORKDIR /var/www

# Copy the Laravel application into the container
COPY . .

# Install Laravel dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-cache

# Configure environment variables for local environment
COPY .env.example .env

# Install the Laravel key (for encryption and security)
RUN php artisan key:generate

# Expose port 8080 for local development
EXPOSE 8000

# Command to run Laravel locally (PHP built-in server)
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=80"]
