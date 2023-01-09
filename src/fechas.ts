// console.log(fecha2.getDate());
// console.log("horas", fecha.getHours());
// console.log("minutos", fecha.getMinutes());
// console.log("segundos", fecha.getSeconds());
// console.log("día de la semana", fecha.getDay(), fecha.getDay() + 1);
// console.log("numero", fecha.getDate());
// console.log("mes", fecha.getMonth());
// console.log("año", fecha.getFullYear());

const dia_semana = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export function fechas(inicio: string, fin: string, dia: number) {
  // PRE: Recibe un lapso de tiempo definido por dos fechas, y un día de la semana
  // POST: Devuelve las fechas de ese lapso que coincidan con ese día de la semana

  const dia_epoch = 86400000;
  const tres_hs_epoch = dia_epoch / 8;
  const fecha_inicial = new Date(inicio).getTime() + tres_hs_epoch; // en epoch
  const fecha_final = new Date(fin).getTime() + tres_hs_epoch; // en epoch
  const dia_laborable = dia;
  const fechas: string[] = [];
  var fecha_actual = fecha_inicial;

  while (fecha_actual <= fecha_final) {
    if (new Date(fecha_actual).getDay() == dia_laborable) {
      const fecha_actual_date = new Date(fecha_actual);
      const fecha_formato: string =
        dia_semana[fecha_actual_date.getDay()] +
        " " +
        fecha_actual_date.getDate() +
        "-"+
        (fecha_actual_date.getMonth() + 1) +
        "-" +
        fecha_actual_date.getFullYear() ;
      fechas.push(fecha_formato);
    }
    fecha_actual = fecha_actual + dia_epoch;
  }
  console.log(fechas);
  return fechas;
}
