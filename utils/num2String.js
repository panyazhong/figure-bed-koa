function num2String(num) {
  return num < 10 ? `0${num}` : num
}

module.exports = num2String