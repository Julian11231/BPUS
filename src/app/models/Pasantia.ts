export class Pasantia {

    constructor(

        public empresa?: String,
        public vacante?: String,
        public eps?: String,
        public tutor?: String,

        public documento_propuesta?: FormData,
        public documento_fichaAcademica?: FormData,
        public estado_propuesta?: String,
        public notas_propuesta?: String,

        public documento_informe7?: FormData,
        public estado_informe7?: String,
        public notas_informe7?: String,

        public documento_informe14?: FormData,
        public estado_informe14?: String,
        public notas_informe14?: String,

        public documento_informeFinal?: FormData,
        public estado_informeFinal?: String,
        public notas_informeFinal?: String,
        
        public estado?: String

    ) { }
}