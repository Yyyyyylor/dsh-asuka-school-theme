const pairs = [
  ['light primary text', '#24313D', '#FCFAF4'],
  ['light secondary text', '#354B59', '#FCFAF4'],
  ['light primary button', '#FFFFFF', '#C7474F'],
  ['Asuka hair action button', '#FFFFFF', '#B8522B'],
  ['noon code banner', '#24313D', '#F3E8DB'],
  ['morning code banner', '#24313D', '#F0D8C2'],
  ['dark primary text', '#F4F0E9', '#202934'],
  ['dark secondary text', '#C5D2D8', '#202934'],
  ['dark primary button', '#171C24', '#E35A64'],
]

for (const [name, foreground, background] of pairs) {
  const ratio = contrast(foreground, background)
  if (ratio < 4.5) throw new Error(`${name} contrast ${ratio.toFixed(2)}:1 is below WCAG AA`)
  console.log(`${name}: ${ratio.toFixed(2)}:1`)
}

function contrast(left, right) {
  const luminance = value => {
    const channels = value.slice(1).match(/.{2}/g).map(hex => Number.parseInt(hex, 16) / 255)
    const [r, g, b] = channels.map(channel => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }
  const [a, b] = [luminance(left), luminance(right)].sort((x, y) => y - x)
  return (a + 0.05) / (b + 0.05)
}
