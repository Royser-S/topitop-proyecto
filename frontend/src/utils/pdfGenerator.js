import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarBoletaPDF = (orden) => {
    const doc = new jsPDF();

    // --- CONFIGURACIÓN DE ESTILO ---
    const azulTopiTop = [13, 110, 253]; // Color RGB
    const margenIzquierdo = 14;
    const margenDerecho = 196; // A4 ancho es 210mm
    
    // 1. ENCABEZADO (Lado Izquierdo - Empresa)
    doc.setFontSize(22);
    doc.setTextColor(...azulTopiTop);
    doc.setFont("helvetica", "bold");
    doc.text("TopiTop", margenIzquierdo, 20);

    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.setFont("helvetica", "normal");
    doc.text("RUC: 20123456789", margenIzquierdo, 28);
    doc.text("Av. La Moda 123, Lima - Perú", margenIzquierdo, 33);
    doc.text("contacto@topitop.com.pe", margenIzquierdo, 38);

    // 2. CAJA DE INFORMACIÓN (Lado Derecho - Orden)
    // Dibujamos un rectángulo redondeado para la info de la orden
    doc.setDrawColor(200);
    doc.roundedRect(120, 12, 76, 30, 2, 2); 

    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text("BOLETA DE VENTA ELECTRONICA", 158, 20, { align: 'center' });
    
    // ID Orden
    const ordenId = orden.id ? orden.id.toString().padStart(6, '0') : '000000';
    doc.setFontSize(10);
    doc.setTextColor(...azulTopiTop);
    doc.text(`N° B001-${ordenId}`, 158, 28, { align: 'center' });

    doc.setFontSize(9);
    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha: ${new Date(orden.fecha).toLocaleDateString()}`, 125, 36);

    // 3. DATOS DEL CLIENTE (Separador)
    doc.setDrawColor(...azulTopiTop);
    doc.line(margenIzquierdo, 48, margenDerecho, 48); // Línea azul horizontal
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("CLIENTE:", margenIzquierdo, 54);
    
    doc.setFont("helvetica", "normal");
    const nombreCliente = orden.usuario?.nombre || orden.nombreUsuario || 'Cliente General';
    const direccion = orden.direccionEnvio || 'Lima, Perú';
    
    doc.text(nombreCliente.toUpperCase(), 35, 54);
    doc.text(`Dirección: ${direccion}`, margenIzquierdo, 60);

    // 4. TABLA DE PRODUCTOS
    const columnas = [
        { header: 'PRODUCTO', dataKey: 'producto' },
        { header: 'TALLA / COLOR', dataKey: 'talla' }, // Unimos para ahorrar espacio        { header: 'CANT.', dataKey: 'cantidad' },
        { header: 'P. UNIT.', dataKey: 'precio' },
        { header: 'SUBTOTAL', dataKey: 'subtotal' },
    ];

    const filas = orden.detalles.map(item => {
        const precio = Number(item.precioUnitario || 0);
        const cantidad = Number(item.cantidad || 0);
        const subtotal = item.subtotal || (precio * cantidad);
        const txtTalla = item.nombreTalla || item.talla?.valor || '-';
        const txtColor = item.nombreColor || item.color?.nombre || '-';
        
        return {
            producto: (item.producto?.nombre || item.nombreProducto || 'Item').substring(0, 25),
            talla: `${txtTalla} / ${txtColor}`, 
            precio: `S/ ${precio.toFixed(2)}`,
            subtotal: `S/ ${subtotal.toFixed(2)}`
        };
    });

    autoTable(doc, {
        startY: 65,
        columns: columnas,
        body: filas,
        theme: 'striped',
        headStyles: { 
            fillColor: azulTopiTop, 
            textColor: 255, 
            halign: 'center',
            fontStyle: 'bold'
        },
        bodyStyles: { textColor: 50 },
        columnStyles: {
            cantidad: { halign: 'center' },
            precio: { halign: 'right' },    // Precios a la derecha
            subtotal: { halign: 'right', fontStyle: 'bold' } // Subtotal a la derecha y negrita
        },
        styles: { fontSize: 9, cellPadding: 2 }
    });

    // 5. TOTALES (Alineados a la derecha debajo de la tabla)
    const finalY = doc.lastAutoTable.finalY + 10;
    const xTotalesLabel = 140;
    const xTotalesValue = margenDerecho; // 196mm
    
    const total = Number(orden.total || 0);
    const subtotalCalc = total / 1.18;
    const igvCalc = total - subtotalCalc;

    // Subtotal
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("OP. GRAVADA:", xTotalesLabel, finalY);
    doc.text(`S/ ${subtotalCalc.toFixed(2)}`, xTotalesValue, finalY, { align: 'right' });

    // IGV
    doc.text("I.G.V. (18%):", xTotalesLabel, finalY + 6);
    doc.text(`S/ ${igvCalc.toFixed(2)}`, xTotalesValue, finalY + 6, { align: 'right' });

    // Línea de total
    doc.setDrawColor(200);
    doc.line(135, finalY + 9, margenDerecho, finalY + 9);

    // TOTAL FINAL
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text("IMPORTE TOTAL:", xTotalesLabel, finalY + 16);
    doc.setTextColor(...azulTopiTop);
    doc.text(`S/ ${total.toFixed(2)}`, xTotalesValue, finalY + 16, { align: 'right' });

    // 6. PIE DE PÁGINA (Mensaje legal)
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.setFont("helvetica", "normal");
    const pieY = 280;
    doc.text("Representación impresa de la Boleta de Venta Electrónica.", 105, pieY, { align: 'center' });
    doc.text("Gracias por su preferencia.", 105, pieY + 4, { align: 'center' });

    // Guardar
    doc.save(`Boleta_TopiTop_${ordenId}.pdf`);
};