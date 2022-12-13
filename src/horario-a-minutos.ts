export function horarioAMinutos(hora: string) {
  const minutos = parseInt(hora.slice(3));
  const horas = parseInt(hora.slice(0, 2));
  const horaEnMinutos = horas * 60 + minutos;
  console.log(horaEnMinutos);
  return horaEnMinutos;
}
