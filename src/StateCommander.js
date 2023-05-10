import { KeyboardCommander } from 'keyboard-commander';

import Observer from './Observer.js';

// TODO: Copy functionality from
//  https://github.com/rocket-boots/rocket-boots/blob/master/scripts/rocketboots/StateMachine.js

class StateCommander extends Observer {
	constructor(options = {}) {
		super();
		this.allowUndefinedStates = false;
		this.currentState = null;
		this.states = (typeof options.states === 'object' && options.states) ? { ...options.states } : {};
		this.kbCommander = new KeyboardCommander();
		this.commandListener = (c) => this.handleCommand(c);
		this.missingListener = (c) => console.log('>', c, '< (missing)'); // eslint-disable-line no-console
		this.setupKeyboardCommander();
	}

	removeKeyboardCommander() {
		this.kbCommander.off('command', this.commandListener);
		this.kbCommander.off('missingCommand', this.missingListener);
		this.kbCommander.unmount();
	}

	setupKeyboardCommander() {
		this.removeKeyboardCommander();
		this.kbCommander.mount();
		this.kbCommander.on('command', this.commandListener);
		this.kbCommander.on('missingCommand', this.missingListener);
	}

	warn(...args) { console.warn(...args); } // eslint-disable-line class-methods-use-this, no-console

	getState(stateName = this.currentState) {
		return this.states[stateName];
	}

	setState(stateArg1, stateArg2) {
		const name = (typeof stateArg1 === 'object' && stateArg1.name) ? stateArg1.name : stateArg1;
		if (!name) throw new Error('Name is required for the state');
		let stateObj = {};
		if (typeof stateArg2 === 'object') stateObj = stateArg2;
		else if (typeof stateArg1 === 'object') stateObj = stateArg1;
		stateObj = { name, ...stateObj };
		this.states[name] = stateObj;
	}

	async startState(stateName = this.currentState) {
		const s = this.getState(stateName);
		if (!s) throw new Error(`No state (${stateName}) found`);
		this.currentState = stateName;
		this.kbCommander.setMapping(s.keyboardMapping || s.kbMapping || s.kb || {});
		if (typeof s.start === 'function') {
			await s.start(this, stateName);
		}
		this.trigger('startState', stateName);
	}

	async stopState(stateName = this.currentState) {
		if (stateName === null) return;
		if (stateName === this.currentState) this.currentState = null;
		else this.warn(`Stopping a state (${stateName}) that is not the current state.`);
		const s = this.getState(stateName);
		if (!s) throw new Error(`No state (${stateName}) found`);
		this.kbCommander.setMapping({});
		if (typeof s.stop === 'function') {
			await s.stop(this, stateName);
		}
		this.trigger('stopState', stateName);
	}

	async transition(newStateName) {
		await this.stopState(this.currentState);
		if (!this.states[newStateName]) {
			if (this.allowUndefinedStates) {
				this.states[newStateName] = {};
			} else {
				throw new Error(`Unknown state ${newStateName}`);
			}
		}
		await this.startState(newStateName);
	}

	handleCommand(command) {
		this.trigger('command', command);
	}
}

export default StateCommander;
