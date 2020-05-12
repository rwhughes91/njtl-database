const formControls = {
  sale_year: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'Sale Year',
    },
    value: '',
    validation: { isNumber: true, isYear: true },
    valid: true,
    touched: false,
    errorMessage: '',
  },
  llc: {
    elementType: 'input',
    elementConfig: {
      type: 'text',
      placeholder: 'LLC',
    },
    value: '',
    validation: {},
    valid: true,
    touched: false,
    errorMessage: '',
  },
  county: {
    elementType: 'select',
    elementConfig: {
      options: [
        { value: 'Asbury Park', displayValue: 'Asbury Park' },
        { value: 'Atlantic City', displayValue: 'Atlantic City' },
        { value: 'Belleville', displayValue: 'Belleville' },
        { value: 'Berkeley', displayValue: 'Berkeley' },
        { value: 'Brick', displayValue: 'Brick' },
        { value: 'Bridgeton', displayValue: 'Bridgeton' },
        { value: 'Cherry Hill', displayValue: 'Cherry Hill' },
        { value: 'Clifton', displayValue: 'Clifton' },
        { value: 'Collingswood', displayValue: 'Collingswood' },
        { value: 'Delran', displayValue: 'Delran' },
        { value: 'East Brunswick', displayValue: 'East Brunswick' },
        { value: 'Edison', displayValue: 'Edison' },
        { value: 'Egg Harbor', displayValue: 'Egg Harbor' },
        { value: 'Elizabeth', displayValue: 'Elizabeth' },
        { value: 'Englewood', displayValue: 'Englewood' },
        {
          value: 'Franklin (Gloucester)',
          displayValue: 'Franklin (Gloucester)',
        },
        { value: 'Franklin (Somerset)', displayValue: 'Franklin (Somerset)' },
        { value: 'Galloway', displayValue: 'Galloway' },
        { value: 'Gloucester', displayValue: 'Gloucester' },
        { value: 'Haddon', displayValue: 'Haddon' },
        { value: 'Hamilton', displayValue: 'Hamilton' },
        { value: 'Hammonton', displayValue: 'Hammonton' },
        { value: 'Highland Park', displayValue: 'Highland Park' },
        { value: 'Hopatcong', displayValue: 'Hopatcong' },
        { value: 'Howell', displayValue: 'Howell' },
        { value: 'Lakewood', displayValue: 'Lakewood' },
        { value: 'Linden', displayValue: 'Linden' },
        { value: 'Lindenwold', displayValue: 'Lindenwold' },
        { value: 'Little Egg Harbor', displayValue: 'Little Egg Harbor' },
        { value: 'Livingston', displayValue: 'Livingston' },
        { value: 'Marlboro', displayValue: 'Marlboro' },
        { value: 'Medford', displayValue: 'Medford' },
        { value: 'Middletown', displayValue: 'Middletown' },
        { value: 'Millville', displayValue: 'Millville' },
        { value: 'Monroe', displayValue: 'Monroe' },
        { value: 'Neptune', displayValue: 'Neptune' },
        { value: 'New Brunswick', displayValue: 'New Brunswick' },
        { value: 'Ocean', displayValue: 'Ocean' },
        { value: 'Old Bridge', displayValue: 'Old Bridge' },
        { value: 'Paterson', displayValue: 'Paterson' },
        { value: 'Passaic', displayValue: 'Passaic' },
        { value: 'Pennsville', displayValue: 'Pennsville' },
        { value: 'Permberton', displayValue: 'Permberton' },
        { value: 'Perth Amboy', displayValue: 'Perth Amboy' },
        { value: 'Piscataway', displayValue: 'Piscataway' },
        { value: 'Plainfield', displayValue: 'Plainfield' },
        { value: 'Pleasantville', displayValue: 'Pleasantville' },
        { value: 'South Plainfield', displayValue: 'South Plainfield' },
        { value: 'Toms River', displayValue: 'Toms River' },
        { value: 'Trenton', displayValue: 'Trenton' },
        { value: 'Union', displayValue: 'Union' },
        { value: 'Vineland', displayValue: 'Vineland' },
        { value: 'Washington', displayValue: 'Washington' },
        { value: 'West New York', displayValue: 'West New York' },
        { value: 'Willingboro', displayValue: 'Willingboro' },
        { value: 'Winslow', displayValue: 'Winslow' },
        { value: 'Woodbridge', displayValue: 'Woodbridge' },
        { value: 'Woodbury', displayValue: 'Woodbury' },
      ],
    },
    value: 'Select...',
    validation: { required: true, notEqual: 'Select...' },
    valid: false,
    touched: false,
    errorMessage: '',
  },
};

export default formControls;
