# RocketBoots Web Game Kit

RocketBoots is an open source kit to help create web games in JavaScript and HTML5.

# How do I use this kit?

See the [components instructions](docs/components.md) and [list of components](docs/component-list.md) for the (sparse) documentation.

If you're interested I recommend you look through the RocketBoots code, and some of my games' code at https://github.com/deathraygames ... Most games in the last few years use RocketBoots in one way or another.

# What's included in this repo?

At the root you'll find:

* `README.md` (this file)
* `LICENSE` (MIT, which basically means it's free to use)
* `scripts` directory
  * `libs` directory - contains various open source libraries that RocketBoots might use
    * jquery, lodash, etc.
  * `rocketboots` directory - contains the RocketBoots code
    * `core.js` - the core functionality that RocketBoots needs
    * *various components* (`.js`) - these can be pulled in individually as needed
 * `docs` directory - contains documentation on how to use RocketBoots
  
You are free to structure your code however you'd like, but RocketBoots will try to use this directory structure for *scripts* by default.

