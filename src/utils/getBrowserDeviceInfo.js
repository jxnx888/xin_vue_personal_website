export default function getBrowserDeviceInfo() {
  let agent = navigator.userAgent.toLowerCase();
  let arr = [];
  let system = agent.split(' ')[1].split(' ')[0].split('(')[1];
  arr.push(system);
  let REGSTR_EDGE = /edge\/[\d.]+/gi;
  let REGSTR_IE = /trident\/[\d.]+/gi;
  let OLD_IE = /msie\s[\d.]+/gi;
  let REGSTR_FF = /firefox\/[\d.]+/gi;
  let REGSTR_CHROME = /chrome\/[\d.]+/gi;
  let REGSTR_SAF = /safari\/[\d.]+/gi;
  let REGSTR_OPERA = /opr\/[\d.]+/gi;
  // IE
  if (agent.indexOf('trident') > 0) {
    arr.push(agent.match(REGSTR_IE)[0].split('/')[0]);
    arr.push(agent.match(REGSTR_IE)[0].split('/')[1]);
    return arr;
  }
  // OLD_IE
  if (agent.indexOf('msie') > 0) {
    arr.push(agent.match(OLD_IE)[0].split(' ')[0]);
    arr.push(agent.match(OLD_IE)[0].split(' ')[1]);
    return arr;
  }
  // Edge
  if (agent.indexOf('edge') > 0) {
    arr.push(agent.match(REGSTR_EDGE)[0].split('/')[0]);
    arr.push(agent.match(REGSTR_EDGE)[0].split('/')[1]);
    return arr;
  }
  // firefox
  if (agent.indexOf('firefox') > 0) {
    arr.push(agent.match(REGSTR_FF)[0].split('/')[0]);
    arr.push(agent.match(REGSTR_FF)[0].split('/')[1]);
    return arr;
  }
  // Opera
  if (agent.indexOf('opr') > 0) {
    arr.push(agent.match(REGSTR_OPERA)[0].split('/')[0]);
    arr.push(agent.match(REGSTR_OPERA)[0].split('/')[1]);
    return arr;
  }
  // Safari
  if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
    arr.push(agent.match(REGSTR_SAF)[0].split('/')[0]);
    arr.push(agent.match(REGSTR_SAF)[0].split('/')[1]);
    return arr;
  }
  // Chrome
  if (agent.indexOf('chrome') > 0) {
    arr.push(agent.match(REGSTR_CHROME)[0].split('/')[0]);
    arr.push(agent.match(REGSTR_CHROME)[0].split('/')[1]);
    return arr;
  } else {
    return 'Unknown';
  }
}
