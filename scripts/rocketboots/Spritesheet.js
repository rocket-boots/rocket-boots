(function(){
	// NOTE: This spritesheet loader only handles sheets with static sized sprites
	class Spritesheet {
		constructor(options) {
			options = options || {};
			const gameImageOptions = (options.url) ? {url: options.url} : {name: options.name};
			this.sheet = new RocketBoots.GameImage(gameImageOptions);
			this.spriteSize = options.spriteSize || {x: 16, y: 16};
			this.spriteKeys = options.spriteKeys || [[]];
			this.spriteList = [];
			this.spriteImages = {};
			this.loaded = new Promise((resolve, reject) => {
				this.sheet.onload = () => {
					this.parse().then(() => {
						resolve(this);	
					});
				};
			});
		}
		parse() {
			const canvas = document.createElement('canvas');
			let w = this.spriteSize.x;
			let h = this.spriteSize.y;
			let c = canvas.getContext('2d');
			let x = 0;
			let y = 0;
			let kx = 0;
			let ky = 0;
			let promises = [];
			canvas.width = w;
			canvas.height = h;
			this.spriteList.length = 0; //while (this.spriteList.length) { this.spriteList.pop(); }
			while (y < this.sheet.height) {
				let row = this.spriteKeys[ky];
				kx = 0;
				x = 0;
				//console.log("Row ---", y, this.sheet.height, row, x, this.sheet.width);
				if (row !== undefined) {
					while (x < this.sheet.width) {
						let key = row[kx];
						if (key !== undefined) {
							c.clearRect(0, 0, canvas.width, canvas.height);
							c.drawImage(this.sheet, x, y, w, h, 0, 0, w, h);
							const src = canvas.toDataURL();
							const spriteImage = new RocketBoots.GameImage({
								name: key,
								src: src
							});
							this.spriteList.push(spriteImage);
							this.spriteImages[key] = spriteImage;
							promises.push(spriteImage.loaded);
						}
						//console.log(key, x, y, kx, ky);
						x += w;
						kx++;
					}
				}
				y += h;
				ky++;
			}
			return Promise.all(promises);
		}
		getImage(key) {
			return this.spriteImages[key];
		}
		getImageCopy(key) {
			return new RocketBoots.GameImage(this.getImage(key));
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