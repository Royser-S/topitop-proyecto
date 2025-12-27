USE topitop_db;

-- =======================================================
-- 0. LIMPIEZA TOTAL (Resetear Base de Datos)
-- =======================================================
SET FOREIGN_KEY_CHECKS = 0; 

TRUNCATE TABLE items_carrito;
TRUNCATE TABLE carrito;
TRUNCATE TABLE detalles_orden;
TRUNCATE TABLE ordenes;
TRUNCATE TABLE producto_imagenes;
TRUNCATE TABLE inventario;
TRUNCATE TABLE productos;
TRUNCATE TABLE marcas;
TRUNCATE TABLE categorias;
TRUNCATE TABLE colores;
TRUNCATE TABLE tallas;
TRUNCATE TABLE terminos_busqueda;

SET FOREIGN_KEY_CHECKS = 1;

-- =======================================================
-- 1. TABLAS INDEPENDIENTES (CATÁLOGO)
-- =======================================================

-- 1.1 CATEGORIAS
INSERT INTO categorias (id, nombre, descripcion, imagen_url, categoria_padre_id) VALUES 
(1, 'Hombres', 'Moda masculina para todas las ocasiones', 'https://topitop.vteximg.com.br/arquivos/ids/244836/Menu-Hombres.jpg', NULL),
(2, 'Mujeres', 'Tendencias y estilo femenino', 'https://topitop.vteximg.com.br/arquivos/ids/244837/Menu-Mujeres.jpg', NULL),
(3, 'Niños', 'Ropa cómoda y divertida para los pequeños', 'https://topitop.vteximg.com.br/arquivos/ids/244838/Menu-Ninos.jpg', NULL),
(4, 'Deportivo', 'Rendimiento y comodidad para entrenar', 'https://topitop.vteximg.com.br/arquivos/ids/244839/Menu-Deportivo.jpg', NULL),
(5, 'Calzado', 'Zapatillas, zapatos y sandalias', 'https://topitop.vteximg.com.br/arquivos/ids/244841/Menu-Calzado.jpg', NULL),
(6, 'Accesorios', 'Complementa tu estilo', 'https://topitop.vteximg.com.br/arquivos/ids/244842/Menu-Accesorios.jpg', NULL);

