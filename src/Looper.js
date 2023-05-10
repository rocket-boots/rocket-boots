const NOOP = () => {};

class Looper {
	constructor(a) {
		this.loopHook = (typeof a === 'function') ? a : NOOP;
		this.lastTime = performance.now();
		this.isStopped = true;
	}

	set(fn) {
		this.loopHook = fn;
		return this;
	}

	next() {
		if (this.isStopped) return;
		const now = performance.now();
		const t = now - this.lastTime;
		this.lastTime = now;
		this.loopHook(t);
		requestAnimationFrame(() => this.next());
	}

	start() {
		this.isStopped = false;
		this.lastTime = performance.now();
		this.next();
		return this;
	}

	stop() {
		this.isStopped = true;
	}
}

export default Looper;
