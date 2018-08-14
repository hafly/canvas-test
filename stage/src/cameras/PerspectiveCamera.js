import {Camera} from '../cameras/Camera.js';

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

export {PerspectiveCamera};