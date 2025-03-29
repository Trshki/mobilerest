import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <header className="bg-blue-500 text-white p-8 rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-4">Bienvenue sur MDD</h1>
          <p className="text-lg">
            Découvrez nos services et commencez votre expérience avec nous.
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">À propos de nous</h2>
            <p className="text-gray-600">
              Nous sommes une équipe passionnée par la création d'expériences web modernes et accessibles.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Notre mission</h2>
            <p className="text-gray-600">
              Fournir des solutions web innovantes qui répondent aux besoins de nos clients.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
