const getAverage = (values) => values.reduce((acc, cv, idx) => {
  if (idx === 0) return acc + cv
  return (acc * idx + cv) / (idx + 1)
}, 0)

const getStandardDeviation = (values) => {
  const average = getAverage(values)
  let temp = 0
  values.forEach(value => { temp += Math.pow((value - average), 2) })
  return Math.sqrt(temp / values.length)
}

export {
  getAverage,
  getStandardDeviation
}
