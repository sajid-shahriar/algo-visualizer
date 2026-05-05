# Algorithm Visualizer

A responsive React application built with TypeScript and Vite to visualize common sorting algorithms. This tool helps users understand how different algorithms work step-by-step through interactive animations.

## Features

- **Algorithm Support**: Visualize Bubble Sort, Selection Sort, and Insertion Sort.
- **Interactive Controls**: 
  - **Play/Pause**: Start or stop animations at any time.
  - **Speed Control**: Toggle between Slow, Medium, and Fast playback speeds.
  - **Auto-Reset**: Switching algorithms automatically pauses and prepares a new random array.
- **Visual Feedback**: Color-coded bars to represent:
  - <span style="color: #f1c40f">●</span> Comparing elements
  - <span style="color: #e74c3c">●</span> Swapping elements
  - <span style="color: #2ecc71">●</span> Sorted elements

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
│   │   ├── BubbleSort.tsx
│   │   ├── SelectionSort.tsx
│   │   └── InsertionSort.tsx
│   ├── data/            # Static configuration data
│   ├── model/           # TypeScript interfaces and types
│   ├── App.tsx          # Root component
│   ├── App.css          # Main styles including visualization bars
│   └── main.tsx         # Entry point
├── index.html           # Main HTML file
└── tsconfig.json        # TypeScript configuration
```

## Built With

- **React 19** - UI Framework
- **TypeScript** - For type safety and better DX
- **Vite** - Build tool and dev server
- **Vanilla CSS** - Styling
