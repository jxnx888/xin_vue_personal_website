export default function getUserAgent() {
  let ua;
  const gwmClient = navigator.userAgent;
  const isWindowsPhone = /(?:Windows Phone)/.test(gwmClient);
  const isSymbian = /(?:SymbianOS)/.test(gwmClient) || isWindowsPhone;
  const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(gwmClient);
  const isFireFox = /(?:Firefox)/.test(gwmClient);
  const isTablet =
    /(?:iPad|PlayBook)/.test(gwmClient) ||
    (isAndroid && !/(?:Mobile)/.test(gwmClient)) ||
    (isFireFox && /(?:Tablet)/.test(gwmClient));
  const isPhone = /(?:iPhone)/.test(gwmClient) && !isTablet;
  const isPc = !isPhone && !isAndroid && !isSymbian;
  if (isAndroid || isPhone) {
    ua = 'phone';
  } else if (isTablet) {
    ua = 'pad';
  } else if (isPc) {
    ua = 'pc';
  }
  if (ua === 'pc' && window.innerWidth < 992) {
    ua = 'pad'
    if (window.innerWidth < 500) {
      ua = 'phone'
    }
  }
  return ua;
}
