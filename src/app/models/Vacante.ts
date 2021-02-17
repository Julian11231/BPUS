export class Vacante {

    constructor(
        public titulo: String,
        public funciones: String,
        public descripcion: String,
        public empresa: String,
        public programa: String,
        public encargado: String,
        public ubicacion: String,
        public modalidad: String,
        public cantidad: Number,
        public pagada: String,
        public estado?: String,

    ) { }

}