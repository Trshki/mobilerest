import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <header className="bg-blue-500 text-white p-4 rounded-lg mb-8">
        <h1 className="text-2xl font-bold">Bienvenue sur notre application</h1>
      </header>
      
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Démarrez votre expérience</h2>
        <p className="text-gray-600">
          Cette application est conçue pour être simple et intuitive.
          Commencez par explorer les différentes sections.
        </p>
      </div>
    </main>
  );
}
