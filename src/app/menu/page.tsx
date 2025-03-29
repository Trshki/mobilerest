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
  const [newDish, setNewDish] = useState({
    name: '',
    price: '',
    description: ''
  });

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

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !newDish.name.trim() || !newDish.price || !newDish.description.trim()) return;

    const newDishData: Dish = {
      id: Date.now().toString(),
      name: newDish.name.trim(),
      price: parseFloat(newDish.price),
      description: newDish.description.trim()
    };

    const updatedCategories = categories.map(category => {
      if (category.id === selectedCategory.id) {
        return {
          ...category,
          dishes: [...category.dishes, newDishData]
        };
      }
      return category;
    });

    setCategories(updatedCategories);
    setSelectedCategory({
      ...selectedCategory,
      dishes: [...selectedCategory.dishes, newDishData]
    });
    setNewDish({ name: '', price: '', description: '' });
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
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Catégories existantes</h2>
          {categories.length === 0 ? (
            <p className="text-gray-500">Aucune catégorie créée pour le moment.</p>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`p-4 border rounded-md cursor-pointer ${
                    selectedCategory?.id === category.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.dishes.length} plats</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Formulaire de création de plat */}
        {selectedCategory && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Ajouter un plat à {selectedCategory.name}</h2>
            <form onSubmit={handleCreateDish} className="space-y-4">
              <div>
                <label htmlFor="dishName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du plat
                </label>
                <input
                  type="text"
                  id="dishName"
                  value={newDish.name}
                  onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Coq au vin, Salade César..."
                />
              </div>
              <div>
                <label htmlFor="dishPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Prix (€)
                </label>
                <input
                  type="number"
                  id="dishPrice"
                  value={newDish.price}
                  onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div>
                <label htmlFor="dishDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="dishDescription"
                  value={newDish.description}
                  onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Description du plat..."
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Ajouter le plat
              </button>
            </form>
          </div>
        )}

        {/* Liste des plats de la catégorie sélectionnée */}
        {selectedCategory && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Plats de {selectedCategory.name}</h2>
            {selectedCategory.dishes.length === 0 ? (
              <p className="text-gray-500">Aucun plat dans cette catégorie.</p>
            ) : (
              <div className="space-y-4">
                {selectedCategory.dishes.map((dish) => (
                  <div key={dish.id} className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{dish.name}</h3>
                        <p className="text-gray-600">{dish.description}</p>
                      </div>
                      <span className="text-lg font-semibold text-blue-500">{dish.price}€</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
} 