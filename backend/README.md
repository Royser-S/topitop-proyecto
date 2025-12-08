# 🛒 TopiTop Clone - Backend API

Esta es la API REST para la réplica de la plataforma E-commerce de TopiTop. Gestiona usuarios, catálogo de productos, inventario con variantes, carrito de compras y procesamiento de órdenes usando una arquitectura segura y escalable.

## 🛠️ Stack Tecnológico
* **Java 17** (JDK)
* **Spring Boot 3.3.5** (Web, Security, Data JPA)
* **MySQL 8** (Base de Datos Relacional)
* **Spring Security + JWT** (Autenticación Stateless)
* **Maven** (Gestión de Dependencias)
* **Swagger / OpenAPI** (Documentación de API)

## 📋 Requisitos Previos
Antes de ejecutar el proyecto, asegúrate de tener instalado:
1.  **Java JDK 17** o superior.
2.  **MySQL Server** corriendo en el puerto 3306.
3.  **Maven** (Opcional, puedes usar el wrapper `mvnw` incluido).

## ⚙️ Configuración (Variables de Entorno)
La aplicación conecta a una base de datos MySQL llamada `topitop_db`. Debes configurar tus credenciales en `src/main/resources/application.properties`.

| Variable | Descripción | Valor por Defecto (Ejemplo) |
| :--- | :--- | :--- |
| `spring.datasource.url` | URL de Base de Datos | `jdbc:mysql://localhost:3306/topitop_db` |
| `spring.datasource.username` | Usuario BD | `root` |
| `spring.datasource.password` | Contraseña BD | `mysql` (¡Cámbiala por la tuya!) |
| `jwt.secret` | Llave de firma JWT | (Pre-configurada para desarrollo) |
| `jwt.expiration` | Validez del Token | `86400000` (24 Horas) |

> **Nota:** Debes crear una base de datos vacía llamada `topitop_db` en tu MySQL Workbench antes de iniciar.

## 🚀 Cómo ejecutar la aplicación

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/topitop-backend.git](https://github.com/TU_USUARIO/topitop-backend.git)
    cd topitop-backend
    ```

2.  **Instalar dependencias:**
    ```bash
    mvn clean install
    ```

3.  **Arrancar el servidor:**
    ```bash
    mvn spring-boot:run
    ```

4.  **Acceder a la Documentación:**
    Una vez inicie, abre tu navegador en:
    * **Swagger UI:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## 🧪 Pruebas
Puedes probar los endpoints usando el Swagger integrado o Postman.
* **Usuario Admin (Creado automático):** `admin@topitop.pe` / `admin123`
* **Endpoints Públicos:** `/api/auth/**`, `/api/public/**`
* **Endpoints Protegidos:** `/api/admin/**` (Requiere Token Bearer)

## 📂 Estructura del Proyecto
* `config`: Configuraciones de Seguridad y App.
* `controller`: Controladores REST (Endpoints).
* `dto`: Objetos de Transferencia de Datos.
* `entity`: Modelos de Base de Datos.
* `repository`: Capa de Acceso a Datos (JPA).
* `service`: Lógica de Negocio.
* `security`: Filtros y Lógica JWT.
* `exception`: Manejo Global de Errores.