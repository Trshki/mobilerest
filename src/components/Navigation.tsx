import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-7">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-500">
                MDD
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md">
                Accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 