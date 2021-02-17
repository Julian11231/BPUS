export class EncargadoEmpresa {

    constructor(

        public identificacion: String,
        public nombre: String,
        public correo: String,
        public telefono: String,
        public contraseña: String,
        public programa: String,
        public empresa: String,
        public cargo:String,
        public rol: String,
        public estado?: String,
        public imagen?: String

    ) { }

}