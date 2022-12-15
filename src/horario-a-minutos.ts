export function horarioAMinutos(hora: string) {
  console.log(hora, "es la hora de HORARIO A MINUTOS")
  const minutos = parseInt(hora.slice(3));
  const horas = parseInt(hora.slice(0, 2));
  const horaEnMinutos = horas * 60 + minutos;
  console.log(horaEnMinutos);
  return horaEnMinutos;
}
