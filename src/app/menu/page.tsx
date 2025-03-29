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
  const [newDish, setNewDish] = useState<Record<string, { name: string; price: string; description: string }>>({});

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

  const handleCreateDish = (e: React.FormEvent, categoryId: string) => {
    e.preventDefault();
    const dishData = newDish[categoryId];
    if (!dishData || !dishData.name.trim() || !dishData.price || !dishData.description.trim()) return;

    const newDishData: Dish = {
      id: Date.now().toString(),
      name: dishData.name.trim(),
      price: parseFloat(dishData.price),
      description: dishData.description.trim()
    };

    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          dishes: [...category.dishes, newDishData]
        };
      }
      return category;
    });

    setCategories(updatedCategories);
    setNewDish({ ...newDish, [categoryId]: { name: '', price: '', description: '' } });
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
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

        {/* Grille des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* En-tête de la catégorie */}
              <div className="bg-blue-500 text-white p-4">
                <h2 className="text-xl font-semibold">{category.name}</h2>
              </div>

              {/* Liste des plats */}
              <div className="p-4">
                {category.dishes.length === 0 ? (
                  <p className="text-gray-500 text-sm">Aucun plat dans cette catégorie</p>
                ) : (
                  <div className="space-y-3 mb-4">
                    {category.dishes.map((dish) => (
                      <div key={dish.id} className="border border-gray-200 rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{dish.name}</h3>
                            <p className="text-sm text-gray-600">{dish.description}</p>
                          </div>
                          <span className="text-lg font-semibold text-blue-500">{dish.price}€</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Formulaire d'ajout de plat */}
                <form onSubmit={(e) => handleCreateDish(e, category.id)} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      value={newDish[category.id]?.name || ''}
                      onChange={(e) => setNewDish({
                        ...newDish,
                        [category.id]: { ...newDish[category.id], name: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nom du plat"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={newDish[category.id]?.price || ''}
                      onChange={(e) => setNewDish({
                        ...newDish,
                        [category.id]: { ...newDish[category.id], price: e.target.value }
                      })}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Prix"
                      step="0.01"
                      min="0"
                    />
                    <button
                      type="submit"
                      className="w-1/2 bg-blue-500 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Ajouter
                    </button>
                  </div>
                  <div>
                    <textarea
                      value={newDish[category.id]?.description || ''}
                      onChange={(e) => setNewDish({
                        ...newDish,
                        [category.id]: { ...newDish[category.id], description: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Description"
                      rows={2}
                    />
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            Créez votre première catégorie pour commencer à ajouter des plats
          </div>
        )}
      </div>
    </main>
  );
} 