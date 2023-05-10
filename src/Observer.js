class Observer {
	constructor() {
		this.eventListeners = {};
	}

	/** Add event, analogous to `addEventListener` and jQuery's `on` */
	on(eventTypeName, listener) {
		let eventListenerSet = this.eventListeners[eventTypeName];
		if (!eventListenerSet) {
			this.eventListeners[eventTypeName] = new Set();
			eventListenerSet = this.eventListeners[eventTypeName];
		}
		eventListenerSet.add(listener);
	}

	/** Remove event, analogous to `removeEventListener` and jQuery's `off` */
	off(eventTypeName, listener) {
		const eventListenerSet = this.eventListeners[eventTypeName];
		if (!eventListenerSet) return;
		eventListenerSet.delete(listener);
	}

	/** Trigger an event */
	trigger(eventTypeName, data) {
		const eventListenerSet = this.eventListeners[eventTypeName];
		if (!eventListenerSet) return;
		eventListenerSet.forEach((listener) => listener(data));
	}
}

export default Observer;
