'use client';

import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  dishes: Dish[];
}

interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      dishes: []
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Gestion du Menu</h1>

        {/* Formulaire de création de catégorie */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Créer une nouvelle catégorie</h2>
          <form onSubmit={handleCreateCategory} className="space-y-4">
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de la catégorie
              </label>
              <input
                type="text"
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Entrées, Plats principaux..."
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Créer la catégorie
            </button>
          </form>
        </div>

        {/* Liste des catégories */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Catégories existantes</h2>
          {categories.length === 0 ? (
            <p className="text-gray-500">Aucune catégorie créée pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.dishes.length} plats</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 