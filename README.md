# Conway's Game of Life

## Overview
Conway's Game of Life is an interactive web-based simulation of the classic cellular automaton. This project allows users to explore how simple rules can lead to complex, emergent behaviors through a dynamic and responsive interface.

---

## Features
- **Interactive Grid**:
  - Toggle cells on/off to create custom patterns.
  - Resize the grid for different simulation scales.

---

## Technologies Used
- **React**: Provides efficient state management and dynamic rendering.
- **TailwindCSS**: Ensures responsive design and consistent styling.
- **Vite**: Offers fast development and optimized builds.
- **JavaScript**: Implements the rules and logic of the simulation.

---

## How to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/justin-care/conway.git
   cd conway
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Access the App**:
   Open your browser and navigate to `http://localhost:3000`.

---

## Rules of the Game
Conway's Game of Life operates on the following simple rules:
1. Any live cell with fewer than two live neighbors dies (underpopulation).
2. Any live cell with two or three live neighbors lives on.
3. Any live cell with more than three live neighbors dies (overpopulation).
4. Any dead cell with exactly three live neighbors becomes a live cell (reproduction).

---

## Live Demo
Check out the live version of this project:
[Live Demo](https://justin-care.github.io/conway/)

---

## Case Study
For a detailed analysis of this project, including challenges, solutions, and future improvements, refer to the [Case Study](./docs/case-study.md).