// const VOICE_RATES = [0.5, 1, 1, 1, 1.5, 1.75];
// const VOICE_PITCHES = [0.1, 0.4, 0.5, 0.6, 0.7, 0.8, 1, 1, 1, 1.5, 2];
const VOICE_NAMES = {
	David: 'Microsoft David - English (United States)',
	Mark: 'Microsoft Mark - English (United States)',
	Zira: 'Microsoft Zira - English (United States)',
	Olivia: 'Google US English', // Female
	Lily: 'Google UK English Female',
	Jack: 'Google UK English Male',
};

class Speaker {
	constructor(options = {}) {
		const {
			rate = 1,
			pitch = 1,
			voice = 0,
		} = options;
		// Dependencies
		this.setTimeout = window.setTimeout;
		this.speechSynthesis = window.speechSynthesis;
		this.SpeechSynthesisUtterance = window.SpeechSynthesisUtterance;
		// Properties
		this.voiceList = [];
		this.voice = Speaker.findVoice(voice);
		this.rate = rate;
		this.pitch = pitch;
		// TODO: Is there a better way to set this up?
		this.speechSynthesis.onvoiceschanged = () => {
			this.voice = Speaker.findVoice(voice);
		};
	}

	static warn(...args) {
		console.warn(...args); // eslint-disable-line no-console
	}

	static findVoice(param, synth = window.speechSynthesis) {
		if (typeof param === 'string') {
			return Speaker.findVoiceByName(param, synth);
		}
		if (typeof param === 'number') {
			return Speaker.getVoiceByIndex(param, synth);
		}
		if (typeof param === 'object') {
			// Assume that this is a SpeechSynthesisVoice object
			// TODO: Maybe allow a voiceParam that's a non-SpeechSynthesisVoice object
			// to allow looking up of voices by gender, language, etc.
			return param;
		}
		Speaker.warn('Could not find voice', param, 'so using default of first voice');
		return Speaker.getVoiceByIndex(0, synth);
	}

	/**
	 * Find a voice by name
	 * @param {String} name - Can be the long name of the voice or a short, abbreviated name
	 * @param {Object} synth - window.speechSynthesis
	 * @returns SpeechSynthesisVoice
	 */
	static findVoiceByName(name, synth = window.speechSynthesis) {
		const allVoices = Speaker.getVoices(synth);
		const found = allVoices.find((voice) => (voice.name === name));
		if (found) return found;
		const longName = VOICE_NAMES[name];
		if (!longName) return undefined;
		return allVoices.find((voice) => (voice.name === longName));
	}

	/**
	 * Get all voices that are offered
	 * @param {speechSynthesis} synth
	 * @returns SpeechSynthesisVoice
	 */
	static getVoices(synth = window.speechSynthesis) {
		// TODO: Make this async and wait for onvoiceschanged?
		return synth.getVoices();
	}

	static getEnglishVoices(synth = window.speechSynthesis) {
		return Speaker.getVoices(synth).filter((voice) => (voice.lang.substring(0, 1) === 'en'));
	}

	static getVoiceByIndex(i, synth = window.speechSynthesis) {
		const voices = Speaker.getVoices(synth);
		return voices[i];
	}

	static computerSpeak(text, synth = window.speechSynthesis) {
		synth.cancel();
		Speaker.speak(text, 0, 0.3, 1.5);
	}

	static getSilenceTag(silenceMs = 0) {
		// NOTE: This only seems to work with David and Mark
		return `<silence msec="${Number(silenceMs)}" />`;
	}

	static joinArray(array = []) {
		return array.map((item) => {
			if (typeof item === 'string') return item;
			if (typeof item === 'number') return Speaker.getSilenceTag(item);
			if (typeof item === 'object') return Speaker.getSilenceTag(item.silence);
			return '';
		}).join(' ');
	}

	static speak(
		textParam = '',
		voiceParam = 0,
		pitch = 1,
		rate = 1,
		silence = 0,
		SpeechSynthesisUtterance = window.SpeechSynthesisUtterance,
		synth = window.speechSynthesis,
	) {
		// Based on Oxygen Levels Critical, which in turn is based on
		// an example from https://mdn.github.io/web-speech-api/speak-easy-synthesis/
		let text = String(textParam);
		if (silence) text = Speaker.getSilenceTag(silence) + text;
		const utterance = new SpeechSynthesisUtterance(text);
		const voice = Speaker.findVoice(voiceParam, synth);
		utterance.voice = voice;
		utterance.pitch = pitch;
		utterance.rate = rate;
		// utterance.onpause = (event) => {
		// console.log('Speech paused', event);
		// const char = event.utterance.text.charAt(event.charIndex);
		// };
		synth.speak(utterance);
	}

	speakText(text) {
		this.speechSynthesis.cancel();
		Speaker.speak(
			text,
			this.voice,
			this.pitch,
			this.rate,
			0,
			this.SpeechSynthesisUtterance,
			this.speechSynthesis,
		);
		return this;
	}

	speak(param, param2) {
		if (typeof param === 'string') {
			return this.speak({ text: param, ...param2 });
		}
		if (typeof param !== 'object') {
			return this.speakText(String(param));
		}
		if (param instanceof Array) {
			const text = Speaker.joinArray(param);
			return this.speak({ text, ...param2 });
		}
		const {
			text = '',
			silence = 0,
			cancel = true,
		} = param;
		if (cancel) this.speechSynthesis.cancel();
		Speaker.speak(
			text,
			this.voice,
			this.pitch,
			this.rate,
			silence,
			this.SpeechSynthesisUtterance,
			this.speechSynthesis,
		);
		return this;
	}

	cancel() {
		this.speechSynthesis.cancel();
		return this;
	}

	wait(t = 0) {
		return new Promise((resolve) => {
			this.setTimeout(resolve, t);
		});
	}

	pause(/* t = Infinity */) {
		this.speechSynthesis.pause();
		// if (t !== Infinity) {
		// this.setTimeout(() => this.resume(), t);
		// }
		return this;
	}

	resume() {
		this.speechSynthesis.resume();
		return this;
	}
}

export default Speaker;
