import { useEffect, useRef } from "react";
import { TreeNode, generateTreeCoordinates } from "@/lib/tree";

interface TreeVisualizationProps {
  root: TreeNode | null;
}

export function TreeVisualization({ root }: TreeVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Render the tree on a canvas
  useEffect(() => {
    if (!canvasRef.current || !root) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate node positions
    const nodeSize = 30;
    const levelHeight = 70;
    const positions = generateTreeCoordinates(root, nodeSize, levelHeight);
    
    // Find the dimensions of the tree to center it in the canvas
    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = 0;
    
    // Use forEach on positions since Map has forEach built-in
    positions.forEach((pos, _) => {
      minX = Math.min(minX, pos.x);
      maxX = Math.max(maxX, pos.x);
      maxY = Math.max(maxY, pos.y);
    });
    
    const treeWidth = maxX - minX + nodeSize * 2;
    const treeHeight = maxY + nodeSize * 2;
    
    // Resize the canvas to fit the tree
    canvas.width = Math.max(500, treeWidth);
    canvas.height = Math.max(300, treeHeight + 40); // Add extra height for spacing
    
    // Calculate offset to center the tree
    const offsetX = (canvas.width - treeWidth) / 2 - minX + nodeSize;
    const offsetY = nodeSize + 10; // Add a bit of padding at the top
    
    // Draw the edges first so they're behind the nodes
    const drawEdges = (node: TreeNode) => {
      const nodePos = positions.get(node);
      if (!nodePos) return;
      
      const x = nodePos.x + offsetX;
      const y = nodePos.y + offsetY;
      
      ctx.strokeStyle = "#666";
      ctx.lineWidth = 2;
      
      // Draw edge to left child if it exists
      if (node.left) {
        const leftPos = positions.get(node.left);
        if (leftPos) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(leftPos.x + offsetX, leftPos.y + offsetY);
          ctx.stroke();
        }
      }
      
      // Draw edge to right child if it exists
      if (node.right) {
        const rightPos = positions.get(node.right);
        if (rightPos) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(rightPos.x + offsetX, rightPos.y + offsetY);
          ctx.stroke();
        }
      }
      
      // Recursively draw edges for children
      if (node.left) drawEdges(node.left);
      if (node.right) drawEdges(node.right);
    };
    
    // Draw the nodes
    const drawNodes = (node: TreeNode) => {
      const nodePos = positions.get(node);
      if (!nodePos) return;
      
      const x = nodePos.x + offsetX;
      const y = nodePos.y + offsetY;
      
      // Draw the circle
      ctx.beginPath();
      ctx.arc(x, y, nodeSize / 2, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw the value - use a slightly larger and bold font for letters
      ctx.fillStyle = "#333";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.value, x, y);
      
      // Recursively draw nodes for children
      if (node.left) drawNodes(node.left);
      if (node.right) drawNodes(node.right);
    };
    
    // Draw the tree
    if (root) {
      drawEdges(root);
      drawNodes(root);
    }
  }, [root]);
  
  return (
    <div className="flex justify-center mt-4 w-full overflow-auto">
      <canvas 
        ref={canvasRef} 
        className="rounded-md border border-gray-300"
        height={300}
        width={500}
      />
    </div>
  );
}