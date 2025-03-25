# Ollyo Task Manager App (Laravel + MySQL + ReactJS with Docker Compose)

This guide provides instructions to set up and run a Laravel backend, MySQL database, and ReactJS frontend using Docker Compose.

## 🚀 Prerequisites

Ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🏗 Project Structure

```
project-root/
│── backend/        # Laravel application
│── frontend/       # ReactJS application
│── docker-compose.yml
│── README.md
```

## 🛠 Setup & Configuration

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-repo-name.git
cd project-root
```

### 2️⃣ Create a `.env` File for Laravel

Copy the `.env.example` file inside the **backend** directory and update the database credentials:

```ini
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=rootpassword
```

### 3️⃣ Create `docker-compose.yml`

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    container_name: laravel_app
    restart: unless-stopped
    working_dir: /var/www
    volumes:
      - ./backend:/var/www
    environment:
      - APP_ENV=local
      - DB_HOST=db
    depends_on:
      - db
    ports:
      - "8000:8000"
    command: ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

  db:
    image: mysql:8.0
    container_name: mysql_db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: laravel
    ports:
      - "3306:3306"
    volumes:
      - db-data:/var/lib/mysql

  frontend:
    build: ./frontend
    container_name: react_app
    restart: unless-stopped
    working_dir: /app
    volumes:
      - ./frontend:/app
      - /app/node_modules
    ports:
      - "3000:3000"
    depends_on:
      - backend
    command: ["npm", "start"]

volumes:
  db-data:
```

## 🚀 Running the Application

1. **Start all services:**

   ```bash
   docker-compose up --build -d
   ```

2. **Check running containers:**

   ```bash
   docker ps
   ```

3. **Access the application:**

   - Laravel API: [http://localhost:8000](http://localhost:8000)
   - ReactJS App: [http://localhost:3000](http://localhost:3000)
   - MySQL Database: Connect via `localhost:3306` with user `root` and password `rootpassword`

## 🛠 Useful Commands

- **Stop all containers:**
  ```bash
  docker-compose down
  ```
- **Rebuild and restart services:**
  ```bash
  docker-compose up --build -d
  ```
- **Check logs:**
  ```bash
  docker-compose logs -f
  ```

## 🎯 Notes

- Ensure your **ReactJS app** uses the correct API endpoint (e.g., `http://localhost:8000/api`).
- Run Laravel migrations:
  ```bash
  docker exec -it laravel_app php artisan migrate
  ```

## 🎉 Done!

Now this Laravel, MySQL, and ReactJS app should be up and running with Docker! 🚀

