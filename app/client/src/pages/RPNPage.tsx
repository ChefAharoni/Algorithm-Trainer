import { InstructionsPanel } from "@/components/InstructionsPanel";
import { RPNCalculator } from "@/components/RPNCalculator";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function RPNPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/">
          <Button variant="outline" className="mb-4 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">RPN Calculator</h1>
          <p className="text-gray-600">Learn and practice Reverse Polish Notation calculations</p>
        </header>

        <RPNCalculator />
        <InstructionsPanel />

        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>
            Algorithm Trainer | Learn more about{" "}
            <a 
              href="https://en.wikipedia.org/wiki/Reverse_Polish_notation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Reverse Polish Notation
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}