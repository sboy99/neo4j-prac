export function stringifyDates(obj: any): any {
  if (typeof obj === "object" && obj !== null) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] instanceof Date) {
          obj[key] = obj[key].toISOString();
        } else if (typeof obj[key] === "object") {
          obj[key] = stringifyDates(obj[key]);
        }
      }
    }
  }
  return obj;
}
