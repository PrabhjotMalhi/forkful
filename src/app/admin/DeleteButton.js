'use client';

import { api } from '@/services/api';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      try {
        await api.deleteRecipe(id);
        router.refresh();
      } catch (error) {
        alert('Failed to delete recipe');
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700"
    >
      D
    </button>
  );
} 