export const ThfChartColors = [
  ['#00CBE4'],
  ['#00CBE4', '#32285C'],
  ['#00CBE4', '#277099', '#32285C'],
  ['#00CBE4', '#018DB0', '#325783', '#32285C'],
  ['#00CBE4', '#009CBD', '#286F9B', '#354B7A', '#32285C'],
  ['#00CBE4', '#00A5C5', '#0082A8', '#31628D', '#364473', '#32285C'],
  ['#00CBE4', '#00AACB', '#018DAE', '#277099', '#325783', '#35426E', '#32285D'],
  ['#00CBE4', '#00AFCE', '#0194B6', '#117FA2', '#0088AC', '#23789F', '#2B6992', '#32285C'],
  ['#00CBE4', '#00BAD5', '#00A7C7', '#0197B8', '#0088AC', '#23789F', '#2B6992', '#315C87', '#32285C'],
  ['#00CBE4', '#00BAD5', '#00A7C7', '#0197B8', '#0088AC', '#23789F', '#2B6992', '#315C87', '#364E7C', '#32285C'],
  ['#00CBE4', '#00BAD5', '#00A7C7', '#0197B8', '#0088AC', '#23789F', '#2B6992', '#315C87', '#364E7C', '#36436F', '#32285C'],
  ['#00CBE4', '#00BAD5', '#00A7C7', '#0197B8', '#0088AC', '#23789F', '#2B6992', '#315C87', '#364E7C', '#36436F', '#333565', '#32285C'],
];

export const ThfGaugeColors = ['#29b6c5', '#b6bdbf'];

export function setColor(data) {

  if (data) {
    let index = data.length - 1;

    if (data.length <= 2) {
    return ThfGaugeColors;
    } else {
      index = index >= 12 ? 11 : index;
      return ThfChartColors[index];
    }
  }
  return ThfChartColors[11];
}
