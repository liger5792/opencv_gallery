// 임계값을 기준으로 0아니면 1로 표현

var b = document.getElementById('t')
var imgElement = document.getElementsByClassName('input');

var outputElement = document.getElementsByClassName('output');




function tophat_temp(inp, oup) {
  let src = cv.imread(inp);
  cv.cvtColor(src, src, cv.COLOR_RGBA2RGB);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(2, 2, cv.CV_8U);
  // You can try more different parameters
  cv.morphologyEx(src, dst, cv.MORPH_GRADIENT, M);
  // cv.morphologyEx(dst, dst, cv.MORPH_CLOSE, M);
  cv.imshow(oup, dst);
  src.delete();
  dst.delete();
  M.delete();
}

function clahe(inp, oup) {
  let src = cv.imread(inp);
  let equalDst = new cv.Mat();
  let claheDst = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.equalizeHist(src, equalDst);
  let tileGridSize = new cv.Size(8, 8);
  // You can try more different parameters
  let clahe = new cv.CLAHE(40, tileGridSize);
  clahe.apply(src, claheDst);
  cv.imshow(oup, claheDst);
  src.delete();
  equalDst.delete();
  claheDst.delete();
  clahe.delete();
}

function histoequal(inp, oup) {
  let src = cv.imread(inp);
  let dst = new cv.Mat(); //failed
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.equalizeHist(src, dst);
  // cv.cvtColor(dst, dst, cv.COLOR_YUV2RGB, 0);
  cv.imshow(oup, dst);
  src.delete();
  dst.delete();
}


function tophat2(inp, oup) {
  // let src = cv.imread(inp);
  // cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
  // let dst = new cv.Mat();
  // let M = cv.Mat.ones(2, 2, cv.CV_32S);
  // // // You can try more different parameters
  // cv.morphologyEx(src, dst, cv.MORPH_GRADIENT, M);
  // cv.adaptiveThreshold(src, dst, 800, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 31, 2);
  // cv.imshow(oup, dst);
  // src.delete();
  // dst.delete();
  // M.delete();
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  let src = cv.imread(inp);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(8, 8, cv.CV_32S);
  // // You can try more different parameters
  cv.adaptiveThreshold(src, dst, 800, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 31, 6);
  cv.imshow(oup, dst);
  src.delete();
  dst.delete();
  M.delete();
}

function split(inp, oup) {
  let src = cv.imread(inp);
  let rgbaPlanes = new cv.MatVector();
  // Split the Mat
  cv.split(src, rgbaPlanes);
  // Get R channel
  let R = rgbaPlanes.get(0);
  // Merge all channels
  // cv.threshold(R, R, 177, 255, cv.THRESH_BINARY);

  cv.merge(rgbaPlanes, src);
  cv.equalizeHist(R, R);
  cv.imshow(oup, R)
  src.delete();
  rgbaPlanes.delete();
  // R.delete();
}


function showhist(inp, oup) {
  let src = cv.imread(inp);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  let srcVec = new cv.MatVector();
  srcVec.push_back(src);
  let accumulate = false;
  let channels = [0];
  let histSize = [256];
  let ranges = [0, 255];
  let hist = new cv.Mat();
  let mask = new cv.Mat();
  let color = new cv.Scalar(255, 255, 255);
  let scale = 2;
  // You can try more different parameters
  cv.calcHist(srcVec, channels, mask, hist, histSize, ranges, accumulate);
  let result = cv.minMaxLoc(hist, mask);
  let max = result.maxVal;
  let dst = new cv.Mat.zeros(src.rows, histSize[0] * scale,
    cv.CV_8UC3);
  // draw histogram
  for (let i = 0; i < histSize[0]; i++) {
    let binVal = hist.data32F[i] * src.rows / max;
    let point1 = new cv.Point(i * scale, src.rows - 1);
    let point2 = new cv.Point((i + 1) * scale - 1, src.rows - binVal);
    cv.rectangle(dst, point1, point2, color, cv.FILLED);
  }
  cv.imshow(oup, dst);
  src.delete();
  dst.delete();
  srcVec.delete();
  mask.delete();
  hist.delete();
}

function contour_most(inp, oup) {
  let src = cv.imread(inp);
  let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);

  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(src, src, 177, 255, cv.THRESH_BINARY);

  // let contours = new cv.MatVector();
  // let hierarchy = new cv.Mat();
  // cv.findContours(src, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

  // let cnt = contours.get(0);
  // You can try more different parameters
  // let rect = cv.boundingRect(cnt);
  // let contoursColor = new cv.Scalar(255, 255, 255);
  // let rectangleColor = new cv.Scalar(255, 0, 0);
  // cv.drawContours(dst, contours, 0, contoursColor, 1, 8, hierarchy, 100);
  // let point1 = new cv.Point(rect.x, rect.y);
  // let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
  // cv.rectangle(dst, point1, point2, rectangleColor, 2, cv.LINE_AA, 0);
  cv.imshow(oup, src);
  src.delete();;
}


