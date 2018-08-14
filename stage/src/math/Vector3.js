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

export {Vector3};