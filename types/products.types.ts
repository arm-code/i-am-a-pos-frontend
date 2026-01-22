export interface Product {
    id:                number;
    codigoBarra:       string;
    sku:               string;
    nombre:            string;
    descripcion:       string;
    precioCompra:      string;
    precioVenta:       string;
    precioRentaDiario: string;
    stock:             number;
    stockMinimo:       number;
    categoria:         Categoria;
    tipoProducto:      ProductTypes;
    activo:            boolean;
    createdAt:         Date;
    updatedAt:         Date;
    imagenPrincipal:   null;
    imagenes:          any[];
}

export interface Categoria {
    id:          number;
    nombre:      string;
    descripcion: string;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface ProductTypes {
    id:            number;
    nombre:        string;
    descripcion:   string;
    requiereStock: boolean;
    permiteVenta:  boolean;
    permiteRenta:  boolean;
    createdAt:     Date;
}
