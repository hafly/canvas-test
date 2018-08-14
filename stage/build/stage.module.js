var REVISION = '1';

//运算类
var _Math = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    generateUUID: function (len, radix) {
        var CHARS = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
        var chars = CHARS, uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        }
        else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
            uuid[14] = "4";
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join("");
    },

    //限制最小最大值
    clamp: function (value, min, max) {
        return Math.max(min, Math.min(max, value));
    },

    //计算m % n的欧几里得模
    euclideanModulo: function (n, m) {
        return ((n % m) + m) % m;
    },

    //线性插值
    lerp: function (x, y, t) {
        return (1 - t) * x + t * y;
    },

    //平滑值(返回0-1之间的值，该值表示x在最小值和最大值之间移动的百分比，但当x接近最小值和最大值时，则使其平滑或减慢)
    smoothstep: function (x, min, max) {
        if (x <= min) return 0;
        if (x >= max) return 1;
        x = (x - min) / (max - min);
        return x * x * (3 - 2 * x);
    },
    smootherstep: function (x, min, max) {
        if (x <= min) return 0;
        if (x >= max) return 1;
        x = (x - min) / (max - min);
        return x * x * x * (x * (x * 6 - 15) + 10);
    },

    randInt: function (low, high) {
        return low + Math.floor(Math.random() * (high - low + 1));
    },

    randFloat: function (low, high) {
        return low + Math.random() * (high - low);
    },

    // Random float from <-range/2, range/2> interval
    randFloatSpread: function (range) {
        return range * (0.5 - Math.random());
    },

    //角度转弧度
    degToRad: function (degrees) {
        return degrees * _Math.DEG2RAD;
    },

    //弧度转角度
    radToDeg: function (radians) {
        return radians * _Math.RAD2DEG;
    },

    //是否是n的2次幂
    isPowerOfTwo: function (value) {
        return (value & (value - 1)) === 0 && value !== 0;
    }
};

