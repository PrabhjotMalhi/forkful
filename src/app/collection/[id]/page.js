import Link from 'next/link';
import { api } from '@/services/api';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const recipes = await api.getAllRecipes();
  // Get only the first 10 recipes
  const first10Recipes = recipes.slice(0, 10);
  
  return first10Recipes.map((recipe) => ({
    id: recipe.id.toString()
  }));
}

export default async function RecipePage({ params }) {
  try {
    const recipe = await api.getRecipe(params.id);

    return (
      <div className="container mx-auto px-4 py-8">
        <Link href="/collection" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Collection
        </Link>
        <h1 className="text-3xl font-bold mb-8">{recipe.title}</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full">
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">ID</td>
                <td className="px-6 py-4 whitespace-nowrap">{recipe.id}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Cook Time</td>
                <td className="px-6 py-4 whitespace-nowrap">{recipe.cook_time_minutes} minutes</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Servings</td>
                <td className="px-6 py-4 whitespace-nowrap">{recipe.servings}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap font-medium">Difficulty</td>
                <td className="px-6 py-4 whitespace-nowrap">{recipe.difficulty}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
} 