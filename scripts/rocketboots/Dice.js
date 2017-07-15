(function(){
	var component = {
		fileName: 		"Dice",
		classNames:		["Dice"],
		requirements:	[],
		description:	"Dice class for random number generation",
		credits:		"By Luke Nickerson, 2014-2017"
	};

	var RANDOM = "random";
	var PSEUDORANDOM = "pseudorandom";
	component.Dice = function Dice(options) {
		if (typeof options.seed == 'number') {
			this.seed = options.seed;
		} else {
			this.seed = 1;	
		}
		if (options.type === RANDOM || options.type === PSEUDORANDOM) {
			this.type = options.type;
		} else {
			this.type = RANDOM;
		}
	};

	(function(p){
		p.getRandom = Math.random; // always an alias for Math.random
		p.getPseudoRandomBySeed = getPseudoRandomBySeed;
		p.getPseudoRandom = getPseudoRandom; // increments seed
		//==== Basics: "random" function returns either a 
		// true random number or a pseudorandom number based on
		// the random-type that is set.
		p.random = Math.random; // can be changed
		p.switchToPseudoRandom = switchToPseudoRandom; // changes .random
		p.switchToRandom = switchToRandom; // changes .random
		p.setSeed = setSeed;
		p.getSeed = getSeed;
		p.normalize = normalize;
		
		//==== "Roll" functions
		p.roll1d = roll1d;
		p.rollxd = rollxd;
		p.roll = roll;
		p.flip = flip;
		p.selectRandom = selectRandom;
		p.pick = selectRandom; // alias - "pick from array"
		
		//==== "Get" functions -- Based on random-type
		p.getRandomInteger = roll1d;
		p.getRandomIntegerBetween = getRandomIntegerBetween;	
		p.getRandomAround = getRandomAround;
		p.bell = getRandomAround; // alias
	})(component.Dice.prototype)

	// Install into RocketBoots if it exists
	if (typeof RocketBoots === "object") {
		RocketBoots.installComponent(component);
	} else { // Otherwise put the classes on the global window object
		component.classNames.forEach(function(className){
			window[className] = component[className];
		});
	}

	return;

	//// Hoisted functions

	function getPseudoRandomBySeed(seed) {
		// http://stackoverflow.com/a/19303725/1766230
		var x = Math.sin(seed) * 10000;
		return x - Math.floor(x);
	}

	function getPseudoRandom() {
		return this.getPseudoRandomBySeed(this.seed++);
	}

	function switchToPseudoRandom() {
		this.type = PSEUDORANDOM;
		this.random = this.getPseudoRandom;
		return this;
	}

	function switchToRandom() {
		this.type = RANDOM;
		this.random = Math.random;
		return this;
	}

	function setSeed(s) {
		if (typeof s == "undefined") {
			s = this.normalize(Math.random(), 10000);
		}
		this.seed = s;
		return this.seed;
	}

	function getSeed() {
		return this.seed;
	}

	function normalize(rand, n) {
		return (Math.floor(rand * n) + 1);
	}

	function roll1d(sides) {
		return this.normalize(this.random(), sides);
	}

	function rollxd(num, sides) {
		var sum = 0;
		for (var i = 0; i < num; i++){
			sum += this.roll1d(sides);
		}
		return sum;
	}

	function roll() {
		if (arguments.length == 1) {
			return this.roll1d(arguments[0]);
		} else if (arguments.length == 2) {
			return this.rollxd(arguments[0], arguments[1]);
		} else if (arguments.length == 3) {
			return this.rollxd(arguments[0], arguments[1]) + arguments[2];			
		} else {
			console.error("Roll needs 1, 2, or 3 arguments");
		}
	}

	function flip(heads, tails) {
		if (typeof heads === 'undefined' && typeof tails === 'undefined') {
			heads = true;
			tails = false;
		}
		return (this.roll1d(2) == 1) ? heads : tails;
	}

	function selectRandom(arr) {
		if (arr.length == 0 || arr.length === undefined) {
			return null;
		}
		var r = Math.floor(this.random() * arr.length);
		return arr[r];
	}

	function getRandomIntegerBetween(min, max) {
		return Math.floor(this.random() * (max - min + 1) + min);
	}

	function getRandomAround(n) { // BELL
		var a = this.random();
		var b = this.random();
		return (n * (a-b));
	}

})();