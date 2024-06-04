# Path Finding Visualizer

This project is a visualizer of the path finding algorithms A*, Dijkstra's, and BFS. It is created in P5.js and React. It is a Single Page Application (SPA) that allows users to choose any two points on a map to find the shortest path between them. The path finding algorithms are implemented in P5.js and the map is generated using the OpenStreetMap API.

## How to use it

1. Open the website in your browser.
2. Choose the start point by clicking on the map.
3. Choose the end point by clicking on the map.
4. Press the "Start" button or press the space bar to start the path finding algorithm.
5. Watch the paths being generated.

## Screenshots

![Screenshot 1](./screenshots/screenshot1.png)

## Video

Here is a video of the simulation running:

<video src="./video.mp4" controls></video>

## Implementation

This project uses P5.js and React. Here are some of the key points:

- The map is generated using the OpenStreetMap API.
- The path finding algorithms are implemented in P5.js.
- The React frontend allows users to choose the start and end points on the map.
- The path finding algorithm is triggered when the user clicks the "Start" button or presses the space bar.
- The paths are animated using P5.js.
- The website is a Single Page Application (SPA) and uses React Router for routing.
- The website is styled using Tailwind CSS.

## Algorithms

### A*

A* is a path finding algorithm that is similar to Dijkstra's algorithm. It uses an additional heuristic function to guide the algorithm. A* is faster than Dijkstra's algorithm when the heuristic function is admissible, meaning it never overestimates the cost to reach the goal.

Here is an example of how to implement A* in P5.js:

# Pathfinding-Visualizer
