interface Options {
  firstOctet?: { min: number; max: number };
  secondOctet?: { min: number; max: number };
  thirdOctet?: { min: number; max: number };
  fourthOctet?: { min: number; max: number };
}

function clamp(value: number, min: number, max: number): number {
  if (value >= min && value <= max) {
    return value;
  } else if (value < min) {
    return min;
  }
  return max;
}

function randomNatural(value: { min: any; max: any }): number {
  return Math.floor(Math.random() * (value.max - value.min) + value.min);
}

function genPart(options?: { min: any; max: any }, index?: number, ipClass?: string): number {
  const MAX = 255;
  let min: number = options?.min;
  let max: number = options?.max;
  if (typeof min === 'string') {
    min = parseInt(min, 10);
  }

  if (typeof max === 'string') {
    max = parseInt(max, 10);
  }

  if (isNaN(min) || !isFinite(min)) {
    min = 0;
  }

  if (isNaN(max) || !isFinite(max)) {
    max = MAX;
  }
  if (ipClass && ipClass?.match(/^[A-Aa-a]+$/) && index === 0) {
    min = clamp(min, 0, 127);
    max = clamp(max, 0, 127);
  } else if (ipClass && ipClass?.match(/^[B-Bb-b]+$/) && index === 0) {
    min = clamp(min, 128, 191);
    max = clamp(max, 128, 191);
  } else if (ipClass && ipClass?.match(/^[C-Cc-c]+$/) && index === 0) {
    min = clamp(min, 192, 223);
    max = clamp(max, 192, 223);
  } else if (ipClass && ipClass?.match(/^[D-Dd-d]+$/) && index === 0) {
    min = clamp(min, 224, 239);
    max = clamp(max, 224, 239);
  } else if (ipClass && ipClass?.match(/^[E-Ee-e]+$/) && index === 0) {
    min = clamp(min, 240, 255);
    max = clamp(max, 240, 255);
  } else {
    min = clamp(min, 0, MAX);
    max = clamp(max, 0, MAX);
  }
  return randomNatural({ min, max });
}

function randomIPV4(ipClass?: string, options: Options = {}): string {
  const letters = /^[A-Ea-e]+$/;
  if (ipClass?.match(letters) || !ipClass) {
    const ipArr: number[] = [];
    const octetArr: any[] = [options?.firstOctet, options?.secondOctet, options?.thirdOctet, options?.fourthOctet];
    for (let index = 0; index < 4; index++) {
      ipArr.push(genPart(octetArr[index], index, ipClass));
    }
    return ipArr.join('.');
  }
  throw new Error('Invalid IP Class');
}

export function randomIPV4ByClass(ipClass?: string): string {
  return randomIPV4(ipClass);
}
export function randomIPV4ByRange(options: Options = {}): string {
  return randomIPV4(undefined, options);
}

export function getIPClass(ip: string): { class: string; range: string } {
  const ipArr: string[] = ip.split('.');
  const newIPArr = ipArr.map((octet: string) => parseInt(octet, 10));

  if (ipArr && newIPArr[0] >= 0 && newIPArr[0] <= 127) {
    return { class: 'A', range: '0-127' };
  } else if (ipArr && newIPArr[0] >= 128 && newIPArr[0] <= 191) {
    return { class: 'B', range: '128-191' };
  } else if (ipArr && newIPArr[0] >= 192 && newIPArr[0] <= 223) {
    return { class: 'C', range: '192-223' };
  } else if (ipArr && newIPArr[0] >= 224 && newIPArr[0] <= 239) {
    return { class: 'D', range: '224-239' };
  } else if (ipArr && newIPArr[0] >= 240 && newIPArr[0] <= 255) {
    return { class: 'E', range: '240-255' };
  }
  throw new Error('Invalid IP address');
}
const icg = { getIPClass, randomIPV4ByClass, randomIPV4ByRange };
export default icg;
