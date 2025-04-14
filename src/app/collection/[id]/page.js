import Link from 'next/link';
import { api } from '@/services/api';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function RecipePage({ params }) {
  try {
    const recipe = await api.getRecipe(params.id);

    return (
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/collection"
          className="text-blue-500 hover:text-blue-700 mb-4 inline-block"
        >
          ← back
        </Link>
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6">{recipe.title}</h1>
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-medium py-2">ID:</td>
                <td>{recipe.id}</td>
              </tr>
              <tr>
                <td className="font-medium py-2">Cook Time:</td>
                <td>{recipe.cook_time_minutes} minutes</td>
              </tr>
              <tr>
                <td className="font-medium py-2">Servings:</td>
                <td>{recipe.servings}</td>
              </tr>
              <tr>
                <td className="font-medium py-2">Difficulty:</td>
                <td className="capitalize">{recipe.difficulty}</td>
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