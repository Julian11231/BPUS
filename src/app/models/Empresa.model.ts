export class Empresa {

    constructor(
        public nit: String,
        public nombre: String,
        public direccion: String,
        public telefono: String,
        public naturaleza: String,
        public actividad_economica: String,
        public estado?: String,

    ) { }

}