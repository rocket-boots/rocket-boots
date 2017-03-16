# ImageBank Component

Load the component

`RocketBoots.loadComponents(["ImageBank"]);`

Instantiate it as part of the game creation...

```
var myGame = new RocketBoots.Game({ 
  instantiateComponents: [{
    "images": "ImageBank"
  }] 
});
```

...or stand alone...

`myGame.images = new RocketBoots.ImageBank();`

Adjust the path if necessary (default is `"images/"`)...

`myGame.images.path = "some/path/to/your/image/files/";`

Load the images by providing a map of image keys (strings) with filenames...

```
myGame.images.load({ 
  "smile": "smile-50x50.png", 
  "frown": "frown-50x50.png" 
});
```

Then you can use the images with a simple get...

`myGame.images.get("smile");`

for example: `canvasContext.drawImage(myGame.images.get("smile"));`

