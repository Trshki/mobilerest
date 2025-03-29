export default function Services() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Nos Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Service 1</h2>
            <p className="text-gray-600">
              Description détaillée de notre premier service.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Service 2</h2>
            <p className="text-gray-600">
              Description détaillée de notre deuxième service.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 