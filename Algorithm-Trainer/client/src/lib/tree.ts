// Define TreeNode type for binary trees
export interface TreeNode {
  value: string;
  left: TreeNode | null;
  right: TreeNode | null;
}

// Generate a random binary tree with a specified maximum depth and node count
export function generateRandomBinaryTree(maxDepth: number = 4, maxNodes: number = 10): TreeNode {
  // Keep track of used values to ensure uniqueness
  const usedValues = new Set<string>();
  let nodeCount = 0;
  
  // Helper function to get a unique random value
  const getUniqueRandomValue = (): string => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let value: string;
    do {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      value = alphabet[randomIndex];
    } while (usedValues.has(value));
    
    usedValues.add(value);
    return value;
  };
  
  // Recursive function to build the tree
  const buildTree = (depth: number): TreeNode | null => {
    // Stop if we've reached max nodes or max depth
    if (nodeCount >= maxNodes || depth >= maxDepth) {
      return null;
    }
    
    // Create the current node
    const node: TreeNode = {
      value: getUniqueRandomValue(),
      left: null,
      right: null
    };
    
    nodeCount++;
    
    // Decide whether to create children with decreasing probability as we go deeper
    const createLeftProbability = Math.max(0.9 - depth * 0.2, 0.3);
    const createRightProbability = Math.max(0.9 - depth * 0.2, 0.3);
    
    if (Math.random() < createLeftProbability && nodeCount < maxNodes) {
      node.left = buildTree(depth + 1);
    }
    
    if (Math.random() < createRightProbability && nodeCount < maxNodes) {
      node.right = buildTree(depth + 1);
    }
    
    return node;
  };
  
  // Create the root node and build the tree
  const root = buildTree(0);
  
  // Ensure we created at least a valid root
  if (!root) {
    return {
      value: getUniqueRandomValue(),
      left: null,
      right: null
    };
  }
  
  return root;
}

// Perform a pre-order traversal (root, left, right)
export function preOrderTraversal(root: TreeNode | null): string[] {
  const result: string[] = [];
  
  const traverse = (node: TreeNode | null) => {
    if (!node) return;
    
    // Visit root first
    result.push(node.value);
    
    // Then traverse left subtree
    traverse(node.left);
    
    // Then traverse right subtree
    traverse(node.right);
  };
  
  traverse(root);
  return result;
}

// Perform an in-order traversal (left, root, right)
export function inOrderTraversal(root: TreeNode | null): string[] {
  const result: string[] = [];
  
  const traverse = (node: TreeNode | null) => {
    if (!node) return;
    
    // First traverse left subtree
    traverse(node.left);
    
    // Then visit root
    result.push(node.value);
    
    // Then traverse right subtree
    traverse(node.right);
  };
  
  traverse(root);
  return result;
}

// Perform a post-order traversal (left, right, root)
export function postOrderTraversal(root: TreeNode | null): string[] {
  const result: string[] = [];
  
  const traverse = (node: TreeNode | null) => {
    if (!node) return;
    
    // First traverse left subtree
    traverse(node.left);
    
    // Then traverse right subtree
    traverse(node.right);
    
    // Finally visit root
    result.push(node.value);
  };
  
  traverse(root);
  return result;
}

// Calculate the tree's width and height for visualization
export function calculateTreeDimensions(root: TreeNode): { width: number; height: number } {
  let minX = 0;
  let maxX = 0;
  let maxY = 0;
  
  // Traverse the tree and calculate its dimensions
  const traverse = (node: TreeNode | null, x: number, y: number) => {
    if (!node) return;
    
    // Update min and max coordinates
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    
    // Traverse children
    traverse(node.left, x - 1, y + 1);
    traverse(node.right, x + 1, y + 1);
  };
  
  traverse(root, 0, 0);
  
  return {
    width: maxX - minX + 1,
    height: maxY + 1
  };
}

// Generate coordinate positions for each node in the tree
export function generateTreeCoordinates(
  root: TreeNode | null,
  nodeSize: number = 40,
  levelHeight: number = 80
): Map<TreeNode, { x: number; y: number }> {
  const positions = new Map<TreeNode, { x: number; y: number }>();
  
  // Calculate x positions using in-order traversal to get a nicely spaced tree
  let xCounter = 0;
  const calculateXPositions = (node: TreeNode | null) => {
    if (!node) return;
    
    calculateXPositions(node.left);
    
    positions.set(node, {
      x: xCounter * nodeSize * 1.5,
      y: 0 // We'll set y positions in the next step
    });
    
    xCounter++;
    
    calculateXPositions(node.right);
  };
  
  calculateXPositions(root);
  
  // Calculate y positions based on level
  const calculateYPositions = (node: TreeNode | null, level: number) => {
    if (!node) return;
    
    const position = positions.get(node);
    if (position) {
      position.y = level * levelHeight;
    }
    
    calculateYPositions(node.left, level + 1);
    calculateYPositions(node.right, level + 1);
  };
  
  calculateYPositions(root, 0);
  
  return positions;
}

// Helper function to convert traversal array to a string
export function traversalToString(traversal: string[]): string {
  return traversal.join(' ');
}