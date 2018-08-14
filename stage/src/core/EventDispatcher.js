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

export {EventDispatcher};