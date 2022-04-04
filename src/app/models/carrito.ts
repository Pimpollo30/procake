export class Carrito {
    id!: string;
    cantidad!: number;
    fec_solicitud!: string;
    id_producto!: string; 
    id_usuario!: string;
    constructor() {
        this.cantidad = 1;
    }
}