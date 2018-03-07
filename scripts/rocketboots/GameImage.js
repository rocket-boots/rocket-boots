(function(){
	class GameImage extends Image {
		constructor(n, src) { 
			super();
			if (typeof n === "string") {
				this.src = "images/" + n + ".png";
			}
			if (typeof src === "string") {
				this.src = src;
			}
			this.data = null;
			/*
				console.log(n);
				let c = this.getCanvasContext();
				c.putImageData(n, 0, 0);
				this.src = c._canvas.toDataURL();
			*/
			this.flippedHorizontal = null;
			this.flippedVertical = null;		
			this.outline = new Image();
			this.onload = () => { this.setup(); }
		}
		setup() {
			this.data = this.getImageData();
			this.flippedHorizontal = this.getFlippedImage(-1, 1);
			this.flippedVertical = this.getFlippedImage(1, -1);
			this.setOutline();
		}
		getImageData() {
			let c = this.getCanvasContext();
			c.drawImage(this, 0, 0);
			return c.getImageData(0, 0, this.width, this.height);
		}
		getFlippedImage(a, b) {
			let c = this.getCanvasContext();
			c.save();
			c.scale(a, b);
			//c.translate(-this.width, this.height);
			c.translate((a < 1) ? -this.width : 0, (b < 1) ? -this.height : 0);
			//c.rotate(Math.PI);
			c.drawImage(this, 0, 0);
			c.restore();
			//let data = c.getImageData(0, 0, this.width, this.height);
			//c.putImageData(data, 0, 0);
			let img = new Image();
			img.src = c._canvas.toDataURL();
			return img;
		}
		getCanvasContext() {
			let canvas = document.createElement('canvas');
			canvas.width = this.width;
			canvas.height = this.height;
			let c = canvas.getContext('2d');
			c._canvas = canvas;
			return c;
		}	
		setOutline() {
			return;
			let data;
			// TODO Get outline data.... 
			let c = this.getCanvasContext();
			canvas.width = 0; // TODO
			canvas.height = 0; // TODO
			c.putImageData(data, 0, 0);
			this.outline = canvas.toDataURL();
		}
	}

	const component = {
		fileName: "GameImage",
		classes: {"GameImage": GameImage},
		requirements: [],
		description: "GameImage class",
		credits: "By Luke Nickerson, 2017-2018"
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