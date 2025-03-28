#!/bin/sh

# Run database migrations
php artisan migrate --force

# Run seeders (if needed)
php artisan db:seed --force --class=UserSeeder
php artisan db:seed --force --class=TaskSeeder

# Start Laravel application
exec "$@"
