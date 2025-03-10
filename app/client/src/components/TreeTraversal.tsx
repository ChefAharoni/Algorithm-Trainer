import { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TreeVisualization } from "@/components/TreeVisualization";
import { 
  TreeNode, 
  generateRandomBinaryTree, 
  preOrderTraversal, 
  inOrderTraversal, 
  postOrderTraversal,
  traversalToString
} from "@/lib/tree";

// Define traversal types
type TraversalType = 'preorder' | 'inorder' | 'postorder';

// Define a traversal answer interface
interface TraversalAnswer {
  type: TraversalType;
  userAnswer: string;
  isCorrect: boolean | null;
  correctAnswer: string;
}

export function TreeTraversal() {
  const [currentTree, setCurrentTree] = useState<TreeNode | null>(null);
  const [showVisualization, setShowVisualization] = useState(true);
  
  // Store answers for each traversal type
  const [traversalAnswers, setTraversalAnswers] = useState<Map<TraversalType, TraversalAnswer>>(
    new Map([
      ['preorder', { type: 'preorder', userAnswer: '', isCorrect: null, correctAnswer: '' }],
      ['inorder', { type: 'inorder', userAnswer: '', isCorrect: null, correctAnswer: '' }],
      ['postorder', { type: 'postorder', userAnswer: '', isCorrect: null, correctAnswer: '' }],
    ])
  );
  
  // Generate a new tree and calculate correct traversals
  const generateNewTree = useCallback(() => {
    const tree = generateRandomBinaryTree(4, 10);
    setCurrentTree(tree);
    
    // Calculate correct traversals
    const preOrder = preOrderTraversal(tree);
    const inOrder = inOrderTraversal(tree);
    const postOrder = postOrderTraversal(tree);
    
    // Store correct answers and reset user answers
    setTraversalAnswers(new Map([
      ['preorder', { 
        type: 'preorder', 
        userAnswer: '', 
        isCorrect: null, 
        correctAnswer: traversalToString(preOrder) 
      }],
      ['inorder', { 
        type: 'inorder', 
        userAnswer: '', 
        isCorrect: null, 
        correctAnswer: traversalToString(inOrder) 
      }],
      ['postorder', { 
        type: 'postorder', 
        userAnswer: '', 
        isCorrect: null, 
        correctAnswer: traversalToString(postOrder) 
      }],
    ]));
  }, []);
  
  // Generate a tree on initial load
  useEffect(() => {
    generateNewTree();
  }, [generateNewTree]);
  
  // Handle user answer input
  const handleAnswerInput = (type: TraversalType, value: string) => {
    setTraversalAnswers(currentAnswers => {
      const newAnswers = new Map(currentAnswers);
      const current = newAnswers.get(type);
      
      if (current) {
        newAnswers.set(type, {
          ...current,
          userAnswer: value,
          isCorrect: null // Reset correctness when editing
        });
      }
      
      return newAnswers;
    });
  };
  
  // Handle key press in input field
  const handleKeyDown = (type: TraversalType, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheckAnswer(type);
    }
  };
  
  // Check if an answer is correct
  const handleCheckAnswer = (type: TraversalType) => {
    setTraversalAnswers(currentAnswers => {
      const newAnswers = new Map(currentAnswers);
      const current = newAnswers.get(type);
      
      if (current) {
        // Normalize answers by trimming extra whitespace, converting to lowercase
        // and ensuring consistent space separation
        const normalizeAnswer = (input: string): string => {
          // First convert to lowercase and trim
          const trimmed = input.trim().toLowerCase();
          // Split by any whitespace and rejoin with single spaces
          const spaceNormalized = trimmed.split(/\s+/).join(' ');
          return spaceNormalized;
        };
        
        const normalizedUserAnswer = normalizeAnswer(current.userAnswer);
        const normalizedCorrectAnswer = normalizeAnswer(current.correctAnswer);
        
        newAnswers.set(type, {
          ...current,
          isCorrect: normalizedUserAnswer === normalizedCorrectAnswer
        });
      }
      
      return newAnswers;
    });
  };
  
  // Check if all answers are correct
  const checkAllAnswers = () => {
    for (const type of ['preorder', 'inorder', 'postorder'] as TraversalType[]) {
      handleCheckAnswer(type);
    }
  };
  
  // Format traversal name for display
  const formatTraversalName = (type: TraversalType): string => {
    switch (type) {
      case 'preorder': return 'Pre-order';
      case 'inorder': return 'In-order';
      case 'postorder': return 'Post-order';
      default: return type;
    }
  };
  
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Binary Tree Traversal</h2>
        
        {/* Tree Visualization */}
        <div className="mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 w-full justify-between border border-gray-300 mb-2"
            onClick={() => setShowVisualization(!showVisualization)}
          >
            <span className="font-medium text-gray-700">Tree Visualization</span>
            {showVisualization ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          
          {showVisualization && currentTree && (
            <div className="animate-in fade-in duration-300 bg-gray-50 rounded-md p-4 border border-gray-200">
              <TreeVisualization root={currentTree} />
            </div>
          )}
        </div>
        
        {/* Instructions */}
        <div className="mb-6 p-4 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-blue-700">
            Fill in the traversal sequences for the binary tree shown above.
            Separate values with spaces. Press Enter to check each answer.
          </p>
        </div>
        
        {/* Traversal Inputs */}
        <div className="space-y-6">
          {(['preorder', 'inorder', 'postorder'] as TraversalType[]).map((type) => {
            const answer = traversalAnswers.get(type);
            
            return (
              <div key={type} className="space-y-2">
                <label className="block font-medium text-gray-700">
                  {formatTraversalName(type)} Traversal:
                </label>
                <Input
                  value={answer?.userAnswer || ''}
                  onChange={(e) => handleAnswerInput(type, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(type, e)}
                  className="w-full"
                  placeholder={`Enter ${formatTraversalName(type)} traversal (e.g. A B C ...)`}
                />
                
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCheckAnswer(type)}
                          className="mr-4"
                        >
                          Check
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Press Enter in the input field for a quick check</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  {answer?.isCorrect !== null && answer && (
                    <div className={`p-2 rounded ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {answer.isCorrect ? (
                        <span>✓ Correct!</span>
                      ) : (
                        <div>
                          <span>✗ Incorrect. </span>
                          <span className="font-medium">Correct answer: {answer.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300"
                  onClick={checkAllAnswers}
                >
                  Check All Answers
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex items-center gap-1">
                  <span>Check all your traversal answers</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 flex items-center gap-2"
                  onClick={generateNewTree}
                >
                  <RefreshCw className="h-4 w-4" />
                  New Tree
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex items-center gap-1">
                  <span>Generate a new binary tree</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}