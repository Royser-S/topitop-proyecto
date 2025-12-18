import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// --- UTILIDAD: Estilo de Cabecera Azul TopiTop ---
const aplicarEstiloCabecera = (worksheet) => {
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 12 };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0D6EFD' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = { bottom: { style: 'medium', color: { argb: '000000' } } };
    });
};

// ==========================================
// 1. REPORTE DE VENTAS (El que faltaba)
// ==========================================
export const exportarVentasExcel = async (ventas) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Reporte de Ventas');

    worksheet.columns = [
        { header: 'N° ORDEN', key: 'id', width: 12 },
        { header: 'FECHA', key: 'fecha', width: 15 },
        { header: 'CLIENTE', key: 'usuario', width: 30 },
        { header: 'TOTAL', key: 'total', width: 15 },
        { header: 'ESTADO', key: 'estado', width: 15 }
    ];

    ventas.forEach(v => {
        worksheet.addRow({
            id: `#${v.id}`,
            fecha: new Date(v.fecha).toLocaleDateString(),
            usuario: v.usuario?.nombre || 'Cliente General',
            total: v.total, // Pasamos número para formato
            estado: v.estado
        });
    });

    // Formato moneda
    worksheet.getColumn('total').numFmt = '"S/" #,##0.00';
    
    aplicarEstiloCabecera(worksheet);
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `TopiTop_Ventas_${new Date().getTime()}.xlsx`);
};

// ==========================================
// 2. REPORTE DE INVENTARIO (Corregido)
// ==========================================
export const exportarInventarioExcel = async (inventario) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Stock Actual');
    
    worksheet.columns = [
        { header: 'SKU', key: 'sku', width: 20 },
        { header: 'PRODUCTO', key: 'producto', width: 35 },
        { header: 'TALLA', key: 'talla', width: 10 },
        { header: 'COLOR', key: 'color', width: 15 },
        { header: 'STOCK', key: 'stock', width: 12 }
    ];

    inventario.forEach(item => {
        const row = worksheet.addRow({
            sku: item.sku || 'S/N',
            // Intentamos leer propiedades anidadas Y planas para evitar vacíos
            producto: item.nombreProducto || item.producto?.nombre || 'Sin Nombre',
            talla: item.nombreTalla || item.talla?.valor || '-',
            color: item.nombreColor || item.color?.nombre || '-',
            stock: item.stock
        });

        // Alerta visual si stock es 0
        if (item.stock === 0) {
            row.getCell('stock').font = { color: { argb: 'FF0000' }, bold: true };
        }
    });

    aplicarEstiloCabecera(worksheet);
    
    // Auto-filtro
    worksheet.autoFilter = {
        from: { row: 1, column: 1 },
        to: { row: 1, column: 5 }
    };

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `TopiTop_Inventario_${new Date().getTime()}.xlsx`);
};

// ==========================================
// 3. REPORTE DE PRODUCTOS (Corregido)
// ==========================================
export const exportarProductosExcel = async (productos) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Catálogo');

    worksheet.columns = [
        { header: 'NOMBRE', key: 'nombre', width: 35 },
        { header: 'MARCA', key: 'marca', width: 15 },
        { header: 'CATEGORÍA', key: 'categoria', width: 20 },
        { header: 'PRECIO', key: 'precio', width: 15 },
        { header: 'ESTADO', key: 'estado', width: 12 }
    ];

    productos.forEach(p => {
        worksheet.addRow({
            nombre: p.nombre,
            // Priorizamos los nombres planos que vienen en la tabla (nombreMarca)
            marca: p.nombreMarca || p.marca?.nombre || 'General',
            categoria: p.nombreCategoria || p.categoria?.nombre || 'General',
            precio: p.precio,
            estado: p.activo !== false ? 'ACTIVO' : 'INACTIVO'
        });
    });

    worksheet.getColumn('precio').numFmt = '"S/" #,##0.00';
    aplicarEstiloCabecera(worksheet);

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), `TopiTop_Catalogo_${new Date().getTime()}.xlsx`);
};