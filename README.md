# No Man's Land

A small interactive 3D scene built with Three.js: a desolate desert town you can explore, with a walking player character, a patrolling UFO, wandering lizards, and a procedurally generated landscape of cliffs, dunes, and rocks.

🔗 **Live demo:** [GitHub Pages](https://corinabataiosu.github.io/no-mans-land/)


## Controls

| Input | Action |
|---|---|
| Mouse drag | Orbit / rotate camera |
| Scroll | Zoom |
| 'W' 'A' 'S' 'D' | Move camera |
| 'Q' 'E' | Move camera up / down |
| Arrow keys | Move the player character |

## Features

- Procedurally generated terrain: cliffs, boulders, and sand dunes
- A small town with buildings, a circular track, and streetlights (with real-time shadows)
- Player character and UFO loaded from '.glb' models
- Wandering lizard NPCs with simple randomized movement
- Basic collision detection between the player and buildings/rocks/cliffs

## Tech Stack

- **Three.js**, loaded via import map
- '**GLTFLoader**' + '**DRACOLoader**' for the 3D models
- '**OrbitControls**' for camera movement
- Plain HTML/JS, no build step required

## Project Structure

```
.
├── textures/              # ground, rock, wall, wood, track, skybox textures
├── index.html             # scene setup, geometry generation, animation loop
├── vikinglander.glb       # player character model
├── juno.glb               # UFO model
└── README.md
```
