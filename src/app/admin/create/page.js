import RecipeForm from '@/components/RecipeForm';
import { api } from '@/services/api';

export default function CreateRecipePage() {
  const handleSubmit = async (data) => {
    'use server';
    await api.createRecipe(data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Recipe</h1>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
} 