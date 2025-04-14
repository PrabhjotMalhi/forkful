import Link from 'next/link';
import { api } from '@/services/api';

export const dynamic = 'force-dynamic';

export default async function CollectionPage() {
  const recipes = await api.getAllRecipes();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Recipe Collection</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td className="px-6 py-4 whitespace-nowrap">{recipe.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{recipe.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link href={`/collection/${recipe.id}`} className="text-blue-600 hover:text-blue-800">
                    more
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 