// 임계값을 기준으로 0아니면 1로 표현

var b = document.getElementById('t')
var imgElement = document.getElementsByClassName('input');

var outputElement = document.getElementsByClassName('output');

function onOpenCvReady() {
  document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
}
