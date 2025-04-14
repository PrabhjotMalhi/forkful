import RecipeForm from '@/components/RecipeForm';
import { api } from '@/services/api';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditRecipePage({ params }) {
  try {
    const recipe = await api.getRecipe(params.id);

    const handleSubmit = async (data) => {
      'use server';
      await api.updateRecipe(params.id, data);
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Recipe</h1>
        <RecipeForm initialData={recipe} onSubmit={handleSubmit} />
      </div>
    );
  } catch (error) {
    notFound();
  }
} 