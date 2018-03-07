(function(){
	class Spritesheet {
		constructor(n, cb) {
			this.sheet = new RocketBoots.GameImage(n);
			this.sprites = [];
			this.sheet.onload = () => { 
				this.parse();
				if (typeof cb === "function") { cb(this.sprites); }
			};
		}
		parse() {
			let canvas = document.createElement('canvas');
			let w = this.sheet.height;
			canvas.width = w;
			canvas.height = w; // assumes square
			let c = canvas.getContext('2d');
			let x = 0;
			while (this.sprites.length) { this.sprites.pop(); }
			while (x < this.sheet.width) {
				c.clearRect(0, 0, w, w);
				c.drawImage(this.sheet, x, 0, w, w, 0, 0, w, w);
				x += w;
				let src = canvas.toDataURL();
				this.sprites.push(new RocketBoots.GameImage(null, src));
			}
		}
	}

	const component = {
		fileName: 		"Spritesheet",
		classes:		{"Spritesheet": Spritesheet},
		requirements:	["GameImage"],
		credits:		"By Luke Nickerson, 2017-2018"
	};

	// Install into RocketBoots if it exists otherwise put the classes on the global window object
	if (RocketBoots) {
		RocketBoots.installComponent(component);
	} else if (window) {
		for (let className in component.classes) {
			window[className] = component.classes[className];
		}
	}
})();