var ColorKeywords = { 'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
    'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
    'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
    'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
    'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
    'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
    'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
    'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
    'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
    'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
    'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
    'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
    'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
    'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
    'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
    'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
    'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
    'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
    'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
    'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
    'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
    'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
    'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
    'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32 };

//颜色类
function Color(r, g, b) {
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;
}

Object.assign(Color.prototype, {
    clone: function () {
        return new this.constructor(this.r, this.g, this.b, this.a);
    },

    copy: function (color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        return this;
    },

    set: function (value) {
        if (value && value.isColor) {
            this.copy(value);
        } else if (typeof value === 'number') {
            this.setHex(value);
        } else if (typeof value === 'string') {
            this.setStyle(value);
        }
        return this;
    },

    setScalar: function (scalar) {
        this.r = scalar;
        this.g = scalar;
        this.b = scalar;

        return this;
    },

    setHex: function (hex) {
        hex = Math.floor(hex);

        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;

        return this;
    },

    setRGB: function (r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;

        return this;
    },

    setHSL: function () {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
            return p;
        }

        return function setHSL(h, s, l) {
            // h,s,l ranges are in 0.0 - 1.0
            h = _Math.euclideanModulo(h, 1);
            s = _Math.clamp(s, 0, 1);
            l = _Math.clamp(l, 0, 1);

            if (s === 0) {
                this.r = this.g = this.b = l;
            } else {
                var p = l <= 0.5 ? l * (1 + s) : l + s - (l * s);
                var q = (2 * l) - p;

                this.r = hue2rgb(q, p, h + 1 / 3);
                this.g = hue2rgb(q, p, h);
                this.b = hue2rgb(q, p, h - 1 / 3);

            }
            return this;
        };
    }(),

    setStyle: function (style) {
        function handleAlpha(string) {
            if (string === undefined) return;

            if (parseFloat(string) < 1) {
                console.warn('THREE.Color: Alpha component of ' + style + ' will be ignored.');
            }
        }

        var m;
        if (m = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(style)) {
            // rgb / hsl
            var color;
            var name = m[1];
            var components = m[2];

            switch (name) {
                case 'rgb':
                case 'rgba':
                    if (color = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
                        // rgb(255,0,0) rgba(255,0,0,0.5)
                        this.r = Math.min(255, parseInt(color[1], 10)) / 255;
                        this.g = Math.min(255, parseInt(color[2], 10)) / 255;
                        this.b = Math.min(255, parseInt(color[3], 10)) / 255;
                        handleAlpha(color[5]);
                        return this;
                    }
                    if (color = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
                        // rgb(100%,0%,0%) rgba(100%,0%,0%,0.5)
                        this.r = Math.min(100, parseInt(color[1], 10)) / 100;
                        this.g = Math.min(100, parseInt(color[2], 10)) / 100;
                        this.b = Math.min(100, parseInt(color[3], 10)) / 100;

                        handleAlpha(color[5]);
                        return this;
                    }
                    break;
                case 'hsl':
                case 'hsla':
                    if (color = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(components)) {
                        // hsl(120,50%,50%) hsla(120,50%,50%,0.5)
                        var h = parseFloat(color[1]) / 360;
                        var s = parseInt(color[2], 10) / 100;
                        var l = parseInt(color[3], 10) / 100;

                        handleAlpha(color[5]);

                        return this.setHSL(h, s, l);
                    }
                    break;
            }
        } else if (m = /^\#([A-Fa-f0-9]+)$/.exec(style)) {
            // hex color
            var hex = m[1];
            var size = hex.length;

            if (size === 3) {
                // #ff0
                this.r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
                this.g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
                this.b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;

                return this;
            } else if (size === 6) {
                // #ff0000
                this.r = parseInt(hex.charAt(0) + hex.charAt(1), 16) / 255;
                this.g = parseInt(hex.charAt(2) + hex.charAt(3), 16) / 255;
                this.b = parseInt(hex.charAt(4) + hex.charAt(5), 16) / 255;

                return this;
            }
        }

        if (style && style.length > 0) {
            // color keywords
            var hex = ColorKeywords[style];

            if (hex !== undefined) {
                // red
                this.setHex(hex);
            } else {
                // unknown color
                console.warn('THREE.Color: Unknown color ' + style);
            }
        }
        return this;
    },

    getHex: function() {
        return (this.r * 255) << 16 ^ (this.g * 255) << 8 ^ (this.b * 255) << 0;
    },

    getHexString: function() {
        return ('000000' + this.getHex().toString(16)).slice(-6);
    },

    getHSL: function(target) {
        // h,s,l ranges are in 0.0 - 1.0
        if (target === undefined) {
            console.warn('THREE.Color: .getHSL() target is now required');
            target = {
                h: 0,
                s: 0,
                l: 0
            };
        }
        var r = this.r,
            g = this.g,
            b = this.b;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var hue, saturation;
        var lightness = (min + max) / 2.0;
        if (min === max) {
            hue = 0;
            saturation = 0;
        } else {
            var delta = max - min;
            saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);
            switch (max) {
                case r:
                    hue = (g - b) / delta + (g < b ? 6 : 0);
                    break;
                case g:
                    hue = (b - r) / delta + 2;
                    break;
                case b:
                    hue = (r - g) / delta + 4;
                    break;
            }
            hue /= 6;
        }
        target.h = hue;
        target.s = saturation;
        target.l = lightness;
        return target;
    },

    getStyle: function() {
        return 'rgb(' + ((this.r * 255) | 0) + ',' + ((this.g * 255) | 0) + ',' + ((this.b * 255) | 0) + ')';
    },

    add: function (color) {
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;
        return this;
    },

    addScalar: function (s) {
        this.r += s;
        this.g += s;
        this.b += s;
        return this;
    },

    sub: function (color) {
        this.r = Math.max(0, this.r - color.r);
        this.g = Math.max(0, this.g - color.g);
        this.b = Math.max(0, this.b - color.b);
        return this;
    },

    multiply: function (color) {
        this.r *= color.r;
        this.g *= color.g;
        this.b *= color.b;
        return this;
    },

    multiplyScalar: function (s) {
        this.r *= s;
        this.g *= s;
        this.b *= s;
        return this;
    },

    lerp: function (color, alpha) {
        this.r += (color.r - this.r) * alpha;
        this.g += (color.g - this.g) * alpha;
        this.b += (color.b - this.b) * alpha;
        return this;
    },

    equals: function (c) {
        return (c.r === this.r) && (c.g === this.g) && (c.b === this.b);
    }
});

//二维向量
function Vector2$1(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

//三维向量
function Vector3(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}

Object.assign(Vector3.prototype, {
    set: function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    },

    //Vector3转屏幕坐标Vector2
    toScreen: function (width, height) {
        var focalLength = 500;    //焦距
        var scale = focalLength / (focalLength + this.z);
        var x = width / 2 + this.x * scale;
        var y = height / 2 + this.y * scale;
        return new Vector2(x, y);
    },
});

//欧拉角
function Euler(x, y, z, order) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.order = order || 'XYZ';
}

//四元素
function Quaternion(x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 1;
}

//事件分发器
function EventDispatcher() {
}

