# P4 Classic Arcade Game
## Contents
* css - Provided by Udacity. No change from the original
* images directory - image files given by Udacity. No change from the original.
* js/app.js - Enemy/Player are implemented in this file. This is only file
changed from the original.
* js/engine.js - Application engine. No change from the original.
* index.html - Frogger game top page html. No change from the original.

## Staring Application
To start the application follow the below steps:
* Start your browser. (preferably chrome)
* Open index.html
* Once the application is started, move the player with arrow keys.

## Short Summary
Enemy/Player are implemented in js/app.js.

Enemy has a constructor, update, and render functions. In the constructor, it
defines the initial position and its speed. Both position and speed are set by
using Math.random function. Enemy.update updates position. Once the enemy
reaches the right side of the paved road, the enemy will be moved back to
the left side with the different speed. Enemy.render draws image.

Player also has a constructor, update, render, and handleInput functions.
In the constructor, it defines the initial position. Player.update function
checks if player collides any enemy. If it finds collision, it moves the player
back to the initial position. Player.render draws image.

Player.handleInput changes the position of player when key is pressed.

## Instructions given by Udacity
### frontend-nanodegree-arcade-game

Students should use this [rubric](https://www.udacity.com/course/viewer/#!/c-nd001/l-2696458597/m-2687128535) for self-checking their submission.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).
