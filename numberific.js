function numberific(value, options) {
  options = Object.assign({}, {
    delimiter: ',',
    minBeforeApplyingDelimiter: 0,
    precision: null,
    separator: '.',
  }, options);

  var result = parseFloat(value)

  // Set precision
  if (options.precision !== null) {
    result = result.toFixed(options.precision);
  }

  // Convert to string
  result = result.toString();

  // Decimal separator
  result = result.replace(/\./, options.separator);

  // Thousands delimiter
  if (value >= options.minBeforeApplyingDelimiter) {
    var parts = result.split(options.separator);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, options.delimiter);
    result = parts.join(options.separator);
  }

  return result;
}

module.exports = numberific;

