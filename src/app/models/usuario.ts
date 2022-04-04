export class Usuario {
    id!: string;
    id_user!: string;
    nombre!: string;
    apellidos!: string;
    calle!: string; 
    no_int!: string; 
    no_ext!: string; 
    colonia!: string; 
    cp!: string; 
    ciudad!: string; 
    estado!: string; 
    telefono!: string; 
    tipo_usuario!: string;

    constructor() {
        this.nombre = '';
        this.apellidos = '';
        this.calle = '';
        this.no_int = '';
        this.no_ext = '';
        this.colonia = '';
        this.cp = '';
        this.ciudad = '';
        this.estado = '';
        this.telefono = '';
    }
}