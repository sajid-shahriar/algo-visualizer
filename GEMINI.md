# Project Conventions

## General Standards
- Use **Strict TypeScript** for all new code.
- Prefer **Functional Components** and **React Hooks** over Class Components.
- Use **Interfaces** for data modeling and prop types.
- Maintain **Separation of Concerns**: keep algorithm logic separate from UI rendering logic where possible.

## Pathfinding Visualization
- Grid should be interactive, allowing users to toggle "walls" (unpassable nodes).
- Support multiple algorithms: BFS, DFS, and Dijkstra.
- Shortest path should be highlighted after the search animation for BFS and Dijkstra.
- Visualization speed should be adjustable via the existing playback speed control.
