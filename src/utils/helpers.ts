function isValidDate(dateString: string): boolean {
  // Regular expression to match 'yyyy-mm-dd' format
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  // Check if the string matches the regex
  if (!regex.test(dateString)) {
      return false;
  }

  // Parse the string into a Date object
  const dateObject = new Date(dateString);

  // Check if the dateObject is a valid date
  // and if the parsed year, month, and day match the input string
  return !isNaN(dateObject.getTime()) &&
      dateObject.toISOString().slice(0, 10) === dateString;
}

function isValidEmail(email: string) {
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^(?=.{1,254}$)(?=.{1,64}@.{1,255}$)[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?!-)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
  // regex validates emails according to RFC 5321 conforming to Google's standards for nodemailer
  return emailRegex.test(email);
}

export {
  isValidDate,
  isValidEmail,
}
