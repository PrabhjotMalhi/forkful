'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RecipeForm({ initialData, onSubmit }) {
  const router = useRouter();
  const [errors, setErrors] = useState([]);

  const validateForm = (data) => {
    const errors = [];
    
    if (data.title.length < 5 || data.title.length > 50) {
      errors.push('Title must be between 5 and 50 characters');
    }

    if (data.cook_time_minutes < 10 || data.cook_time_minutes > 240) {
      errors.push('Cook time must be between 10 and 240 minutes');
    }

    if (data.servings < 1 || data.servings > 20) {
      errors.push('Servings must be between 1 and 20');
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      title: formData.get('title'),
      cook_time_minutes: parseInt(formData.get('cook_time_minutes')),
      servings: parseInt(formData.get('servings')),
      difficulty: formData.get('difficulty'),
    };

    const validationErrors = validateForm(data);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(data);
      router.push('/admin');
    } catch (error) {
      alert('Failed to save recipe');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.length > 0 && (
        <div className="bg-red-50 p-4 rounded">
          <ul className="list-disc list-inside text-red-600">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={initialData?.title}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="cook_time_minutes" className="block text-sm font-medium text-gray-700">
          Cook Time (minutes)
        </label>
        <input
          type="number"
          id="cook_time_minutes"
          name="cook_time_minutes"
          defaultValue={initialData?.cook_time_minutes}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="servings" className="block text-sm font-medium text-gray-700">
          Servings
        </label>
        <input
          type="number"
          id="servings"
          name="servings"
          defaultValue={initialData?.servings}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
          Difficulty
        </label>
        <select
          id="difficulty"
          name="difficulty"
          defaultValue={initialData?.difficulty}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Recipe
        </button>
      </div>
    </form>
  );
} 