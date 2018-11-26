require('./gif.js');
(function (window) {
  var screenShotImages = [];
  function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(',');
    var mime = arr[ 0 ].match(/:(.*?);/)[ 1 ];
    var bstr = atob(arr[ 1 ]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[ n ] = bstr.charCodeAt(n);
    }
    return new Blob([ u8arr ], {
      type: mime
    });
  }

  /**
   * 截取视频画面
   * @param width int 可选
   * @param height int 可选
   * @return blob
   **/
  function drawImage(width, height) {
    var canvas = document.createElement('canvas');
    canvas.width = width || this.offsetWidth;
    canvas.height = height || this.offsetHeight;
    var cxt = canvas.getContext("2d");
    cxt.drawImage(this, 0, 0, this.offsetWidth, this.offsetHeight, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL();
    return dataURLtoBlob(dataURL);
  }

  function createImage(blob, width, height) {
    var img = document.createElement('img');
    if (width) {
      img.setAttribute('width', width + 'px');
    }
    if (height) {
      img.setAttribute('height', height + 'px');
    }
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = window.URL.createObjectURL(blob);
    screenShotImages.push(img);
    return img;
  }

  function getImages() {
    return screenShotImages;
  }

  function removeImages() {
    screenShotImages = [];
  }

  function createGif(imageElementList, options, callback) {
    var config = Object.assign({}, { workers: 2, quality: 10 }, options)
    var gif = new window.GIF(config);
    imageElementList.forEach(imageElement => {
      gif.addFrame(imageElement, { delay: config.delay || 500, copy: config.copy || false, dispose: config.dispose||-1});
    });
    gif.on('finished', function (blob) {
      callback(blob);
    });
    gif.render();
    return gif;
  }

  /**
   *
   * @param v video
   * @param w int
   * @param h int
   **/
  function screenshot(v, width, height) {
    if (!v.getPoster) {
      v.getPoster = drawImage;
    }
    return v.getPoster(width, height);
  }

  window.ImageUtils = {
    dataURLtoBlob: dataURLtoBlob,
    drawImage: drawImage,
    createImage: createImage,
    screenshot: screenshot,
    createGif: createGif,
    getImages: getImages,
    removeImages: removeImages
  }
})(window);