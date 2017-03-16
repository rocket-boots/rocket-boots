# Components

RocketBoots is modular kit, comprised of a *"core"* and [multiple *"components"*](components-list.md). The core handles the basic functionality: creating a root `RocketBoots` object, and allowing it to load components. The components handle everything else, and you can pick and choose which ones you need for your game.

## How to load components

### Method 1: HTML script tags after RocketBoots core

For example, if you want to load the Stage component, just put a script tag somewhere in your HTML file, after getting `core.js`. 

```
<script src="core.js"></script>
<script src="Stage.js"></script>
```

(Note: Although you could use paths to files at `https://rocket-boots.github.io/rocket-boots/scripts/rocketboots/`, you probably want to use a local copy of the RocketBoots files. The files hosted at this GitHub address will always be the latest development versions, so could provide unexpected changes. Also I can't promise it'll be fast.)

### Method 2: JavaScript loading via RocketBoots core

After loading the `core.js` in your HTML file, you can simply call `RocketBoots.loadComponents`, providing it an array of component names.

`RocketBoots.loadComponents(["Stage"]);`

### Method 3: HTML script tag without RocketBoots core

Maybe you want to use the component by itself without using the core at all. In that case, just include the component's JavaScript.

```
<script src="https://rocket-boots.github.io/rocket-boots/scripts/rocketboots/Stage.js"></script>
```

Note: This will put the component on the `window` object, rather than the `RocketBoots` object. Other documentation will assume you're *not* doing this.

## What do you get

As long as you have the RocketBoots core, all components should appear as functions (acting like classes) on the `RocketBoots` root object. Typically the functions are named the same as the filename. For instance: if you include `Stage.js`, you will get `RocketBoots.Stage`. 

Any required dependencies will be automatically fetched. For instance, the *Stage* component requires the *Coords* component, so it will try to automatically load that one as well.

### Instantiating

Once you have a component, you will likely then want to instantiate it so you can do things with it. 

#### Instantiating - Method 1

The basic method is to just do:

`var stage = new RocketBoots.Stage();`

Most components offer the ability to pass in some options during instantiation, typically as an object: `var stage = new RocketBoots.Stage({ /* options */ });`

#### Instantiating - Method 2

The other way is to use the `instantiateComponents` parameter as part of the *Game* component. This can get rid of a little bit of boilerplate.

```
var game = new RocketBoots.Game({
  name: "Great Game!",
  version: "v1.0",
  instantiateComponents: [
    {"stage": "Stage"},
    {"loop": "Loop"},
    {"myComponent": "SomeOtherComponent"} // You can customize the component name
    // Have as many as you want
  ]
});
```

Now you have `game.stage`, `game.loop`, and `game.myComponent` to use. The downside with this method is that it doesn't support customizing options for each component, so this is only good if you're okay with the default settings.

## What kind of components are there that I can use now?

See the [components list](components-list.md).