function tophat(inp, oup) {
  let src = cv.imread(inp);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
  let dst = new cv.Mat();
  let dst2 = new cv.Mat();
  let M = cv.Mat.ones(2, 2, cv.CV_32S);
  // You can try more different parameters
  cv.morphologyEx(src, dst, cv.MORPH_TOPHAT, M);
  // M = cv.Mat.ones(2, 2, cv.CV_32S);
  let anchor = new cv.Point(-1, -1);
  // cv.dilate(dst, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());

  // cv.bitwise_not(dst, dst2)
  cv.imshow(oup, dst);
  src.delete();
  dst.delete();
  M.delete();

}

function dilate(inp, oup) {
  let src = cv.imread(inp);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(2, 2, cv.CV_32S);
  let anchor = new cv.Point(-1, -1);
  // You can try more different parameters
  cv.dilate(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
  cv.imshow(oup, dst);
  src.delete();
  dst.delete();
  M.delete();

}

function erode(inp, oup) {
  let src = cv.imread(inp);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(2, 2, cv.CV_32S);
  let anchor = new cv.Point(-1, -1);
  // You can try more different parameters
  cv.erode(src, dst, M, anchor, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
  cv.imshow(oup, dst);
  src.delete();
  dst.delete();
  M.delete();
}

function gray(inp, oup) {
  let src = cv.imread(inp);
  let dst = new cv.Mat();

  // You can try more different parameters
  cv.cvtColor(src, dst, cv.COLOR_BGRA2GRAY, 0);
  let val = 0;
  val = cv.mean(dst)
  // console.log(val[0])
  // if(val[0] < 100){
     // cv.bitwise_not(dst, dst)
  // }
  cv.imshow(oup, dst);
  src.delete();
  dst.delete();

}

function gray2(inp, oup) {
  let src = cv.imread(inp);
  let dst = new cv.Mat();
  // You can try more different parameters
  cv.cvtColor(src, dst, cv.COLOR_BGRA2GRAY, 0);
  let val = 0;
  val = cv.mean(dst)
  if(val[0] < 100){
     cv.bitwise_not(dst, dst)
  }
  cv.imshow(oup, dst);
  src.delete();
  dst.delete();

}
function adaptive(inp, oup) {

  let src = cv.imread(inp);
  let dst = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  // You can try more different parameters
  cv.adaptiveThreshold(src, dst, 200, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 3, 2);
  cv.imshow(oup, dst);
  src.delete();
  dst.delete();
}

function gradient(inp, oup) {

  let src = cv.imread(inp);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(2, 2, cv.CV_32S);
  // // You can try more different parameters
  cv.morphologyEx(src, dst, cv.MORPH_GRADIENT, M);
  cv.imshow(oup, dst);
  src.delete();
  dst.delete();
  M.delete();
}

function blur(inp, oup) {
  let src = cv.imread(inp);
  let dst = new cv.Mat();
  let ksize = new cv.Size(3, 3);
  let anchor = new cv.Point(-1, -1);
  // You can try more different parameters
  cv.blur(src, dst, ksize, anchor, cv.BORDER_DEFAULT);
  cv.boxFilter(src, dst, -1, ksize, anchor, true, cv.BORDER_DEFAULT)
  cv.imshow(oup, dst);
  src.delete();
  dst.delete();
}

function gob(inp, oup) {
  let src = cv.imread(inp);
  let dst = new cv.Mat();
  let ksize = new cv.Size(3, 3);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.adaptiveThreshold(src, src, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 31, 2);
  M = cv.getStructuringElement(cv.MORPH_ELLIPSE, ksize);
  cv.morphologyEx(src, src, cv.MORPH_CLOSE, M);
  cv.dilate(src, dst, M);
  cv.imshow(oup, src);
  src.delete();
  dst.delete();
}

function grabcut(inp, oup) {
  let src = cv.imread(inp);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  let mask = new cv.Mat();
  let bgdModel = new cv.Mat();
  let fgdModel = new cv.Mat();
  let rect = new cv.Rect(0);
  cv.grabCut(src, mask, rect, bgdModel, fgdModel, 1, cv.GC_INIT_WITH_RECT);
  // draw foreground
  for (let i = 0; i < src.rows; i++) {
    for (let j = 0; j < src.cols; j++) {
      if (mask.ucharPtr(i, j)[0] == 0 || mask.ucharPtr(i, j)[0] == 2) {
        src.ucharPtr(i, j)[0] = 0;
        src.ucharPtr(i, j)[1] = 0;
        src.ucharPtr(i, j)[2] = 0;
      }
    }
  }
  // draw grab rect
  let color = new cv.Scalar(0, 0, 255);
  let point1 = new cv.Point(rect.x, rect.y);
  let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
  cv.rectangle(src, point1, point2, color);
  cv.imshow(oup, src);
  src.delete();
  mask.delete();
  bgdModel.delete();
  fgdModel.delete();

}

function contour(inp, oup) {
  let src = cv.imread(inp);
  let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(src, src, 177, 200, cv.THRESH_BINARY);
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(src, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

  let cnt = contours.get(0);
  // You can try more different parameters
  let rect = cv.boundingRect(cnt);
  let contoursColor = new cv.Scalar(255, 255, 255);
  let rectangleColor = new cv.Scalar(255, 0, 0);
  cv.drawContours(dst, contours, 0, contoursColor, 1, 8, hierarchy, 100);
  // let point1 = new cv.Point(rect.x, rect.y);
  // let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
  // cv.rectangle(dst, point1, point2, rectangleColor, 2, cv.LINE_AA, 0);
  cv.imshow(oup, src);
  src.delete();
  dst.delete();
  contours.delete();
  hierarchy.delete();
  cnt.delete();


}

function tophat_most(inp, oup) {
  let src = cv.imread(inp);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
  let dst = new cv.Mat(); //
  let M = cv.Mat.ones(2, 2, cv.CV_32S);
  cv.adaptiveThreshold(src, dst, 800, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 31, 2);

  cv.imshow(oup, dst);
  src.delete();
  dst.delete();
  // M.delete();
}

function tophat2_(inp, oup) {
  let src = cv.imread(inp);
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
  let dst = new cv.Mat();
  let M = cv.Mat.ones(2, 2, cv.CV_8U);
  // You can try more different parameters
  // cv.morphologyEx(src, src, cv.MORPH_GRADIENT, M);
  cv.morphologyEx(src, src, cv.MORPH_TOPHAT, M);
  cv.imshow(oup, src);
  src.delete();
  dst.delete();
  M.delete();
}

function object(inp, oup) {
  let src = cv.imread(inp);
  let lower_orange = new cv.Mat(src.rows, src.cols, src.type(), [0, 150, 150, 150])
  console.log(src.type())
  let upper_orange = new cv.Mat(src.rows, src.cols, src.type(), [255, 255, 255, 255])
  // let lower_green = (30, 80, 80)
  // let upper_green = (70, 255, 255)
  // let lower_blue = (0, 180, 55)
  // let upper_blue = (20, 255, 200)

  // cv.cvtColor(src,src, cv.COLOR_RGB2HSV)
  cv.inRange(src, lower_orange, upper_orange, src)
  // cv.bitwise_not(src, src)
  cv.imshow(oup, src)
  src.delete();
  lower_orange.delete();
  upper_orange.delete();
}

function sobelx(inp, oup) {
  let src = cv.imread(inp);
  let dstx = new cv.Mat();
  let dsty = new cv.Mat();
  cv.cvtColor(src, src, cv.COLOR_RGB2GRAY, 0);
  // You can try more different parameters
  cv.Sobel(src, dstx, cv.CV_8U, 1, 0, 3, 1, 0,cv.BORDER_CONSTANT);
  cv.Sobel(src, dsty, cv.CV_8U, 0, 1, 3, 1, 0, cv.BORDER_CONSTANT);

  cv.add(dstx, dsty, src)
  cv.bitwise_not(src, src)
  cv.imshow(oup, src);
  src.delete();
  dstx.delete();
  dsty.delete();

}
b.addEventListener('click', function(e) {
  for (let i = 0; i < imgElement.length; i++) {
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    // tophat_most(imgElement[i].id, "o" + String(i) + "tophat_most")

    // sobelx(imgElement[i].id, "o" + String(i) + "sobelx")
    // tophat(imgElement[i].id, "o" + String(i) + "tophat")
    // tophat2_(imgElement[i].id, "o" + String(i) + "tophat2_")


    // tophat_temp(imgElement[i].id, "o" + String(i) + "tophat_temp")
    gray(imgElement[i].id, "o" + String(i) + "gray")
    gray2(imgElement[i].id, "o" + String(i) + "gray2")

    // tophat2_(imgElement[i].id, "o" + String(i) + "tophat2_")
    // gray(imgElement[i].id, "o" + String(i) + "gray")
    // grabcut(imgElement[i].id, "o" + String(i) + "grabcut")
    // split(imgElement[i].id, "o" + String(i) + "split")
    // showhist(imgElement[i].id, "o" + String(i) + "showhist")
    // contour_most(imgElement[i].id, "o" + String(i) + "contour_most")
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    // gob(imgElement[i].id, "o" + String(i) + "gob")

  }
});

function onOpenCvReady() {
  document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
}
