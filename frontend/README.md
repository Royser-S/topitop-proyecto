# 🛍️ TopiTop - E-commerce Ecosystem

> Sistema integral que consta de dos módulos principales: Panel Administrativo (Completado) y Tienda del Cliente (En desarrollo).

Actualmente, este repositorio contiene el **Panel Administrativo**, desarrollado para optimizar los procesos internos de la tienda. Permite gestionar productos, monitorear ingresos y controlar el inventario antes del lanzamiento del portal de ventas al cliente.

![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

Este proyecto es un **Dashboard Administrativo** desarrollado para optimizar los procesos internos de la tienda **TopiTop**. Permite a los administradores gestionar productos en tiempo real, monitorear ingresos mediante gráficos interactivos y generar documentación contable automáticamente.

---

## 🛠️ Estado del Proyecto y Próximos Pasos

El proyecto se encuentra en una fase de desarrollo modular. 

- [x] **Fase 1: Panel Administrativo:** Gestión de inventario, reportes PDF/Excel, dashboard de métricas y seguridad.
- [ ] **Fase 2: Tienda del Cliente (Próximamente):** Portal público para usuarios, carrito de compras, pasarela de pagos y catálogo interactivo.


---

## 🚀 Características Principales

### 📊 Inteligencia de Negocio
- **Dashboard en Tiempo Real:** Visualización de KPIs (Ingresos totales, Ventas del día, Stock crítico).
- **Gráficos Interactivos:** Análisis de ingresos semanales implementado con `Recharts`.
- **Notificaciones:** Sistema de alertas (campana) que avisa automáticamente cuando un producto tiene bajo stock (menos de 10 unidades).

### 📦 Gestión de Inventario
- **CRUD Completo:** Creación, edición y deshabilitación de productos, marcas, tallas y colores.
- **Control de Stock:** Gestión precisa de inventario por variantes (SKU).
- **Catálogo Visual:** Vista rápida de productos con sus estados (Activo/Inactivo).

### 📑 Reportes y Exportación
- **Excel Corporativo:** Exportación de tablas de Ventas e Inventario con formato contable usando `ExcelJS`.
- **Facturación PDF:** Generación automática de Boletas de Venta Electrónica con cálculo de IGV y diseño profesional usando `jsPDF`.

### 🎨 UI/UX Avanzada
- **Modo Oscuro/Claro:** Persistencia de tema con `localStorage`.
- **Diseño Responsivo:** Adaptable a móviles y escritorio gracias a Bootstrap 5.
- **Footer Dinámico:** Pie de página con mascota interactiva (Capibara) que cambia según el tema.

---

## 🛠️ Tecnologías y Librerías

El proyecto fue construido utilizando las siguientes herramientas:

| Tecnología | Propósito |
| :--- | :--- |
| **React + Vite** | Framework principal para una SPA rápida y optimizada. |
| **Bootstrap 5** | Maquetación responsiva y componentes UI. |
| **React Router DOM** | Manejo de rutas protegidas y navegación SPA. |
| **Recharts** | Visualización de datos y gráficos estadísticos. |
| **ExcelJS + FileSaver** | Generación de reportes .xlsx con estilos avanzados. |
| **jsPDF + AutoTable** | Motor de renderizado para Boletas de Venta en PDF. |
| **SweetAlert2** | Alertas modales modernas para confirmaciones (Logout, Delete). |
| **Axios** | (Implícito) Comunicación asíncrona con el Backend API. |

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
├── services/        # Capa de comunicación con la API (Service Pattern)
├── utils/           # Utilidades de exportación (pdfGenerator, excelExport)
└── App.jsx          # Configuración de Rutas
```

---

## 🧠 Conceptos Aplicados

### 1. Patrón de Servicios (Service Layer)
Para desacoplar la lógica de la vista, todas las llamadas a la API se centralizan en la carpeta `services/`. Esto permite un mantenimiento sencillo y reutilización de código.

### 2. Rutas Protegidas (Protected Routes)
Se implementó un `AdminLayout` que verifica la existencia de un token de autenticación (`localStorage`). Si no existe, redirige automáticamente al Login, protegiendo el panel de accesos no autorizados.

### 3. Hooks Personalizados y Efectos
Uso intensivo de `useEffect` para la sincronización de datos en tiempo real (polling de notificaciones cada 5 segundos) y `useState` para el manejo del estado global de la interfaz (tema oscuro, modales, datos).

### 4. Generación de Documentos en el Cliente
A diferencia de sistemas tradicionales que generan PDFs en el servidor, este proyecto utiliza la potencia del navegador para generar reportes (`PDF` y `Excel`) directamente en el cliente, reduciendo la carga del servidor.

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



    
