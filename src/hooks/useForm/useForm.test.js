import { isFormValid } from './useForm';

describe('formIsValid returns true', () => {
  it('returns true when all fields are valid', () => {
    expect(
      isFormValid({
        email: {
          valid: true,
        },
        password: {
          valid: true,
        },
        confirmPassword: {
          valid: true,
        },
        someDate: {
          valid: true,
        },
      })
    ).toEqual(true);
  });
  it(
    'returns true when controlName field and other fields are valid',
    () => {
      expect(
        isFormValid({
          password: {
            valid: true,
          },
          confirmPassword: {
            valid: true,
          },
          someDate: {
            valid: true,
          },
        })
      ).toEqual(true);
    },
    'email',
    true
  );
  it('returns true when controlName field is valid and other fields are valid but control data for controlName is passed', () => {
    expect(
      isFormValid(
        {
          email: {
            valid: false,
          },
          password: {
            valid: true,
          },
          confirmPassword: {
            valid: true,
          },
          someDate: {
            valid: true,
          },
        },
        'email',
        true
      )
    ).toEqual(true);
  });
});

describe('formIsValid returns false', () => {
  it('returns false if all fields are false', () => {
    expect(
      isFormValid({
        email: {
          valid: false,
        },
        password: {
          valid: false,
        },
        confirmPassword: {
          valid: false,
        },
        someDate: {
          valid: false,
        },
      })
    ).toEqual(false);
  });
  it('returns false if any field is false', () => {
    expect(
      isFormValid({
        email: {
          valid: false,
        },
        password: {
          valid: true,
        },
        confirmPassword: {
          valid: true,
        },
        someDate: {
          valid: true,
        },
      })
    ).toEqual(false);
  });
  it('returns false if valid is false', () => {
    expect(
      isFormValid(
        {
          password: {
            valid: true,
          },
          confirmPassword: {
            valid: true,
          },
          someDate: {
            valid: true,
          },
        },
        'email',
        false
      )
    ).toEqual(false);
  });
  it('returns false if valid is false and controlName is true', () => {
    expect(
      isFormValid(
        {
          email: {
            valid: true,
          },
          password: {
            valid: true,
          },
          confirmPassword: {
            valid: true,
          },
          someDate: {
            valid: true,
          },
        },
        'email',
        false
      )
    ).toEqual(false);
  });
});
