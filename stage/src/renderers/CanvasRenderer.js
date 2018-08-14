import {Vector2} from '../math/Vector2.js';

//canvas渲染器
function CanvasRenderer() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.clearColor = '#000000';    //背景色
}

Object.assign(CanvasRenderer.prototype, {
    //获取中心点
    getCenter: function () {
        return new Vector2(this.canvas.width / 2, this.canvas.height / 2);
    },

    //设置背景色
    setClearColor: function (color) {
        this.bgColor = color;
        return this;
    },

    //设置画布尺寸
    setSize: function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        return this;
    },

    //设置绘图的当前 alpha
    setOpacity: function (alpha) {
        this.context.globalAlpha = alpha;
        return this;
    },

    //设置线条宽度
    setLineWidth: function (value) {
        this.context.lineWidth = value;
        return this;
    },

    //设置线条结尾线帽
    setLineCap: function (value) {
        // "butt", "round", "square"
        this.context.lineCap = value;
        return this;
    },

    //设置边角的类型
    setLineJoin: function (value) {
        // "round", "bevel", "miter"
        this.context.lineJoin = value;
        return this;
    },

    //画虚线
    setLineDash: function (array) {
        this.context.setLineDash(array);
        return this;
    },

    //设置或返回用于填充绘画的颜色、渐变或模式
    setFillStyle: function (value) {
        this.context.fillStyle = value;
        return this;
    },

    //设置或返回用于笔触的颜色、渐变或模式。
    setStrokeStyle: function (value) {
        this.context.strokeStyle = value;
        return this;
    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
});

export {CanvasRenderer};