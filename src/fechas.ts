// console.log(fecha2.getDate());
// console.log("horas", fecha.getHours());
// console.log("minutos", fecha.getMinutes());
// console.log("segundos", fecha.getSeconds());
// console.log("día de la semana", fecha.getDay(), fecha.getDay() + 1);
// console.log("numero", fecha.getDate());
// console.log("mes", fecha.getMonth());
// console.log("año", fecha.getFullYear());

export function fechas(inicio: string, fin: string, dia: number) {
  // PRE: Recibe un lapso de tiempo definido por dos fechas, y un día de la semana
  // POST: Devuelve las fechas de ese lapso que coincidan con ese día de la semana

  const fecha_inicial = new Date(inicio);
  const fecha_final = new Date(fin);
  const dia_epoch = 86400000;
  const dia_laborable = dia;
  const fechas: Date[] = [];
  var fecha_actual = fecha_inicial;

  while (fecha_actual.getTime() <= fecha_final.getTime() + dia_epoch) {
    if (fecha_actual.getDay() == dia_laborable) {
      fechas.push(fecha_actual);
    }
    fecha_actual = new Date(fecha_actual.getTime() + dia_epoch);
  }
  console.log(fechas);
  return fechas;
}
