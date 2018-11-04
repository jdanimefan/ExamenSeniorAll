export class reporte{
    status:number;
    message: string;
    response:{
        iident: number,
        iNumempl: number,
        tNomempl: string,
        bAuxchofer: boolean,
        iDiaschofer: number,
        bAuxcargador: boolean,
        iDiascargador: number,
        iMonto: number,
        iIsrretenido: number,
        iBonoenvales: number,
        iHorastrabajadas: number,
        iEntregas: number,
        dFecha: string
    };
}