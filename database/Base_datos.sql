-- 1. CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS topitop_db;
USE topitop_db;

-- ==========================================
-- MÓDULO 1: USUARIOS Y SEGURIDAD
-- ==========================================
-- Tabla de Usuarios (Admin y Clientes)
CREATE TABLE usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Aquí va el Hash (encriptado)
    rol ENUM('USER', 'ADMIN') DEFAULT 'USER',
    telefono VARCHAR(20),
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
); 

-- ==========================================
-- MÓDULO 2: CATÁLOGO Y PRODUCTOS
-- ==========================================
-- Marcas (Ej: Xiomi, Hawk, Topitop)
CREATE TABLE marcas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE, -- Para URL amigable
    imagen_logo VARCHAR(255)
);

-- Categorías con soporte de subniveles (Ej: Hombre -> Pantalones)
CREATE TABLE categorias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    categoria_padre_id BIGINT, 
    FOREIGN KEY (categoria_padre_id) REFERENCES categorias(id) ON DELETE SET NULL
);

-- Variantes: Tallas (S, M, L, 32, 34)
CREATE TABLE tallas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor VARCHAR(10) NOT NULL
);

-- Variantes: Colores (Rojo, Azul)
CREATE TABLE colores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    codigo_hex VARCHAR(7) -- Ej: #FF0000 (Para pintar la bolita en React)
);

-- Producto Base (La información general)
CREATE TABLE productos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT, 
    especificaciones TEXT, -- Material, cuidado de la prenda
    precio DECIMAL(10, 2) NOT NULL,
    precio_descuento DECIMAL(10, 2), -- Precio oferta (tachado)
    marca_id INT,
    categoria_id BIGINT,
    destacado BOOLEAN DEFAULT FALSE, -- Para mostrar en Home
    estado BOOLEAN DEFAULT TRUE, -- Activo/Inactivo
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (marca_id) REFERENCES marcas(id),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Imágenes del Producto (Galería: Frente, Espalda, Detalle)
CREATE TABLE producto_imagenes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    producto_id BIGINT NOT NULL,
    url_imagen VARCHAR(255) NOT NULL,
    orden INT DEFAULT 0, -- Cuál sale primero
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
);

-- ==========================================
-- MÓDULO 3: INVENTARIO (EL CORAZÓN DE LA TIENDA)
-- ==========================================

-- Une Producto + Talla + Color = Stock Real
CREATE TABLE inventario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    producto_id BIGINT NOT NULL,
    talla_id INT NOT NULL,
    color_id INT NOT NULL,
    stock INT DEFAULT 0, -- Cantidad disponible para vender
    sku VARCHAR(50) UNIQUE, -- Código único de almacén
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (talla_id) REFERENCES tallas(id),
    FOREIGN KEY (color_id) REFERENCES colores(id)
);

-- ==========================================
-- MÓDULO 4: MARKETING (Banners y Búsquedas)
-- ==========================================



-- Historial de Búsquedas (Para el "Buscador Predictivo")
CREATE TABLE terminos_busqueda (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    termino VARCHAR(100) NOT NULL,
    cantidad_busquedas INT DEFAULT 1,
    ultima_busqueda DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- MÓDULO 5: VENTAS Y CARRITO
-- ==========================================

-- Carrito de Compras (Por usuario)
CREATE TABLE carrito (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT NOT NULL,
    total DECIMAL(10, 2) DEFAULT 0.00,
    fecha_actualizacion DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Items dentro del Carrito (Detalle)
CREATE TABLE items_carrito (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    carrito_id BIGINT NOT NULL,
    inventario_id BIGINT NOT NULL, -- Apunta a la variante exacta (Talla/Color)
    cantidad INT DEFAULT 1,
    FOREIGN KEY (carrito_id) REFERENCES carrito(id) ON DELETE CASCADE,
    FOREIGN KEY (inventario_id) REFERENCES inventario(id)
);

-- Órdenes (Cabecera de Factura)
CREATE TABLE ordenes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BIGINT,
    direccion_envio TEXT NOT NULL,
    ciudad VARCHAR(100),
    codigo_postal VARCHAR(20),
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('PENDIENTE', 'PAGADO', 'ENVIADO', 'ENTREGADO', 'CANCELADO') DEFAULT 'PENDIENTE',
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Detalles de la Orden (Productos comprados)
CREATE TABLE detalles_orden (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    orden_id BIGINT NOT NULL,
    inventario_id BIGINT, -- Guardamos qué variante fue
    nombre_producto VARCHAR(150), -- Guardamos el nombre por si se borra el producto
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL, -- Precio al momento de comprar
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (orden_id) REFERENCES ordenes(id) ON DELETE CASCADE,
    FOREIGN KEY (inventario_id) REFERENCES inventario(id)
);