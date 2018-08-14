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

export {_Math};