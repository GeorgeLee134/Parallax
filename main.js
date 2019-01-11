
var amount = 5, size = 100, step = 10, parallax = 10, imageUrl = 'cat.png'

if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', deviceOrientationHandler, false);
  console.log("supported")
}

document.addEventListener("DOMContentLoaded", function () {
  window.mWidth = document.body.clientWidth / 2
  window.mHeight = document.body.clientHeight / 2
  var image = document.getElementById('image')
  var params = getQueryParams(window.location.search)

  amount = params.amount ? params.amount : amount
  size = params.size ? params.size : size
  step = params.step ? params.step : step
  parallax = params.parallax ? params.parallax : parallax
  imageUrl = params.imageUrl ? params.imageUrl : imageUrl

  image.style.backgroundImage = fillArray(`url(${imageUrl})`, amount).join(',')
  image.style.backgroundSize = generateSize(size, step, amount).join(',')
});

window.addEventListener("resize", function () {
  window.mWidth = document.body.clientWidth / 2
  window.mHeight = document.body.clientHeight / 2
})

document.addEventListener("mousemove", function (e) {
  handleMove(e.pageX, e.pageY)
});

function deviceOrientationHandler (e) {
  console.log(e)
}

function handleMove (x, y) {
  let gx = false, gy = false

  var image = document.getElementById('image')

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
  image.style.backgroundPosition = css.join(',')
}

function generatePosition (i, x, y, gx, gy) {
  var level = i / parallax
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