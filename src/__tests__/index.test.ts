import icg from '../index';

test('Verify IP', () => {
  expect(icg.getIPClass('127.0.0.1')).toStrictEqual({ class: 'A', range: '0-127' });
  expect(icg.getIPClass('50.105.197.107')).toStrictEqual({ class: 'A', range: '0-127' });
  expect(icg.getIPClass('160.244.156.161')).toStrictEqual({ class: 'B', range: '128-191' });
  expect(icg.getIPClass('198.248.213.31')).toStrictEqual({ class: 'C', range: '192-223' });
  expect(icg.getIPClass('229.11.104.195')).toStrictEqual({ class: 'D', range: '224-239' });
  expect(icg.getIPClass('241.122.124.254')).toStrictEqual({ class: 'E', range: '240-255' });
});

test('Random IP By Class', () => {
  expect(icg.getIPClass(icg.randomIPV4ByClass('A')).class).toBe('A');
  expect(icg.getIPClass(icg.randomIPV4ByClass('a')).class).toBe('A');
  expect(icg.getIPClass(icg.randomIPV4ByClass('aA')).class).toBe('A');
  expect(icg.getIPClass(icg.randomIPV4ByClass('Aa')).class).toBe('A');

  expect(icg.getIPClass(icg.randomIPV4ByClass('b')).class).toBe('B');
  expect(icg.getIPClass(icg.randomIPV4ByClass('c')).class).toBe('C');
  expect(icg.getIPClass(icg.randomIPV4ByClass('d')).class).toBe('D');
  expect(icg.getIPClass(icg.randomIPV4ByClass('e')).class).toBe('E');
});

test('Random IP By Range', () => {
  expect(+icg.randomIPV4ByRange({ firstOctet: { min: 20, max: 50 } }).split('.')[0]).toBeGreaterThanOrEqual(20);
  expect(+icg.randomIPV4ByRange({ firstOctet: { min: 20, max: 50 } }).split('.')[0]).toBeLessThanOrEqual(50);

  expect(+icg.randomIPV4ByRange({ secondOctet: { min: 20, max: 50 } }).split('.')[1]).toBeGreaterThanOrEqual(20);
  expect(+icg.randomIPV4ByRange({ secondOctet: { min: 20, max: 50 } }).split('.')[1]).toBeLessThanOrEqual(50);

  expect(+icg.randomIPV4ByRange({ thirdOctet: { min: 20, max: 50 } }).split('.')[2]).toBeGreaterThanOrEqual(20);
  expect(+icg.randomIPV4ByRange({ thirdOctet: { min: 20, max: 50 } }).split('.')[2]).toBeLessThanOrEqual(50);

  expect(+icg.randomIPV4ByRange({ fourthOctet: { min: 20, max: 50 } }).split('.')[3]).toBeGreaterThanOrEqual(20);
  expect(+icg.randomIPV4ByRange({ fourthOctet: { min: 20, max: 50 } }).split('.')[3]).toBeLessThanOrEqual(50);
});

test('Random IP with static range', () => {
  expect(+icg.randomIPV4ByRange({ firstOctet: 10 }).split('.')[0]).toBe(10);
  expect(+icg.randomIPV4ByRange({ firstOctet: 30 }).split('.')[0]).toBe(30);

  expect(+icg.randomIPV4ByRange({ secondOctet: 20 }).split('.')[1]).toBe(20);
  expect(+icg.randomIPV4ByRange({ secondOctet: 40 }).split('.')[1]).toBe(40);

  expect(+icg.randomIPV4ByRange({ thirdOctet: 30 }).split('.')[2]).toBe(30);
  expect(+icg.randomIPV4ByRange({ thirdOctet: 50 }).split('.')[2]).toBe(50);

  expect(+icg.randomIPV4ByRange({ fourthOctet: 40 }).split('.')[3]).toBe(40);
  expect(+icg.randomIPV4ByRange({ fourthOctet: 60 }).split('.')[3]).toBe(60);
});