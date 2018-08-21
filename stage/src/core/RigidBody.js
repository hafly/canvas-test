function RigidBody() {
    this.mass = 1;              //质量
    this.useGravity = true;     //使用重力
    this.acc = 9.8;             //加速度
    this.drag = 0.1;            //平移阻力
    this.angularDrag = 0.05;    //角阻力
    this.bounce = 0.6;          //弹性系数
    this.isCollider = true;     //是否是碰撞体
    this.dt = 100 / 1000;
    this.pm = Math.pow(this.dt, 2) * this.acc;
}

Object.assign(RigidBody.prototype, {
    checkCollider: function (p, canvas) {
        // var y = p.position.y,
        //     x = p.position.x;

        //当碰撞到上下边界

        if (p.position.y >= canvas.height - p.radius || p.position.y <= p.radius) {
            p.velocity.y *= this.bounce * -1;

            p.position.y = p.position.y < p.radius ? p.radius : (canvas.height - p.radius);

            //平移摩擦力
            if (p.velocity.x > 0) {
                p.velocity.x = Math.abs(p.velocity.x -= this.drag * this.dt);
            }
            else if (p.velocity.x < 0) {
                p.velocity.x = -Math.abs(p.velocity.x += this.drag * this.dt);
            }

            //清除移动y
            if (Math.abs(p.velocity.y) < 0.1) p.velocity.y = 0;
        }

        //当碰撞到左右边界
        if (p.position.x > canvas.width - p.radius || p.position.x < p.radius) {
            p.position.x = p.position.x < p.radius ? p.radius : (canvas.width - p.radius);
            p.velocity.x *= this.bounce * -1;

            //清除移动x
            if (Math.abs(p.velocity.x) < 0.1) p.velocity.x = 0;
        }

        // p.position.x = x;
        // p.position.y = y;
    },

    freeFall: function (p) {
        p.velocity.y += this.pm;
    }
});

export {RigidBody};