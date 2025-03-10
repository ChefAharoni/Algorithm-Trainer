import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, GitBranchPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
            Algorithm Trainer
          </h1>
          <p className="text-gray-600 text-lg">
            Interactive exercises to help you master essential algorithms and data structures
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* RPN Calculator Exercise */}
          <Link href="/rpn">
            <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              <div className="bg-primary/10 p-4 flex justify-center items-center">
                <Calculator className="h-16 w-16 text-primary"/>
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-primary mb-2">RPN Calculator</h2>
                <p className="text-gray-600">
                  Learn and practice stack-based Reverse Polish Notation calculations
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Tree Traversal Exercise */}
          <Link href="/tree">
            <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
              <div className="bg-blue-600/10 p-4 flex justify-center items-center">
                <GitBranchPlus className="h-16 w-16 text-blue-600"/>
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-blue-600 mb-2">Binary Tree Traversal</h2>
                <p className="text-gray-600">
                  Practice pre-order, in-order, and post-order tree traversal algorithms
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Algorithm Trainer</h2>
          <p className="text-gray-700 mb-4">
            This interactive learning platform is designed to help you understand and practice
            essential algorithms and data structures through hands-on exercises. Select one of
            the exercises above to get started!
          </p>
          <p className="text-gray-700">
            Each exercise provides immediate feedback and visual representations to reinforce
            your understanding of key computer science concepts.
          </p>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>
            Algorithm Trainer | Building a stronger foundation in computer science
          </p>
        </footer>
      </div>
    </div>
  );
}
