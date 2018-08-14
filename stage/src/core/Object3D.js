import {_Math} from '../math/Math.js';
import {Euler} from '../math/Euler.js';
import {Vector3} from '../math/Vector3.js';
import {Quaternion} from '../math/Quaternion.js';
import {EventDispatcher} from './EventDispatcher.js';

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

export {Object3D};