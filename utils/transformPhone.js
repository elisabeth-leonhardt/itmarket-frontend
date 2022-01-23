export function transformPhone(number) {
  // eliminate plus and whitespaces
  if (!number) {
    return '';
  }
  return number.replace(/(\s)|(\+)/g, '');
}
