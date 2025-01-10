export class DateFormated {
  //   static getDDMMMMYYYY(date: Date): string {
  //     return Intl.DateTimeFormat('es-ES', {
  //       year: 'numeric',
  //       month: 'long',
  //       day: '2-digit',
  //     }).format(date);
  //   }
  private static formatter = Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  static getDDMMMMYYYY(date: Date): string {
    return this.formatter.format(date);
  }
}
