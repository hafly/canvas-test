import {Color} from '../math/Color.js';

/**
 * 粒子
 * @param position  位置
 * @param velocity  方向
 * @param life      生命周期
 * @param color     颜色
 * @param radius    尺寸
 */
function Particle(position, velocity, life, color, radius) {
    this.position = position;
    this.velocity = velocity;
    this.life = life || 1;
    this.color = color || new Color(Math.random(), Math.random(), Math.random());
    this.radius = radius || 5;
    this.age = 0;
    this.fadeOut = false;
    this.rigidBody = null;

};

Object.assign(Particle.prototype, {
    render: function (ctx) {
        var p = this;
        var alpha = 1;
        if (this.fadeOut) {
            alpha = 1 - p.age / p.life;
        }
        ctx.fillStyle = "rgba("
            + Math.floor(p.color.r * 255) + ","
            + Math.floor(p.color.g * 255) + ","
            + Math.floor(p.color.b * 255) + ","
            + alpha.toFixed(2) + ")";
        ctx.beginPath();
        ctx.arc(p.position.x, p.position.y, p.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
});

export {Particle};