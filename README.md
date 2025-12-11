# 🛒 PROYECTO: Plataforma E-commerce "TopiTop"

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.5-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![React](https://img.shields.io/badge/React-18-cyan)
![Security](https://img.shields.io/badge/JWT-Secure-red)

> **Curso:** Desarrollo de Aplicaciones Web I

---

## 📖 1. Descripción General

Este proyecto es una solución **Full Stack** que replica la experiencia de compra de la tienda de moda **TopiTop**. El sistema permite la gestión integral de un catálogo de ropa con variantes complejas (tallas y colores), control de inventario en tiempo real, carrito de compras persistente y un flujo de checkout simulado.

La arquitectura desacopla el **Backend (API REST)** del **Frontend (SPA)**, garantizando escalabilidad y seguridad.

---

## 🛠️ 2. Tecnologías Utilizadas

### ☕ Nivel Backend (Servidor)
* **Lenguaje:** Java 17 (JDK)
* **Framework:** Spring Boot 3.3.5 (Web, Security, Data JPA)
* **Base de Datos:** MySQL 8 Relational Database
* **Seguridad:** Spring Security + JWT (JSON Web Tokens)
* **Documentación:** Swagger UI / OpenAPI 3
* **Utilidades:** Maven, Lombok, ModelMapper

### ⚛️ Nivel Frontend (Cliente)
* **Framework:** React 18
* **Empaquetador:** Vite (High Performance)
* **Estilos:** CSS Modules / Tailwind
* **Conexión HTTP:** Axios

---

## 🚀 3. Instalación y Ejecución (Backend)

### 📋 Requisitos Previos
* [x] JDK 17 instalado.
* [x] MySQL Server corriendo en puerto `3306`.
* [x] Maven instalado.

### ⚙️ Configuración (`application.properties`)
El sistema conecta a la base de datos `topitop_db`. Verifica tus credenciales en `backend/src/main/resources/application.properties`:

| Variable | Descripción | Valor Configurado |
| :--- | :--- | :--- |
| `spring.datasource.url` | Conexión JDBC | `jdbc:mysql://localhost:3306/topitop_db` |
| `spring.datasource.username` | Usuario BD | `root` |
| `spring.datasource.password` | Contraseña BD | `mysql` (⚠️ ¡Cámbialo!) |
| `jwt.secret` | Firma Token | *(Clave segura configurada)* |

### ▶️ Pasos para ejecutar:

1.  **Base de Datos:** Abre MySQL Workbench y ejecuta:
    ```sql
    CREATE DATABASE topitop_db;
    ```
2.  **Terminal:** Abre una consola en la carpeta `/backend` y ejecuta:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```
3.  **Verificación:** Si ves el logo de Spring, entra a:
    👉 [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## 💻 4. Instalación y Ejecución (Frontend)

### 📋 Requisitos
* [x] Node.js v18 o superior.

### ▶️ Pasos para ejecutar:

1.  **Terminal:** Abre una **nueva** consola en la carpeta `/frontend`.
2.  **Instalar librerías:**
    ```bash
    npm install
    ```
3.  **Iniciar:**
    ```bash
    npm run dev
    ```
4.  **Ver Tienda:** Entra a tu navegador en:
    👉 [http://localhost:5173](http://localhost:5173)

---

## 🔒 5. Seguridad y Accesos (Seed Data)

El sistema cuenta con seguridad **JWT (Stateless)**. Al iniciar la aplicación por primera vez, se crea automáticamente un **Super Administrador**.

## 📦 6. Alcance Funcional

### 🏢 Módulo Administrativo
* ✅ **Dashboard:** Vista general del negocio.
* ✅ **Gestión de Productos:** Crear, Editar y Eliminar (Lógico) ropa.
* ✅ **Inventario Avanzado:** Control de stock por SKU (Producto + Talla + Color).
* ✅ **Gestión de Órdenes:** Ver ventas y cambiar estados (Pendiente -> Entregado).

### 🛒 Módulo Cliente (Tienda)
* ✅ **Home:** Banners publicitarios y destacados.
* ✅ **Catálogo Inteligente:** Filtros por Marca, Categoría y Precio.
* ✅ **Buscador Predictivo:** Sugerencias de búsqueda en tiempo real.
* ✅ **Carrito de Compras:** Persistencia de items y cálculo de totales.
* ✅ **Checkout:** Generación de boleta/orden.

---

## 📡 7. Documentación de API (Endpoints)

La API está documentada con **Swagger UI**. Algunos endpoints clave:

* 🔐 **Auth:** `POST /api/auth/login`, `POST /api/auth/register`
* 👕 **Productos:** `GET /api/public/productos`, `POST /api/admin/productos`
* 📦 **Inventario:** `GET /api/public/inventario/{id}`, `POST /api/admin/inventario`
* 🛍️ **Ventas:** `POST /api/cliente/carrito/items`, `POST /api/cliente/ordenes/comprar`

---


## ⚠️ Seguridad y Variables de Entorno

Este proyecto NO incluye credenciales en el código fuente por seguridad.
Para ejecutarlo localmente, debes configurar las siguientes **Variables de Entorno** en tu IDE (Eclipse/IntelliJ) o en tu sistema operativo:

| Variable | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `DB_USER` | Usuario de MySQL | `TU_USUARIO` |
| `DB_PASSWORD` | Contraseña de MySQL | `123456` |
| `JWT_SECRET_KEY` | Llave para firmar Tokens | **No publicada.** Solicitar la clave de desarrollo al Coordinador (Royser) por interno. |

> **Nota:** Si no configuras estas variables, el proyecto no arrancará.

---
## 📂 8. Estructura del Proyecto

```text
/topitop-proyecto
│
├── /backend            # 🧠 Código Fuente Java Spring Boot
│   ├── src/main/java   # Lógica (Controller, Service, Repository, Entity)
│   ├── pom.xml         # Dependencias Maven
│   └── README.md       # Instrucciones Backend
│
├── /frontend           # 🎨 Código Fuente React (Próximamente)
│   ├── src/            # Componentes y Páginas
│   ├── package.json    # Dependencias Node
│   └── README.md       # Instrucciones Frontend
│
└── README.md           # Este archivo general
