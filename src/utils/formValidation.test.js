import formValidation from './formValidation';

describe('validates the form field is not empty', () => {
  it('validates the form field is not empty', () => {
    expect(formValidation('randomData', { required: true })).toEqual([
      true,
      '',
    ]);
  });
  it('returns an error message when the field is empty', () => {
    expect(formValidation(' ', { required: true })).toEqual([
      false,
      'Field required',
    ]);
  });
});

describe('validates the form field has a minimum length', () => {
  it('validates the form field length is greater than the min', () => {
    expect(formValidation('randomData', { minLength: 5 })).toEqual([true, '']);
  });
  it('returns an error message when the field is too short in length', () => {
    expect(formValidation(' ', { minLength: 5 })).toEqual([
      false,
      'Must be over 4 chars',
    ]);
  });
});

describe('validates the form field has a maximum length', () => {
  it('returns an error message when the field is too long in length', () => {
    expect(formValidation('randomData', { maxLength: 5 })).toEqual([
      false,
      'Must be under 6 chars',
    ]);
  });
  it('validates the form field has a max length', () => {
    expect(formValidation(' ', { maxLength: 5 })).toEqual([true, '']);
  });
});
