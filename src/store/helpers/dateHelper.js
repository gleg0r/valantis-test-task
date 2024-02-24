export default function dateHelper() {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const fullDate = `${year}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}`;
  return fullDate;
}