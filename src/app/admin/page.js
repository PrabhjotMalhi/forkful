import Link from 'next/link';
import { api } from '@/services/api';
import DeleteButton from './DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const recipes = await api.getAllRecipes();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Recipe Administration</h1>
        <Link
          href="/admin/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create new
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cook Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Servings
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Difficulty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td className="px-6 py-4 whitespace-nowrap">{recipe.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{recipe.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {recipe.cook_time_minutes} min
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {recipe.servings}
                </td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">
                  {recipe.difficulty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <Link
                    href={`/admin/edit/${recipe.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    E
                  </Link>
                  <DeleteButton id={recipe.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 