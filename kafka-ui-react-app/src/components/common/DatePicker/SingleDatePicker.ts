import React from 'react';
import DatePicker, { DatePickerProps } from 'react-datepicker';

// react-datepicker 9 props are a union (single/range/multiple selection), which
// styled-components cannot infer; the app only uses single date selection
type SingleDatePickerProps = Omit<
  DatePickerProps,
  'selectsRange' | 'selectsMultiple' | 'selected' | 'onChange'
> & {
  selected?: Date | null;
  onChange: (date: Date | null) => void;
};

const SingleDatePicker = DatePicker as unknown as React.ComponentType<
  SingleDatePickerProps & React.RefAttributes<DatePicker>
>;

export default SingleDatePicker;
