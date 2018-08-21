//粒子系统
function ParticleSystem() {
    this.particles = [];
}

Object.assign(ParticleSystem.prototype, {
    emit: function (particle) {
        this.particles.push(particle);
    },
    render: function (renderer) {
        var self = this;

        self.particles.forEach(function (p, i) {
            //重力
            if (p.rigidBody.useGravity) {
                p.rigidBody.freeFall(p);
            }

            p.position.addVectors(p.position, p.velocity);

            //碰撞体
            if (p.rigidBody.isCollider) {
                p.rigidBody.checkCollider(p, renderer.canvas);
            }

            p.render(renderer.context);

            p.age += 0.01;
            if (p.age >= p.life) self.kill(i);
        });
    },
    kill: function (index) {
        if (this.particles.length > 1)
            this.particles[index] = this.particles[this.particles.length - 1];
        this.particles.pop();
    }
});

export {ParticleSystem};