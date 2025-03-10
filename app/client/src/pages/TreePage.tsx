import { TreeTraversal } from "@/components/TreeTraversal";
// import { Link } from "wouter";
import Link from "@/components/HashLink";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TreePage() {
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
          <h1 className="text-3xl font-bold text-primary mb-2">
            Binary Tree Traversal
          </h1>
          <p className="text-gray-600">
            Learn and practice different methods of tree traversal
          </p>
        </header>

        <TreeTraversal />

        <div className="mt-8 bg-blue-50 rounded-md p-5 border border-blue-200">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">
            About Tree Traversals
          </h2>
          <div className="space-y-3">
            <p className="text-blue-700">
              <strong>Pre-order Traversal:</strong> Visit the root node first,
              then traverse the left subtree, and finally traverse the right
              subtree (Root, Left, Right).
            </p>
            <p className="text-blue-700">
              <strong>In-order Traversal:</strong> Traverse the left subtree
              first, then visit the root node, and finally traverse the right
              subtree (Left, Root, Right).
            </p>
            <p className="text-blue-700">
              <strong>Post-order Traversal:</strong> Traverse the left subtree
              first, then traverse the right subtree, and finally visit the root
              node (Left, Right, Root).
            </p>
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm mt-8">
          <p>
            Algorithm Trainer | Learn more about{" "}
            <a
              href="https://en.wikipedia.org/wiki/Tree_traversal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Tree Traversal
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
