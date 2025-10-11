export type View = 'productos' | 'categorias' | 'crear-producto' | 'configuracion' | 'principal'

export type TopbarCopy = { 
    title: string; 
    subtitle?: string 
};

export const TOPBAR_COPY: Record<View, TopbarCopy> = {
  principal: {
    title: "Dashboard",
    subtitle: "Resumen general de tu operación",
  },
  productos: {
    title: "Productos",
    subtitle: "Gestiona catálogo, variantes y precios",
  },
  categorias: {
    title: "Categorías",
    subtitle: "Organiza y clasifica tus productos",
  },
  "crear-producto": {
    title: "Nuevo producto",
    subtitle: "Completa los datos básicos y guarda",
  },
  configuracion: {
    title: "Configuración",
    subtitle: "Administra la configuración de tu punto de venta",
  },
};

