
const amount = 10

document.addEventListener("DOMContentLoaded", function () {
  window.mWidth = document.body.clientWidth / 2
  window.mHeight = document.body.clientHeight / 2
  var cat = document.getElementById('cat')
  cat.style.backgroundImage = fillArray('url(cat.png)', amount).join(',')
  cat.style.backgroundSize = generateSize(100, 10, amount).join(',')



  console.log(getQueryParams(window.location.search))


});

window.addEventListener("resize", function () {
  window.mWidth = document.body.clientWidth / 2
  window.mHeight = document.body.clientHeight / 2
})


document.addEventListener("mousemove", function (e) {
  let x = e.pageX
  let y = e.pageY
  let gx = false, gy = false

  var cat = document.getElementById('cat')

  if (x >= mWidth) {
    gx = true
  }

  if (y >= mHeight) {
    gy = true
  }
  var css = [`${x}px ${y}px`];
  for (let i = 1; i < amount + 1; i++) {
    css.push(generatePosition(i, x, y, gx, gy))
  }
  cat.style.backgroundPosition = css.join(',')
});

function generatePosition (i, x, y, gx, gy) {
  var level = i / 10
  return `${gx ? x - ((x - mWidth) * level) : x + ((mWidth - x) * level)}px
          ${gy ? y - ((y - mHeight) * level) : y + ((mHeight - y) * level)}px`
}

function generateSize (start, amount, length) {
  var values = []
  for (let i = 0; i < length; i++) {
    values.push(`${start - (amount * i)}px`)
  }

  return values
}

function fillArray (value, len) {
  if (len == 0) return []
  var a = [value]
  while (a.length * 2 <= len) a = a.concat(a)
  if (a.length < len) a = a.concat(a.slice(0, len - a.length))
  return a
}

function getQueryParams (qs) {
  qs = qs.split('+').join(' ');

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while (tokens = re.exec(qs)) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }

  return params;
}