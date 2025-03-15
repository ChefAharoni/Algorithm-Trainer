# Algorithm Trainer

An interactive web-based application designed to help users learn and practice algorithmic concepts:

1. **Reverse Polish Notation (RPN) Calculator** - Practice stack-based calculations
2. **Binary Tree Traversal** - Learn pre-order, in-order, and post-order traversals

## Features

- Interactive visualizations for both RPN calculations and Binary Trees
- Step-by-step validation of calculation process
- Practice mode with randomly generated exercises
- Keyboard shortcuts for efficient interaction
- Responsive design for all device sizes

## GitHub Pages Deployment

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the main branch.

**Live Demo:** [https://chefaharoni.github.io/Algorithm-Trainer/](https://chefaharoni.github.io/Algorithm-Trainer/)

### Premium Version Beta is Live!

**Try the premium version here**: [algorithm-trainer.com](https://algorithm-trainer.com)

## Development Setup

1. Clone the repository
   ```
   git clone https://github.com/ChefAharoni/Algorithm-Trainer.git
   cd Algorithm-Trainer
   ```

2. Install dependencies
   ```
   cd app
   npm install
   ```

3. Start development server
   ```
   npm run dev
   ```

4. Open [http://localhost:5000](http://localhost:5000) in your browser

## Tech Stack

- React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Shadcn UI components
- Wouter for routing

## Deployment Process

The GitHub Actions workflow will:

1. Check out the code
2. Install dependencies
3. Configure the application for GitHub Pages (with HashRouter)
4. Build the application
5. Deploy using the workflow
