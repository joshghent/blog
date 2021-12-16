import React from 'react';
import { InlineWidget } from 'react-calendly';

class BookingIndex extends React.Component {
  render() {
    return (
      <InlineWidget url="https://calendly.com/gabriella-ghent/consultation?month=2021-12" />
    );
  }
}

export default BookingIndex;
