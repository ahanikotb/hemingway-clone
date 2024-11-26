import { Pencil } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Pencil className="h-8 w-8 text-red-500" />
            <h1 className="ml-2 text-2xl font-bold text-gray-900">Hemingway Editor</h1>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
              Edit
            </button>
            <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors">
              Publish
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}