Object.assign(EventDispatcher.prototype, {
    addEventListener: function (type, listener) {
        if (this._listeners === undefined) this._listeners = {};

        var listeners = this._listeners;
        if (listeners[type] === undefined) {
            listeners[type] = [];
        }

        if (listeners[type].indexOf(listener) === -1) {
            listeners[type].push(listener);
        }
    },

    hasEventListener: function (type, listener) {
        if (this._listeners === undefined) return false;

        var listeners = this._listeners;
        return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
    },

    removeEventListener: function (type, listener) {
        if (this._listeners === undefined) return;

        var listeners = this._listeners;
        var listenerArray = listeners[type];

        if (listenerArray !== undefined) {
            var index = listenerArray.indexOf(listener);
            if (index !== -1) {
                listenerArray.splice(index, 1);
            }
        }
    },

    /**
     * 调度到事件流中的 Event 对象。如果正在重新调度事件，则会自动创建此事件的一个克隆。在调度了事件后，其 target 属性将无法更改，因此您必须创建此事件的一个新副本以能够重新调度。
     * @param event Object {type:event}
     */
    dispatchEvent: function (event) {
        if (this._listeners === undefined) return;

        var listeners = this._listeners;
        var listenerArray = listeners[event.type];

        if (listenerArray !== undefined) {
            event.target = this;
            var array = listenerArray.slice(0);
            for (var i = 0, l = array.length; i < l; i++) {
                array[i].call(this, event);
            }
        }
    }
});

var object3DId = 0;

//3D对象类，包含位置、旋转、缩放等信息
function Object3D() {
    Object.defineProperties(this, {
        'id': {value: object3DId++},
        'uuid': {value: _Math.generateUUID()},
        'isObject3D': {value: true}
    });
    this.type = 'Object3D';

    this.name = '';
    this.parent = null;
    this.children = [];

    this.up = new Vector3(0, 1, 0);
    this.position = new Vector3();
    this.rotation = new Euler();
    this.quaternion = new Quaternion();
    this.scale = new Vector3(1, 1, 1);
    this.userData = {};
}

Object3D.prototype = Object.assign(Object.create(EventDispatcher.prototype), {
    constructor: Object3D,
    //添加子对象
    add: function (object) {
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
            return this;
        }

        if (object === this) {
            console.error("THREE.Object3D.add: object can't be added as a child of itself.", object);
            return this;
        }

        if ((object && object.isObject3D)) {
            if (object.parent !== null) {
                object.parent.remove(object);
            }
            object.parent = this;
            object.dispatchEvent({type: 'added'});

            this.children.push(object);
        } else {
            console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", object);
        }
        return this;
    },

    //移除子对象
    remove: function (object) {
        if (arguments.length > 1) {
            for (var i = 0; i < arguments.length; i++) {
                this.remove(arguments[i]);
            }
            return this;
        }

        var index = this.children.indexOf(object);
        if (index !== -1) {
            object.parent = null;
            object.dispatchEvent({type: 'removed'});
            this.children.splice(index, 1);
        }
        return this;
    },

    getObjectById: function (id) {
        return this.getObjectByProperty('id', id);
    },

    getObjectByName: function (name) {
        return this.getObjectByProperty('name', name);
    },

    getObjectByProperty: function (name, value) {
        if (this[name] === value) return this;
        for (var i = 0, l = this.children.length; i < l; i++) {
            var child = this.children[i];
            var object = child.getObjectByProperty(name, value);

            if (object !== undefined) {
                return object;
            }
        }
        return undefined;
    },
});

//相机
function Camera() {
    Object3D.call(this);
    this.type = 'Camera';
}

Camera.prototype = Object.assign(Object.create(Object3D.prototype), {
    constructor: Camera,
    isCamera: true,

    copy: function (source, recursive) {
        Object3D.prototype.copy.call(this, source, recursive);
        this.matrixWorldInverse.copy(source.matrixWorldInverse);
        this.projectionMatrix.copy(source.projectionMatrix);

        return this;
    },

    clone: function () {
        return new this.constructor().copy(this);
    }
});

//透视相机
function PerspectiveCamera(fov, aspect, near, far) {
    Camera.call(this);
    this.type = 'PerspectiveCamera';
    this.fov = fov || 70;
    this.aspect = aspect || 1;
    this.near = near || 1;
    this.far = far || 1000;
}

PerspectiveCamera.prototype = Object.assign(Object.create(Camera.prototype), {
    constructor: PerspectiveCamera,
    isPerspectiveCamera: true,
});

//canvas渲染器
function CanvasRenderer() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.clearColor = '#000000';    //背景色
}

Object.assign(CanvasRenderer.prototype, {
    //获取中心点
    getCenter: function () {
        return new Vector2$1(this.canvas.width / 2, this.canvas.height / 2);
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

export { _Math as Math, Color, Vector2$1 as Vector2, Vector3, Euler, Quaternion, EventDispatcher, Object3D, Camera, PerspectiveCamera, CanvasRenderer, REVISION };
