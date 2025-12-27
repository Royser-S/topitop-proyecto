# 🛍️ TopiTop - E-commerce Ecosystem

> Sistema integral que consta de dos módulos principales:  
> **Panel Administrativo (Completado)** y **Tienda del Cliente (En desarrollo activo).**

Actualmente, este repositorio contiene el **Panel Administrativo** y los componentes base de la **tienda pública**, permitiendo gestionar el catálogo, inventario y órdenes, además de ofrecer una experiencia real de compra.

---

## 🚀 Módulos del Sistema

| Módulo | Estado | Descripción |
|------|--------|-------------|
| 🏢 Panel Administrativo | ✔ Completado | Gestión interna de negocio |
| 🛒 Tienda Cliente | ✔ Completado  | Catálogo, carrito y compras |
| 🔐 Seguridad JWT | ✔ Completado | Accesos protegidos |
| 📦 Órdenes / Boletas | ✔ Completado | Generación automática |

---

# 🎛️ PANEL ADMINISTRATIVO

![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

Dashboard diseñado para optimizar los procesos internos:

✔ control de inventario  
✔ reportes profesionales  
✔ ventas y métricas  
✔ exportación documental  

---

## 🛠️ Estado del Proyecto

- [x] **Fase 1:** Panel Admin (inventario, reportes, seguridad)
- [x] **Fase 2:** API pública para catálogo y órdenes
- [x] **Fase 3:** Carrito + checkout funcional

---

## 📊 Inteligencia de Negocio

- Dashboard con KPIs en tiempo real  
- Gráficos dinámicos (ventas semanales)  
- Alertas de stock bajo (menos de 10 unidades)

---

## 📦 Gestión de Inventario

- CRUD completo de productos, categorías, tallas, marcas
- Control de variantes (SKU)
- Activación / Desactivación de productos

---

## 📑 Reportes

- **Excel** corporativo (ExcelJS)
- **Boletas PDF** automáticas (jsPDF)
- IGV calculado y formato contable

---

## 🎨 UX del Panel

- Dark / Light mode
- Diseño responsivo
- Interacciones modernas (SweetAlert2)

---

# 🛒 TIENDA DEL CLIENTE (CATÁLOGO + CARRITO)

El módulo cliente ofrece una experiencia real de e-commerce.

### Funciones implementadas

✔ Catálogo dinámico  
✔ Filtrado por categoría, marca y talla  
✔ Buscador inteligente  
✔ Detalle de producto estilo Topitop  
✔ Carrito persistente (cartStore)  
✔ Checkout → genera ORDEN en backend  
✔ Mensaje de confirmación de compra  

### Detalles del producto

- galería tipo e-commerce
- miniaturas (thumbnails)
- precios y descuentos
- botón añadir al carrito

### Banner inteligente

Botones **Ver más** filtran el catálogo:

• Mujer → muestra productos mujer  
• Hombre → muestra productos hombre  

---

## 🔐 Seguridad y API

Backend con:

- Spring Security
- JWT stateless
- roles ADMIN / USER
- CORS configurado
- Validación por token

Ordenes expuestas:



---

## 📂 Estructura del Proyecto

El código sigue una arquitectura escalable y modular:

```bash
src/
├── assets/          # Imágenes y recursos estáticos
├── components/      # Componentes reutilizables
│   ├── dashboard/   # Tarjetas, Gráficos (SalesChart)
│   ├── layout/      # AdminLayout, Navbar, Footer, Sidebar
│   ├── ventas/      # Tablas y Modales de detalle
│   └── ...
├── pages/           # Vistas principales (Admin)
│   ├── Admin/       # Páginas de Admin
│   ├── Cliente/     # páginas de CLiente
├── services/        # Capa de comunicación con la API (Service Pattern)
├── utils/           # Utilidades de exportación (pdfGenerator, excelExport)
└── App.jsx          # Configuración de Rutas
```

---

## 🧠 Conceptos Aplicados

El proyecto adopta una arquitectura desacoplada donde el backend expone una API REST y el frontend actúa únicamente como consumidor. Todas las peticiones HTTP se centralizan dentro de la carpeta services/, evitando duplicación de código y permitiendo escalar funcionalidades sin modificar las vistas.

La autenticación está basada en JWT. Durante el login se genera un token firmado que luego acompaña cada solicitud protegida. Esto permite validar permisos, distinguir roles (ADMIN / USER) y mantener el sistema en modo stateless sin depender de sesiones en el servidor.

Para la administración del estado, se emplean Hooks de React. useState controla interacción, formularios, catálogos y carrito; useEffect sincroniza datos con la API; y useMemo optimiza operaciones pesadas como filtrado y paginación, mejorando el rendimiento general de la interfaz.

El carrito de compras funciona como un estado global ligero mediante una store propia. Además, se sincroniza con localStorage, garantizando persistencia incluso cuando el usuario recarga la página o cierra el navegador.

Otro pilar es la generación de documentos directamente en el cliente. Reportes en Excel y comprobantes PDF se crean desde el navegador, reduciendo carga del servidor y ofreciendo respuestas más rápidas al usuario.

Finalmente, el backend organiza sus endpoints respetando principios REST: nombres descriptivos, métodos HTTP correctos y separación entre rutas públicas y rutas protegidas. Esto facilita el mantenimiento, la seguridad y la futura integración con aplicaciones externas.

---

## 🔧 Instalación y Despliegue

Sigue estos pasos para correr el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Royser-S/topitop-proyecto.git](https://github.com/Royser-S/topitop-proyecto.git)
   cd frontend
   npm install
   npm run dev
   ```

---


## 👥 Equipo de Desarrollo

Este proyecto fue diseñado y construido por:

* **Royser** - 
* **Patrick** - 
* **Benner** - 

---

<div align="center">
  <small>Copyright © 2025 TopiTop Admin. Todos los derechos reservados.</small>
</div>



    
