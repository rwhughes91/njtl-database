import formFormatter from './formFormatter';

describe('formats date values to display date strings', () => {
  it('formats db values to display strings', () => {
    expect(formFormatter('1418860800000', ['date'])).toEqual('12/17/2014');
  });
  it('formats string values to display strings', () => {
    expect(formFormatter('12/17/2014', ['date'])).toEqual('12/17/2014');
  });
  it('formats invalid string values to display strings', () => {
    expect(formFormatter('12/1', ['date'])).toEqual('12/1');
  });
});

describe('formats percent values to display percent strings', () => {
  it('formats string to display percent strings', () => {
    expect(formFormatter('4', ['percent'])).toEqual('4%');
  });
  it('formats int to display percent strings', () => {
    expect(formFormatter(4, ['percent'])).toEqual('400%');
  });
  it('formats percent string to display percent strings', () => {
    expect(formFormatter('40%', ['percent'])).toEqual('40%');
  });
  it('formats percent string to display percent strings', () => {
    expect(formFormatter('0', ['percent'])).toEqual('0%');
  });
});

describe('formats values to display currency strings', () => {
  it('formats int to display currency strings', () => {
    expect(formFormatter(4, ['currency'])).toEqual('$4.00');
  });
  it('formats currency string to display currency strings', () => {
    expect(formFormatter('$4.00', ['currency'])).toEqual('$4.00');
  });
  it('formats invalid currency string to display currency strings', () => {
    expect(formFormatter('4', ['currency'])).toEqual('$4.00');
  });
});
