# Algorithm Visualizer

A responsive React application built with TypeScript and Vite to visualize common sorting and pathfinding algorithms. This tool helps users understand how different algorithms work step-by-step through interactive animations.

## Features

- **Algorithm Support**:
  - **Sorting**: Bubble Sort, Selection Sort, and Insertion Sort.
  - **Pathfinding**: BFS (Breadth-First Search), DFS (Depth-First Search), and Dijkstra's Algorithm.
- **Interactive Controls**: 
  - **Play/Pause**: Start or stop animations at any time.
  - **Speed Control**: Toggle between Slow, Medium, and Fast playback speeds.
  - **Auto-Reset**: Switching algorithms automatically pauses and prepares the environment.
  - **Wall Placement**: For pathfinding, click and drag on the grid to create unpassable walls.
- **Visual Feedback**:
  - **Sorting**: Color-coded bars for comparing, swapping, and sorted states.
  - **Pathfinding**: Grid-based visualization with markers for start/finish, wall nodes, search progress (visited nodes), and the final shortest path.

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd algo-visualizer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Scripts

- `npm run dev`: Start the Vite dev server.
- `npm run build`: Build the project for production.
- `npm run lint`: Run ESLint to check for code quality.
- `npm run preview`: Preview the production build locally.

## Project Structure

```text
algo-visualizer/
├── public/              # Static assets (icons, favicon)
├── src/
│   ├── components/      # UI Components
│   │   ├── reusables/   # Reusable UI elements like DropDown
│   │   ├── Header.tsx   # Top navigation and controls
│   │   ├── AlgoVisualizer.tsx # Main orchestrator
│   │   ├── PathfindingVisualizer.tsx # Grid-based logic
│   │   ├── Node.tsx     # Grid cell component
│   │   ├── BubbleSort.tsx
│   │   ├── SelectionSort.tsx
│   │   └── InsertionSort.tsx
│   ├── data/            # Static configuration data
│   ├── model/           # TypeScript interfaces and types
│   ├── App.tsx          # Root component
│   ├── App.css          # Main styles including visualization bars and grid
│   └── main.tsx         # Entry point
├── index.html           # Main HTML file
└── tsconfig.json        # TypeScript configuration
```

## Built With

- **React 19** - UI Framework
- **TypeScript** - For type safety and better DX
- **Vite** - Build tool and dev server
- **Vanilla CSS** - Styling

## Acknowledgments

This website by University of San Fransisco has been a major inspiration behind the visualization. You can check them out at: [Data Structure Visualization](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)

The pathfinding algorithm visualizations were inspired by the work of [Clément Mihailescu](https://www.clementmihailescu.com/).

The path finding website: [Pathfinding Visualizer](https://clementmihailescu.github.io/Pathfinding-Visualizer/)


