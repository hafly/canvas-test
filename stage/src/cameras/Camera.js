import {Object3D} from '../core/Object3D.js';

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

export {Camera};