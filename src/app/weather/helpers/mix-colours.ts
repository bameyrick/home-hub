export function mixColours(a: string, b: string, amount: number): string {
  a = a.replace('#', '');
  b = b.replace('#', '');

  let colour = '#';

  // loop through each of the 3 hex pairs—red, green, and blue
  for (let i = 0; i <= 5; i += 2) {
    // extract the current pairs
    const v1 = hexToDecimal(a.substr(i, 2));
    const v2 = hexToDecimal(b.substr(i, 2));

    // combine the current pairs from each source colour, according to the specified weight
    let val = decimalToHex(Math.round(v2 + (v1 - v2) * amount));

    // prepend a '0' if val results in a single digit
    while (val.length < 2) {
      val = '0' + val;
    }

    // concatenate val to our new colour string
    colour += val;
  }

  return colour;
}

function decimalToHex(decimal: number): string {
  return decimal.toString(16);
}

function hexToDecimal(hex: string): number {
  return parseInt(hex, 16);
}