-- 1.2 MARCAS
INSERT INTO marcas (id, nombre, slug, estado, imagen_logo) VALUES 
(1, 'Topitop', 'topitop', 1, 'https://placehold.co/200x100/ffffff/000000/png?text=TOPITOP'),
(2, 'Adidas', 'adidas', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/200px-Adidas_Logo.svg.png'),
(3, 'Nike', 'nike', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/200px-Logo_NIKE.svg.png'),
(4, 'Puma', 'puma', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Puma_logo.svg/200px-Puma_logo.svg.png'),
(5, 'Reebok', 'reebok', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Reebok_logo.svg/200px-Reebok_logo.svg.png'),
(6, 'Converse', 'converse', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Converse_logo.svg/200px-Converse_logo.svg.png'),
(7, 'Vans', 'vans', 1, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Vans-logo.svg/200px-Vans-logo.svg.png'),
(8, 'New Balance', 'new-balance', 1, 'https://placehold.co/200x100/000000/ffffff/png?text=New+Balance'),
(9, 'Under Armour', 'under-armour', 1, 'https://placehold.co/200x100/000000/ffffff/png?text=Under+Armour'),
(10, 'Dunkelvolk', 'dunkelvolk', 1, 'https://placehold.co/200x100/000000/ffffff/png?text=Dunkelvolk');

-- 1.3 COLORES
INSERT INTO colores (id, nombre, codigo_hex) VALUES 
(1, 'Negro', '#000000'), 
(2, 'Blanco', '#FFFFFF'), 
(3, 'Rojo', '#FF0000'),
(4, 'Azul', '#0000FF'), 
(5, 'Verde', '#008000'), 
(6, 'Gris', '#808080'),
(7, 'Amarillo', '#FFFF00'), 
(8, 'Rosa', '#FFC0CB'), 
(9, 'Beige', '#F5F5DC'),
(10, 'Celeste', '#87CEEB'),
(11, 'Morado', '#800080'),
(12, 'Naranja', '#FF8C00');

-- 1.4 TALLAS
INSERT INTO tallas (id, valor) VALUES 
(1, 'XS'), (2, 'S'), (3, 'M'), (4, 'L'), (5, 'XL'), (6, 'XXL'),
(7, '28'), (8, '30'), (9, '32'), (10, '34'), (11, '36'), (12, '38'), (13, '40'), (14, '42');

-- =======================================================
-- 2. PRODUCTOS (50 ITEMS COMPLETOS Y COHERENTES)
-- =======================================================
INSERT INTO productos (id, nombre, descripcion, especificaciones, precio, precio_descuento, destacado, estado, fecha_creacion, marca_id, categoria_id) VALUES 

-- ============= HOMBRES (1-10) =============
(1, 'Camiseta Básica Premium Negro', 'Camiseta de algodón 100% peruano, corte regular fit. Perfecta para el día a día, suave al tacto y duradera.', 'Algodón Pima 100%, Cuello redondo reforzado, Costura doble en hombros', 29.90, 24.90, 1, 1, NOW(), 1, 1),

(2, 'Polo Urbano Estampado Gráfico', 'Polo con diseño gráfico exclusivo, corte moderno y cómodo. Ideal para salir con amigos.', 'Algodón 95% + Elastano 5%, Estampado digital de alta calidad, Lavable a máquina', 39.90, 34.90, 1, 1, NOW(), 10, 1),

(3, 'Camisa Oxford Manga Larga Azul', 'Camisa elegante corte slim fit, perfecta para la oficina o eventos formales. Tela Oxford premium.', 'Algodón Oxford 100%, Corte Slim Fit, Botones de nácar', 79.90, 59.90, 1, 1, NOW(), 1, 1),

(4, 'Jean Slim Fit Dark Wash', 'Pantalón jean oscuro con elasticidad, corte moderno que estiliza la figura. 5 bolsillos clásicos.', 'Denim Stretch (98% Algodón, 2% Elastano), Lavado oscuro, Cierre metálico YKK', 89.90, 79.90, 1, 1, NOW(), 1, 1),

(5, 'Casaca Cortaviento Impermeable', 'Casaca ligera resistente al agua, ideal para días lluviosos. Capucha ajustable y bolsillos con cierre.', 'Nylon impermeable, Forro interno de malla, Capucha plegable', 129.00, 99.00, 1, 1, NOW(), 3, 1),

(6, 'Short Cargo Utilitario Beige', 'Short con múltiples bolsillos, perfecto para el verano. Tela resistente y cómoda.', 'Drill 100% algodón, 6 bolsillos funcionales, Cintura ajustable', 49.90, 39.90, 0, 1, NOW(), 1, 1),

(7, 'Hoodie Esencial Gris Melange', 'Polera con capucha y bolsillo canguro, interior frizado cálido. Perfecta para el invierno limeño.', 'Algodón 80% + Poliéster 20%, Interior frizado suave, Cordones ajustables', 89.90, 74.90, 1, 1, NOW(), 10, 1),

(8, 'Pantalón Chino Camel Elegante', 'Pantalón casual-formal versátil, corte recto moderno. Ideal para oficina o salidas.', 'Drill mercerizado, Corte Regular Fit, 4 bolsillos', 99.90, 79.90, 0, 1, NOW(), 1, 1),

(9, 'Chaleco Acolchado Sin Mangas', 'Chaleco térmico ligero, perfecto como capa intermedia. Comprimible y fácil de guardar.', 'Relleno de plumas sintéticas, Exterior resistente al viento, 2 bolsillos laterales', 119.90, 99.90, 0, 1, NOW(), 1, 1),

(10, 'Camisa Leñadora Cuadros Roja', 'Camisa de franela a cuadros, estilo casual urbano. Suave y abrigadora.', 'Franela de algodón, Bolsillo frontal, Botones a presión', 79.90, 64.90, 0, 1, NOW(), 10, 1),

-- ============= MUJERES (11-20) =============
(11, 'Blusa Elegante Blanca Oficina', 'Blusa formal con caída perfecta, cuello clásico. Ideal para ambiente corporativo.', 'Poliéster premium, Manga larga, Botones frontales discretos', 59.90, 49.90, 1, 1, NOW(), 1, 2),

(12, 'Vestido Floral Verano Midi', 'Vestido ligero con estampado floral romántico, corte en A favorecedor. Con forro interior.', 'Viscosa fluida, Largo midi, Cierre invisible lateral', 79.90, 59.90, 1, 1, NOW(), 1, 2),

(13, 'Jean Mom Fit Tiro Alto', 'Jean de corte relajado con cintura alta, estilo retro moderno. Muy cómodo y versátil.', 'Denim 100% algodón, Tiro alto (11"), 5 bolsillos', 99.90, 84.90, 1, 1, NOW(), 1, 2),

(14, 'Cardigan Tejido Oversize Beige', 'Suéter abierto de tejido suave, corte holgado y cómodo. Perfecto para combinar.', 'Acrílico 60% + Lana 40%, Sin botones, Bolsillos laterales', 69.90, 54.90, 0, 1, NOW(), 1, 2),

(15, 'Falda Plisada Midi Negra', 'Falda elegante con pliegues, tela satinada con caída perfecta. Versátil y sofisticada.', 'Poliéster satinado, Pretina elástica oculta, Forro interior', 59.90, 49.90, 0, 1, NOW(), 1, 2),

(16, 'Top Crop Básico Rib Blanco', 'Top corto de algodón con textura acanalada, manga corta. Ideal para combinar.', 'Algodón Rib 95% + Elastano 5%, Cuello redondo, Largo corto', 19.90, 14.90, 1, 1, NOW(), 1, 2),

(17, 'Pantalón Palazzo Ancho Negro', 'Pantalón de pierna ancha elegante, cintura alta con pretina. Muy cómodo y estiliza.', 'Crepé fluido, Cierre lateral invisible, Largo completo', 89.90, 74.90, 0, 1, NOW(), 1, 2),

(18, 'Casaca Denim Clásica Azul', 'Casaca de jean tradicional con detalles en cobre, corte recto. Un básico atemporal.', 'Denim 100% algodón, 4 bolsillos funcionales, Botones metálicos', 109.90, 89.90, 1, 1, NOW(), 1, 2),

(19, 'Short Lino Cintura Alta Beige', 'Short fresco de lino con lazo en cintura, perfecto para verano. Bolsillos laterales.', 'Lino 55% + Algodón 45%, Lazo ajustable, 2 bolsillos', 45.90, 35.90, 0, 1, NOW(), 1, 2),

(20, 'Enterizo Elegante Pierna Ancha', 'Jumpsuit sofisticado de una pieza, corte favorecedor. Ideal para eventos.', 'Poliéster premium, Cierre trasero invisible, Cinturón incluido', 119.00, 99.00, 1, 1, NOW(), 1, 2),

-- ============= DEPORTIVO (21-30) =============
(21, 'Leggings Running Compresión Pro', 'Mallas de alto rendimiento con compresión graduada, tecnología anti-sudor. Para corredores exigentes.', 'Spandex Dry-Fit 88% + Elastano 12%, Compresión media, Bolsillo trasero con cierre', 69.90, 59.90, 1, 1, NOW(), 3, 4),

(22, 'Top Deportivo Alto Impacto Fucsia', 'Sujetador deportivo con soporte reforzado, espalda cruzada. Ideal para running y gym.', 'Poliéster técnico 90% + Elastano 10%, Copas removibles, Transpirable', 49.90, 42.90, 1, 1, NOW(), 2, 4),

(23, 'Short Fútbol Profesional Negro', 'Short técnico ultra ligero con tecnología DryCell, perfecto para entrenamientos intensos.', 'Poliéster reciclado, Malla interna, Cintura elástica con cordón', 39.90, 32.90, 0, 1, NOW(), 4, 4),

(24, 'Camiseta Selección Perú Titular', 'Camiseta oficial del hincha peruano, diseño 2024. Con tecnología Climacool.', 'Poliéster reciclado 100%, Escudo bordado, Tecnología anti-sudor', 199.90, 169.90, 1, 1, NOW(), 2, 4),

(25, 'Buzo Completo Entrenamiento', 'Conjunto deportivo casaca + pantalón, diseño moderno con franjas laterales. Muy cómodo.', 'Poliéster 100%, Casaca con cierre completo, Bolsillos con cierre', 189.00, 159.00, 1, 1, NOW(), 2, 4),

(26, 'Polo Running Reflectivo Neón', 'Camiseta técnica con detalles reflectivos para correr de noche, ultra transpirable.', 'DryFit 100%, Costuras planas anti-roce, Elementos reflectivos 360°', 45.00, 38.00, 0, 1, NOW(), 3, 4),

(27, 'Pack Medias Deportivas x3 Pares', 'Set de medias tobilleras acolchadas, tecnología anti-ampollas. Ideales para running.', 'Algodón 75% + Poliéster 20% + Elastano 5%, Planta reforzada, Ventilación superior', 19.90, 15.90, 0, 1, NOW(), 3, 4),

(28, 'Gorra Running Visera Ventilada', 'Gorra deportiva con paneles de malla, absorbe sudor y protege del sol.', 'Malla sintética transpirable, Visera pre-curvada, Cierre ajustable', 35.00, 28.00, 0, 1, NOW(), 2, 4),

(29, 'Mochila Gym Compartimento Especial', 'Maletín deportivo con compartimento para zapatos y laptop, material resistente al agua.', 'Poliéster 600D, Capacidad 30L, Compartimento ventilado para calzado', 89.90, 74.90, 0, 1, NOW(), 4, 4),

(30, 'Casaca Cortaviento Running', 'Rompeviento ultra ligero plegable, protección contra lluvia ligera y viento.', 'Nylon Ripstop, Peso: 180g, Bolsillo interno para guardar', 119.00, 99.00, 1, 1, NOW(), 3, 4),

-- ============= CALZADO (31-40) =============
(31, 'Nike Air Zoom Pegasus Running', 'Zapatillas de running con amortiguación Air, ideales para largas distancias. Diseño versátil.', 'Suela EVA con cámara Air, Upper de malla transpirable, Drop: 10mm', 259.00, 219.00, 1, 1, NOW(), 3, 5),

(32, 'Adidas Stan Smith Urbanas Blancas', 'Zapatillas urbanas icónicas de cuero, estilo minimalista atemporal. Comodidad garantizada.', 'Cuero sintético premium, Suela de goma vulcanizada, Plantilla OrthoLite', 189.00, 159.00, 1, 1, NOW(), 2, 5),

(33, 'Converse Chuck Taylor High Black', 'Zapatillas de lona caña alta, diseño clásico desde 1917. Estilo urbano inconfundible.', 'Upper de lona 100% algodón, Suela de goma natural, Puntera de goma reforzada', 129.00, 109.00, 1, 1, NOW(), 6, 5),

(34, 'Vans Old Skool Skate Classic', 'Zapatillas de skate con suela waffle icónica, diseño retro. Durables y cómodas.', 'Upper de gamuza y lona, Suela waffle de goma, Refuerzo en puntera', 149.00, 129.00, 1, 1, NOW(), 7, 5),

(35, 'Adidas Adilette Slide Azul', 'Sandalias deportivas post-entrenamiento, suela contorneada ergonómica. Perfectas para la piscina.', 'Upper de goma sintética, Plantilla EVA suave, Suela antideslizante', 49.90, 39.90, 0, 1, NOW(), 2, 5),

(36, 'Botines Mujer Taco Bajo Negro', 'Botines elegantes de cuero sintético, taco de 4cm estable. Combinan con todo.', 'Cuero PU de alta calidad, Cierre lateral con cremallera, Plantilla acolchada', 129.90, 109.90, 1, 1, NOW(), 1, 5),

(37, 'Puma SoftFoam Running Gris', 'Zapatillas de running ligeras con tecnología SoftFoam+, máxima amortiguación y confort.', 'Upper de malla técnica, Suela SoftFoam+ extra acolchada, Peso: 240g', 159.00, 139.00, 1, 1, NOW(), 4, 5),

(38, 'Mocasines Casuales Hombre Café', 'Zapatos mocasines de cuero sintético, sin cordones. Perfectos para el día a día.', 'Cuero sintético premium, Plantilla Memory Foam, Suela de goma flexible', 89.90, 74.90, 0, 1, NOW(), 1, 5),

(39, 'New Balance 574 Lifestyle Retro', 'Zapatillas lifestyle con diseño retro años 80, cómodas para todo el día.', 'Upper de gamuza y malla, Suela ENCAP de doble densidad, Estilo retro-running', 210.00, 179.00, 1, 1, NOW(), 8, 5),

(40, 'Sandalias Cuero Hombre Verano', 'Sandalias de cuero con hebillas ajustables, plantilla de corcho anatómica.', 'Cuero genuino, Plantilla de corcho moldeada, Suela EVA antideslizante', 79.90, 64.90, 0, 1, NOW(), 1, 5),

-- ============= NIÑOS (41-50) =============
(41, 'Conjunto Spiderman Polo + Short', 'Set de polo y short con estampado del superhéroe favorito, 100% algodón suave.', 'Algodón jersey, Estampado en alta definición, Elástico en cintura', 45.90, 39.90, 1, 1, NOW(), 1, 3),

(42, 'Vestido Frozen Elsa con Capa', 'Vestido de fantasía con tul y detalles brillantes, incluye capa. Ideal para fiestas.', 'Poliéster satinado + Tul, Lentejuelas cosidas, Cierre trasero con velcro', 59.90, 49.90, 1, 1, NOW(), 1, 3),

(43, 'Pack Polos Básicos x2 Colores', 'Set de 2 polos lisos (blanco y negro), algodón suave. Perfectos para el colegio.', 'Algodón 100%, Cuello redondo reforzado, Colores sólidos', 29.90, 24.90, 0, 1, NOW(), 1, 3),

(44, 'Jogger Escolar Gris Cómodo', 'Pantalón deportivo con puños elásticos, resistente y fácil de lavar. Ideal para jugar.', 'Franela de algodón 80% + Poliéster 20%, Cordón ajustable, 2 bolsillos laterales', 39.90, 32.90, 0, 1, NOW(), 1, 3),

(45, 'Casaca Acolchada Niña Rosada', 'Abrigo invernal con relleno sintético, capucha removible. Protección y estilo.', 'Exterior: Nylon, Relleno: Poliéster, Bolsillos con forro polar', 79.90, 69.90, 1, 1, NOW(), 1, 3),

(46, 'Short Denim Niña Bordados', 'Short de jean con detalles bordados y bolsillos decorativos, muy femenino.', 'Denim 100% algodón, Bordados florales, Cierre y botón metálico', 35.00, 28.90, 0, 1, NOW(), 1, 3),

(47, 'Pijama Enterizo Polar Lunas', 'Pijama de una pieza en polar suave, con pie cerrado. Ideal para noches frías.', 'Polar 100% poliéster, Cierre frontal completo, Estampado de lunas y estrellas', 49.90, 42.90, 0, 1, NOW(), 1, 3),

(48, 'Camisa Niño Cuadros Elegante', 'Camisa de manga larga a cuadros, perfecta para eventos formales infantiles.', 'Algodón 100%, Cuello rígido, Bolsillo en pecho', 39.90, 32.90, 0, 1, NOW(), 1, 3),

(49, 'Zapatillas LED Luces Azul', 'Zapatillas con luces LED recargables en la suela, cierre de velcro fácil. Diversión asegurada.', 'Upper sintético, Suela con luces LED multicolor, Batería recargable USB', 69.90, 59.90, 1, 1, NOW(), 1, 3),

(50, 'Mochila Escolar Marvel Avengers', 'Mochila reforzada con diseño de superhéroes, incluye lonchera térmica. Gran capacidad.', 'Poliéster 600D resistente, Compartimento acolchado para laptop, Lonchera removible', 59.90, 49.90, 1, 1, NOW(), 1, 3);

-- =======================================================
-- 3. INVENTARIO (Stock completo para todos los productos)
-- =======================================================
INSERT INTO inventario (producto_id, talla_id, color_id, stock, sku) VALUES
-- HOMBRES (1-10)
(1, 2, 1, 150, 'TOP-CAM-BAS-NEG-S'), (1, 3, 1, 200, 'TOP-CAM-BAS-NEG-M'), (1, 4, 1, 180, 'TOP-CAM-BAS-NEG-L'), (1, 5, 1, 120, 'TOP-CAM-BAS-NEG-XL'),
(2, 2, 2, 80, 'DUN-POL-URB-BLA-S'), (2, 3, 2, 100, 'DUN-POL-URB-BLA-M'), (2, 4, 2, 90, 'DUN-POL-URB-BLA-L'), (2, 3, 1, 70, 'DUN-POL-URB-NEG-M'),
(3, 3, 4, 60, 'TOP-CAM-OXF-AZU-M'), (3, 4, 4, 80, 'TOP-CAM-OXF-AZU-L'), (3, 5, 4, 50, 'TOP-CAM-OXF-AZU-XL'),
(4, 8, 1, 90, 'TOP-JEA-SLI-NEG-30'), (4, 9, 1, 110, 'TOP-JEA-SLI-NEG-32'), (4, 10, 1, 100, 'TOP-JEA-SLI-NEG-34'), (4, 11, 1, 80, 'TOP-JEA-SLI-NEG-36'),
(5, 3, 1, 45, 'NIK-CAS-COR-NEG-M'), (5, 4, 1, 60, 'NIK-CAS-COR-NEG-L'), (5, 5, 1, 40, 'NIK-CAS-COR-NEG-XL'),
(6, 9, 9, 70, 'TOP-SHO-CAR-BEI-32'), (6, 10, 9, 80, 'TOP-SHO-CAR-BEI-34'), (6, 11, 9, 60, 'TOP-SHO-CAR-BEI-36'),
(7, 3, 6, 90, 'DUN-HOO-ESE-GRI-M'), (7, 4, 6, 110, 'DUN-HOO-ESE-GRI-L'), (7, 5, 6, 80, 'DUN-HOO-ESE-GRI-XL'),
(8, 9, 9, 50, 'TOP-PAN-CHI-CAM-32'), (8, 10, 9, 65, 'TOP-PAN-CHI-CAM-34'), (8, 11, 9, 55, 'TOP-PAN-CHI-CAM-36'),
(9, 3, 4, 35, 'TOP-CHA-ACO-AZU-M'), (9, 4, 4, 40, 'TOP-CHA-ACO-AZU-L'),
(10, 3, 3, 60, 'DUN-CAM-LEN-ROJ-M'), (10, 4, 3, 70, 'DUN-CAM-LEN-ROJ-L'),

-- MUJERES (11-20)
(11, 2, 2, 80, 'TOP-BLU-ELE-BLA-S'), (11, 3, 2, 100, 'TOP-BLU-ELE-BLA-M'), (11, 4, 2, 70, 'TOP-BLU-ELE-BLA-L'),
(12, 2, 8, 50, 'TOP-VES-FLO-ROS-S'), (12, 3, 8, 65, 'TOP-VES-FLO-ROS-M'), (12, 4, 8, 45, 'TOP-VES-FLO-ROS-L'),
(13, 8, 4, 90, 'TOP-JEA-MOM-AZU-28'), (13, 9, 4, 110, 'TOP-JEA-MOM-AZU-30'), (13, 10, 4, 100, 'TOP-JEA-MOM-AZU-32'),
(14, 2, 9, 60, 'TOP-CAR-TEJ-BEI-S'), (14, 3, 9, 75, 'TOP-CAR-TEJ-BEI-M'), (14, 4, 9, 55, 'TOP-CAR-TEJ-BEI-L'),
(15, 2, 1, 70, 'TOP-FAL-PLI-NEG-S'), (15, 3, 1, 85, 'TOP-FAL-PLI-NEG-M'), (15, 4, 1, 65, 'TOP-FAL-PLI-NEG-L'),
(16, 1, 2, 120, 'TOP-TOP-CRO-BLA-XS'), (16, 2, 2, 150, 'TOP-TOP-CRO-BLA-S'), (16, 3, 2, 100, 'TOP-TOP-CRO-BLA-M'),
(17, 2, 1, 55, 'TOP-PAL-ANC-NEG-S'), (17, 3, 1, 70, 'TOP-PAL-ANC-NEG-M'), (17, 4, 1, 60, 'TOP-PAL-ANC-NEG-L'),
(18, 2, 4, 65, 'TOP-CAS-DEN-AZU-S'), (18, 3, 4, 80, 'TOP-CAS-DEN-AZU-M'), (18, 4, 4, 60, 'TOP-CAS-DEN-AZU-L'),
(19, 2, 9, 50, 'TOP-SHO-LIN-BEI-S'), (19, 3, 9, 60, 'TOP-SHO-LIN-BEI-M'), (19, 4, 9, 45, 'TOP-SHO-LIN-BEI-L'),
(20, 2, 3, 40, 'TOP-ENT-ELE-ROJ-S'), (20, 3, 3, 50, 'TOP-ENT-ELE-ROJ-M'), (20, 4, 3, 35, 'TOP-ENT-ELE-ROJ-L'),

-- DEPORTIVO (21-30)
(21, 2, 1, 120, 'NIK-LEG-RUN-NEG-S'), (21, 3, 1, 150, 'NIK-LEG-RUN-NEG-M'), (21, 4, 1, 100, 'NIK-LEG-RUN-NEG-L'),
(22, 2, 8, 80, 'ADI-TOP-DEP-FUC-S'), (22, 3, 8, 95, 'ADI-TOP-DEP-FUC-M'), (22, 4, 8, 70, 'ADI-TOP-DEP-FUC-L'),
(23, 2, 1, 90, 'PUM-SHO-FUT-NEG-S'), (23, 3, 1, 110, 'PUM-SHO-FUT-NEG-M'), (23, 4, 1, 85, 'PUM-SHO-FUT-NEG-L'),
(24, 2, 2, 200, 'ADI-CAM-PER-BLA-S'), (24, 3, 2, 300, 'ADI-CAM-PER-BLA-M'), (24, 4, 2, 250, 'ADI-CAM-PER-BLA-L'), (24, 5, 2, 180, 'ADI-CAM-PER-BLA-XL'),
(25, 3, 1, 70, 'ADI-BUZ-COM-NEG-M'), (25, 4, 1, 85, 'ADI-BUZ-COM-NEG-L'), (25, 5, 1, 60, 'ADI-BUZ-COM-NEG-XL'),
(26, 2, 7, 60, 'NIK-POL-RUN-NEO-S'), (26, 3, 7, 75, 'NIK-POL-RUN-NEO-M'), (26, 4, 7, 55, 'NIK-POL-RUN-NEO-L'),
(27, 3, 2, 250, 'NIK-MED-DEP-BLA-M'), (27, 3, 1, 200, 'NIK-MED-DEP-NEG-M'),
(28, 3, 1, 90, 'ADI-GOR-TRA-NEG-U'), (28, 3, 4, 80, 'ADI-GOR-TRA-AZU-U'),
(29, 3, 6, 45, 'PUM-MOC-GYM-GRI-U'), (29, 3, 1, 40, 'PUM-MOC-GYM-NEG-U'),
(30, 3, 4, 50, 'NIK-CAS-COR-AZU-M'), (30, 4, 4, 60, 'NIK-CAS-COR-AZU-L'),

-- CALZADO (31-40)
(31, 13, 3, 25, 'NIK-AIR-ZOO-ROJ-40'), (31, 14, 3, 30, 'NIK-AIR-ZOO-ROJ-42'), (31, 12, 1, 20, 'NIK-AIR-ZOO-NEG-38'),
(32, 13, 2, 40, 'ADI-STA-SMI-BLA-40'), (32, 14, 2, 45, 'ADI-STA-SMI-BLA-42'), (32, 12, 2, 35, 'ADI-STA-SMI-BLA-38'),
(33, 13, 1, 55, 'CON-CHU-TAY-NEG-40'), (33, 14, 1, 60, 'CON-CHU-TAY-NEG-42'), (33, 12, 1, 50, 'CON-CHU-TAY-NEG-38'),
(34, 13, 1, 45, 'VAN-OLD-SKO-NEG-40'), (34, 14, 1, 50, 'VAN-OLD-SKO-NEG-42'), (34, 12, 1, 40, 'VAN-OLD-SKO-NEG-38'),
(35, 13, 4, 80, 'ADI-ADI-SLI-AZU-40'), (35, 14, 4, 90, 'ADI-ADI-SLI-AZU-42'), (35, 12, 4, 70, 'ADI-ADI-SLI-AZU-38'),
(36, 11, 1, 35, 'TOP-BOT-MUJ-NEG-36'), (36, 12, 1, 40, 'TOP-BOT-MUJ-NEG-38'), (36, 13, 1, 30, 'TOP-BOT-MUJ-NEG-40'),
(37, 13, 6, 50, 'PUM-SOF-FOA-GRI-40'), (37, 14, 6, 55, 'PUM-SOF-FOA-GRI-42'), (37, 12, 6, 45, 'PUM-SOF-FOA-GRI-38'),
(38, 13, 9, 40, 'TOP-MOC-CAS-CAF-40'), (38, 14, 9, 45, 'TOP-MOC-CAS-CAF-42'), (38, 12, 9, 35, 'TOP-MOC-CAS-CAF-38'),
(39, 13, 2, 30, 'NEW-574-LIF-BLA-40'), (39, 14, 2, 35, 'NEW-574-LIF-BLA-42'), (39, 12, 2, 25, 'NEW-574-LIF-BLA-38'),
(40, 13, 9, 45, 'TOP-SAN-CUE-CAF-40'), (40, 14, 9, 50, 'TOP-SAN-CUE-CAF-42'), (40, 12, 9, 40, 'TOP-SAN-CUE-CAF-38'),

-- NIÑOS (41-50)
(41, 2, 3, 80, 'TOP-CON-SPI-ROJ-S'), (41, 3, 3, 90, 'TOP-CON-SPI-ROJ-M'),
(42, 2, 10, 70, 'TOP-VES-FRO-CEL-S'), (42, 3, 10, 80, 'TOP-VES-FRO-CEL-M'),
(43, 2, 2, 100, 'TOP-POL-BAS-BLA-S'), (43, 2, 1, 100, 'TOP-POL-BAS-NEG-S'),
(44, 2, 6, 120, 'TOP-JOG-ESC-GRI-S'), (44, 3, 6, 140, 'TOP-JOG-ESC-GRI-M'),
(45, 2, 8, 50, 'TOP-CAS-ACO-ROS-S'), (45, 3, 8, 60, 'TOP-CAS-ACO-ROS-M'),
(46, 2, 4, 65, 'TOP-SHO-DEN-AZU-S'), (46, 3, 4, 75, 'TOP-SHO-DEN-AZU-M'),
(47, 2, 4, 55, 'TOP-PIJ-ENT-AZU-S'), (47, 3, 4, 65, 'TOP-PIJ-ENT-AZU-M'),
(48, 2, 3, 50, 'TOP-CAM-NIN-ROJ-S'), (48, 3, 3, 60, 'TOP-CAM-NIN-ROJ-M'),
(49, 8, 4, 45, 'TOP-ZAP-LUC-AZU-28'), (49, 9, 4, 55, 'TOP-ZAP-LUC-AZU-30'), (49, 10, 4, 50, 'TOP-ZAP-LUC-AZU-32'),
(50, 3, 3, 80, 'TOP-MOC-MAR-ROJ-U');

-- =======================================================
-- 4. IMÁGENES DE PRODUCTOS (3 imágenes por producto = 150 registros)
-- =======================================================
INSERT INTO producto_imagenes (producto_id, orden, url_imagen) VALUES 

-- ================= HOMBRES (Del 1 al 10) =================
-- Prod 1: Camiseta Básica
(1, 1, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80'),
(1, 2, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80'),
(1, 3, 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&w=600&q=80'),

-- Prod 2: Polo Urbano
(2, 1, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80'),
(2, 2, 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80'),
(2, 3, 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80'),

-- Prod 3: Camisa Oxford
(3, 1, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'),
(3, 2, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80'),
(3, 3, 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80'),

-- Prod 4: Jean Slim
(4, 1, 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=600&q=80'),
(4, 2, 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=600&q=80'),
(4, 3, 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&w=600&q=80'),

-- Prod 5: Casaca
(5, 1, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80'),
(5, 2, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80'),
(5, 3, 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=600&q=80'),

-- Prod 6: Short Cargo
(6, 1, 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80'),
(6, 2, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80'),
(6, 3, 'https://images.unsplash.com/photo-1598032895397-b9da371a9d0e?auto=format&fit=crop&w=600&q=80'),

-- Prod 7: Hoodie
(7, 1, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80'),
(7, 2, 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&w=600&q=80'),
(7, 3, 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80'),

-- Prod 8: Chino
(8, 1, 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80'),
(8, 2, 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80'),
(8, 3, 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80'),

-- Prod 9: Chaleco
(9, 1, 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=600&q=80'),
(9, 2, 'https://images.unsplash.com/photo-1620799140430-94f1e6cf3338?auto=format&fit=crop&w=600&q=80'),
(9, 3, 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=600&q=80'),

-- Prod 10: Camisa Leñadora
(10, 1, 'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&w=600&q=80'),
(10, 2, 'https://images.unsplash.com/photo-1620799140195-e0296e1b9a04?auto=format&fit=crop&w=600&q=80'),
(10, 3, 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80'),

-- ================= MUJERES (Del 11 al 20) =================
-- Prod 11: Blusa
(11, 1, 'https://images.unsplash.com/photo-1598532163257-526065538e14?auto=format&fit=crop&w=600&q=80'),
(11, 2, 'https://images.unsplash.com/photo-1624206112431-99f1b91e78f0?auto=format&fit=crop&w=600&q=80'),
(11, 3, 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80'),

-- Prod 12: Vestido
(12, 1, 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80'),
(12, 2, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80'),
(12, 3, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80'),

-- Prod 13: Jean Mom
(13, 1, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80'),
(13, 2, 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=600&q=80'),
(13, 3, 'https://images.unsplash.com/photo-1582552938357-32b906d47a21?auto=format&fit=crop&w=600&q=80'),

-- Prod 14: Cardigan
(14, 1, 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80'),
(14, 2, 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80'),
(14, 3, 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&w=600&q=80'),

-- Prod 15: Falda
(15, 1, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80'),
(15, 2, 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80'),
(15, 3, 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=600&q=80'),

-- Prod 16: Top Crop
(16, 1, 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80'),
(16, 2, 'https://images.unsplash.com/photo-1624206112431-99f1b91e78f0?auto=format&fit=crop&w=600&q=80'),
(16, 3, 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=600&q=80'),

-- Prod 17: Palazzo
(17, 1, 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&w=600&q=80'),
(17, 2, 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80'),
(17, 3, 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=600&q=80'),

-- Prod 18: Casaca Denim
(18, 1, 'https://images.unsplash.com/photo-1525457136159-8878648a7ad0?auto=format&fit=crop&w=600&q=80'),
(18, 2, 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80'),
(18, 3, 'https://images.unsplash.com/photo-1585487000143-9ea11b2f26c6?auto=format&fit=crop&w=600&q=80'),

-- Prod 19: Short Lino
(19, 1, 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80'),
(19, 2, 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?auto=format&fit=crop&w=600&q=80'),
(19, 3, 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=600&q=80'),

-- Prod 20: Enterizo
(20, 1, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80'),
(20, 2, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80'),
(20, 3, 'https://images.unsplash.com/photo-1585487000143-9ea11b2f26c6?auto=format&fit=crop&w=600&q=80'),

-- ================= DEPORTIVO (Del 21 al 30) =================
-- Prod 21: Leggings
(21, 1, 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?auto=format&fit=crop&w=600&q=80'),
(21, 2, 'https://images.unsplash.com/photo-1579364046732-c21c2f36d3f6?auto=format&fit=crop&w=600&q=80'),
(21, 3, 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?auto=format&fit=crop&w=600&q=80'),

-- Prod 22: Top Impacto
(22, 1, 'https://images.unsplash.com/photo-1588117305388-c2631a279f82?auto=format&fit=crop&w=600&q=80'),
(22, 2, 'https://images.unsplash.com/photo-1579364046732-c21c2f36d3f6?auto=format&fit=crop&w=600&q=80'),
(22, 3, 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'),

-- Prod 23: Short Futbol
(23, 1, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80'),
(23, 2, 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80'),
(23, 3, 'https://images.unsplash.com/photo-1598032895397-b9da371a9d0e?auto=format&fit=crop&w=600&q=80'),

-- Prod 24: Camiseta Peru
(24, 1, 'https://images.unsplash.com/photo-1522706442291-8f1d8c0a0a8f?auto=format&fit=crop&w=600&q=80'),
(24, 2, 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&w=600&q=80'),
(24, 3, 'https://images.unsplash.com/photo-1519756301029-33fef7098ba4?auto=format&fit=crop&w=600&q=80'),

-- Prod 25: Buzo
(25, 1, 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80'),
(25, 2, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80'),
(25, 3, 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80'),

-- Prod 26: Polo Neon
(26, 1, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80'),
(26, 2, 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&w=600&q=80'),
(26, 3, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80'),

-- Prod 27: Medias
(27, 1, 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=600&q=80'),
(27, 2, 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=600&q=80'),
(27, 3, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80'),

-- Prod 28: Gorra
(28, 1, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80'),
(28, 2, 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=600&q=80'),
(28, 3, 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=600&q=80'),

-- Prod 29: Mochila
(29, 1, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'),
(29, 2, 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80'),
(29, 3, 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=600&q=80'),

-- Prod 30: Casaca Sport
(30, 1, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80'),
(30, 2, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80'),
(30, 3, 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=600&q=80'),

-- ================= CALZADO (Del 31 al 40) =================
-- Prod 31: Air Zoom
(31, 1, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'),
(31, 2, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80'),
(31, 3, 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80'),

-- Prod 32: Stan Smith
(32, 1, 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80'),
(32, 2, 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80'),
(32, 3, 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80'),

-- Prod 33: Chuck Taylor
(33, 1, 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80'),
(33, 2, 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=600&q=80'),
(33, 3, 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80'),

-- Prod 34: Vans Old Skool
(34, 1, 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80'),
(34, 2, 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=600&q=80'),
(34, 3, 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80'),

-- Prod 35: Adilette
(35, 1, 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=600&q=80'),
(35, 2, 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=600&q=80'),
(35, 3, 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=600&q=80'),

-- Prod 36: Botines
(36, 1, 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80'),
(36, 2, 'https://images.unsplash.com/photo-1605733513597-f3f6e1f50b22?auto=format&fit=crop&w=600&q=80'),
(36, 3, 'https://images.unsplash.com/photo-1590099543337-f8b45722a8d0?auto=format&fit=crop&w=600&q=80'),

-- Prod 37: Puma SoftFoam
(37, 1, 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80'),
(37, 2, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'),
(37, 3, 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80'),

-- Prod 38: Mocasines
(38, 1, 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80'),
(38, 2, 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=600&q=80'),
(38, 3, 'https://images.unsplash.com/photo-1478186014654-93608f1c0150?auto=format&fit=crop&w=600&q=80'),

-- Prod 39: New Balance 574
(39, 1, 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80'),
(39, 2, 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80'),
(39, 3, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80'),

-- Prod 40: Sandalias Cuero
(40, 1, 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=600&q=80'),
(40, 2, 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=600&q=80'),
(40, 3, 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=600&q=80'),

-- ================= NIÑOS (Del 41 al 50) =================
-- Prod 41: Spiderman
(41, 1, 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80'),
(41, 2, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80'),
(41, 3, 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80'),

-- Prod 42: Frozen
(42, 1, 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80'),
(42, 2, 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80'),
(42, 3, 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80'),

-- Prod 43: Polo Basico
(43, 1, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80'),
(43, 2, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80'),
(43, 3, 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?auto=format&fit=crop&w=600&q=80'),

-- Prod 44: Jogger
(44, 1, 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=600&q=80'),
(44, 2, 'https://images.unsplash.com/photo-1598032895397-b9da371a9d0e?auto=format&fit=crop&w=600&q=80'),
(44, 3, 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80'),

-- Prod 45: Casaca Nina
(45, 1, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80'),
(45, 2, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80'),
(45, 3, 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=600&q=80'),

-- Prod 46: Short Denim
(46, 1, 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80'),
(46, 2, 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80'),
(46, 3, 'https://images.unsplash.com/photo-1582552938357-32b906d47a21?auto=format&fit=crop&w=600&q=80'),

-- Prod 47: Pijama
(47, 1, 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80'),
(47, 2, 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80'),
(47, 3, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'),

-- Prod 48: Camisa Nino
(48, 1, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80'),
(48, 2, 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80'),
(48, 3, 'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&w=600&q=80'),

-- Prod 49: Zapatillas Luces
(49, 1, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'),
(49, 2, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&q=80'),
(49, 3, 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80'),

-- Prod 50: Mochila Marvel
(50, 1, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'),
(50, 2, 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80'),
(50, 3, 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=600&q=80');

-- =======================================================
-- 5. TÉRMINOS DE BÚSQUEDA POPULARES
-- =======================================================
INSERT INTO terminos_busqueda (termino, cantidad_busquedas, ultima_busqueda) VALUES 
('Polo', 2500, NOW()),
('Jean', 2200, NOW()),
('Zapatillas', 3100, NOW()),
('Nike', 1800, NOW()),
('Adidas', 1750, NOW()),
('Casaca', 1200, NOW()),
('Vestido', 950, NOW()),
('Short', 890, NOW()),
('Camiseta Peru', 1500, NOW()),
('Running', 1100, NOW()),
('Deportivo', 980, NOW()),
('Oferta', 3500, NOW()),
('Descuento', 2800, NOW()),
('Mujer', 1600, NOW()),
('Hombre', 1550, NOW()),
('Niños', 920, NOW()),
('Blusa', 780, NOW()),
('Pantalon', 1350, NOW()),
('Hoodie', 850, NOW()),
('Converse', 720, NOW());

-- =======================================================
-- VERIFICACIÓN DE DATOS INSERTADOS
-- =======================================================
-- =======================================================
-- 6. VENTAS REALISTAS (10 órdenes completas)
-- =======================================================

-- =======================================================
-- 6. VENTAS (Adaptadas a tu estructura de tabla actual)
-- =======================================================

-- 1. Insertamos las Órdenes (Cabeceras)
-- Nota: Se ha omitido subtotal/impuesto porque tu tabla no tiene esas columnas.
-- Se ha extraído la ciudad a su columna correspondiente.

INSERT INTO ordenes (id, usuario_id, direccion_envio, ciudad, codigo_postal, total, estado, fecha) VALUES
(1, 2, 'Av. Arequipa 2450, Lince', 'Lima', '15046', 184.70, 'ENTREGADO', '2025-12-15 10:30:00'),
(2, 3, 'Jr. Junín 890, Cercado', 'Lima', '15001', 214.60, 'ENTREGADO', '2025-12-16 15:45:00'),
(3, 2, 'Av. Arequipa 2450, Lince', 'Lima', '15046', 288.70, 'ENVIADO', '2025-12-20 09:15:00'),
(4, 3, 'Jr. Junín 890, Cercado', 'Lima', '15001', 378.00, 'ENTREGADO', '2025-12-17 14:20:00'),
(5, 2, 'Av. Arequipa 2450, Lince', 'Lima', '15046', 122.70, 'PENDIENTE', '2025-12-22 16:30:00'),
(6, 3, 'Jr. Junín 890, Cercado', 'Lima', '15001', 169.70, 'ENTREGADO', '2025-12-18 11:00:00'),
(7, 2, 'Av. Arequipa 2450, Lince', 'Lima', '15046', 219.70, 'ENTREGADO', '2025-12-14 08:45:00'),
(8, 3, 'Jr. Junín 890, Cercado', 'Lima', '15001', 384.50, 'ENTREGADO', '2025-12-19 13:20:00'),
(9, 2, 'Av. Arequipa 2450, Lince', 'Lima', '15046', 288.00, 'ENVIADO', '2025-12-21 10:30:00'),
(10, 3, 'Jr. Junín 890, Cercado', 'Lima', '15001', 152.70, 'PENDIENTE', '2025-12-23 09:00:00');

-- 2. Insertamos los Detalles (Productos de cada orden)
-- "Mejora": Agregamos el nombre_producto explícitamente para llenar ese campo en tu tabla.

INSERT INTO detalles_orden (orden_id, inventario_id, nombre_producto, cantidad, precio_unitario, subtotal) VALUES
-- Orden 1
(1, 1, 'Camiseta Básica Premium Negro', 2, 24.90, 49.80),
(1, 11, 'Blusa Elegante Blanca Oficina', 1, 59.90, 59.90),
(1, 22, 'Top Deportivo Alto Impacto Fucsia', 1, 59.90, 59.90),

-- Orden 2
(2, 28, 'Gorra Running Visera Ventilada', 1, 49.90, 49.90),
(2, 32, 'Adidas Stan Smith Urbanas', 1, 84.90, 84.90),
(2, 40, 'Sandalias Cuero Hombre', 1, 59.90, 59.90),

-- Orden 3
(3, 21, 'Leggings Running Compresión', 1, 59.90, 59.90),
(3, 24, 'Camiseta Selección Perú', 1, 169.90, 169.90),
(3, 26, 'Polo Running Reflectivo', 1, 38.00, 38.00),

-- Orden 4
(4, 31, 'Nike Air Zoom Pegasus', 1, 219.00, 219.00),
(4, 37, 'Puma SoftFoam Running', 1, 139.00, 139.00),

-- Orden 5
(5, 41, 'Conjunto Spiderman Polo + Short', 1, 39.90, 39.90),
(5, 44, 'Jogger Escolar Gris', 1, 32.90, 32.90),
(5, 43, 'Pack Polos Básicos x2', 2, 19.95, 39.90),

-- Orden 6
(6, 12, 'Vestido Floral Verano', 1, 59.90, 59.90),
(6, 14, 'Cardigan Tejido Oversize', 1, 54.90, 54.90),
(6, 19, 'Short Lino Cintura Alta', 1, 39.90, 39.90),

-- Orden 7
(7, 3, 'Camisa Oxford Manga Larga', 1, 59.90, 59.90),
(7, 8, 'Pantalón Chino Camel', 1, 79.90, 79.90),
(7, 9, 'Chaleco Acolchado', 1, 59.90, 59.90),

-- Orden 8
(8, 11, 'Blusa Elegante Blanca', 2, 49.90, 99.80),
(8, 15, 'Falda Plisada Midi', 1, 49.90, 49.90),
(8, 17, 'Pantalón Palazzo Ancho', 1, 74.90, 74.90),
(8, 18, 'Casaca Denim Clásica', 1, 89.90, 89.90),
(8, 20, 'Enterizo Elegante', 1, 49.90, 49.90),

-- Orden 9
(9, 32, 'Adidas Stan Smith Blancas', 1, 159.00, 159.00),
(9, 33, 'Converse Chuck Taylor', 1, 109.00, 109.00),

-- Orden 10
(10, 21, 'Leggings Running Pro', 1, 59.90, 59.90),
(10, 22, 'Top Deportivo Fucsia', 1, 42.90, 42.90),
(10, 26, 'Polo Running Neón', 1, 38.00, 38.00);