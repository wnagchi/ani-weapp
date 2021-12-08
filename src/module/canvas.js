export default class AniCanvas {
  id = null;
  canvasNode = null;
  canvas = null;
  ctx = null;
 
  textDefafult = {
    x: 0,
    y: 0,
    color: "#000000",
    font: 16,
    maxWidth: "",
    space: 2,
  };
  constructor(id) {
    return (async () => {
      this.id = id;
      await this.creatCanvas2d();
      return this;
    })();
  }
  creatCanvas2d() {
    return new Promise((res) => {
      wx.createSelectorQuery()
        .select("#" + this.id)
        .fields({
          node: true,
          size: true,
        })
        .exec((e) => {
          this.initCanvas(e);
          res();
        });
    });
  }

  initCanvas(canvasNode) {
    this.canvasNode = canvasNode;
    this.canvas = canvasNode[0].node;
    this.ctx = this.canvas.getContext("2d");
    this.setDpr();
  }

  setDpr(scale) {
    const dpr = scale || wx.getSystemInfoSync().pixelRatio;
    this.canvas.width = this.canvasNode[0].width * dpr;
    this.canvas.height = this.canvasNode[0].height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  setBg(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      0,
      0,
      this.canvasNode[0].width,
      this.canvasNode[0].height
    );
  }

  setImage(url, left, top, width, height) {
    return new Promise((res) => {
      const img = this.canvas.createImage();
      img.src = url;
      img.onload = (e) => {
        let { naturalHeight, naturalWidth } = e.path[0];
        let baseHeight = (width / naturalWidth) * naturalHeight;
        this.ctx.drawImage(img, left, top, width, height | baseHeight);
        res({
          endTop: top + (height | baseHeight),
          endLeft: left + width,
          img: e,
        });
      };
    });
  }

  getTextArr(text, maxWidth, maxLine) {
    const textWidth = this.ctx.measureText(text);
    if (!maxWidth) {
      return {
        textArr: [text],
        allWidth: textWidth.width,
        fontHeight: textWidth.fontBoundingBoxAscent,
      };
    }
    const arr = [];
    const textIndexArr = textWidth.advances.reduce((old, cur, index) => {
      let indexArr = old || [];
      if (cur > maxWidth * (indexArr.length + 1)) {
        indexArr.push(index);
      }
      return indexArr;
    });
    textIndexArr.forEach((x, i) => {
      arr.push(text.substring(textIndexArr[i - 1] || 0, x));
    });
    arr.push(
      text.substring(textIndexArr[textIndexArr.length - 1], text.length)
    );
    return {
      textArr: arr,
      allWidth: textWidth.width,
      fontHeight: textWidth.fontBoundingBoxAscent,
    };
  }

  setText(...args) {
    const argArr = [...args];
    if (Object.prototype.toString.call(argArr[0]) == "[object Object]") {
      let text = argArr[0].text;
      if (!text) {
        throw new Error("未定义文字");
      }

      this.ctx.font = `${argArr[0].fontSize || 16}px normal`;
      this.ctx.fillStyle = argArr[0].color || "#000000";

      text = this.getTextArr(text, argArr[0].maxWidth);
      text.textArr.forEach((x, i) => {
        this.ctx.fillText(
          x,
          argArr[0].x || 0,
          (argArr[0].y || 0) + i * (text.fontHeight + (argArr[0].space || 0))
        );
      });
    }
    console.log(argArr);
    // typeof (...args[0])
  }
}
