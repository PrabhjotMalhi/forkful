'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RecipeForm({ initialData, onSubmit }) {
  const router = useRouter();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    cook_time_minutes: initialData?.cook_time_minutes || '',
    servings: initialData?.servings || '',
    difficulty: initialData?.difficulty || 'easy'
  });

  const validateForm = () => {
    const validationErrors = [];
    
    // Title validation: 5-50 characters
    if (!formData.title || formData.title.length < 5 || formData.title.length > 50) {
      validationErrors.push('Title must be between 5 and 50 characters');
    }

    // Cook time validation: 10-240 minutes
    const cookTime = parseInt(formData.cook_time_minutes);
    if (!cookTime || cookTime < 10 || cookTime > 240) {
      validationErrors.push('Cook time must be between 10 and 240 minutes');
    }

    // Servings validation: 1-20 servings
    const servings = parseInt(formData.servings);
    if (!servings || servings < 1 || servings > 20) {
      validationErrors.push('Servings must be between 1 and 20');
    }

    // Difficulty validation
    if (!['easy', 'medium', 'hard'].includes(formData.difficulty)) {
      validationErrors.push('Difficulty must be easy, medium, or hard');
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(formData);
      router.push('/admin');
      router.refresh();
    } catch (error) {
      setErrors(['Failed to save recipe. Please try again.']);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && (
        <ul className="bg-red-50 text-red-500 p-4 rounded-lg">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cook Time (minutes)</label>
        <input
          type="number"
          name="cook_time_minutes"
          value={formData.cook_time_minutes}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Servings</label>
        <input
          type="number"
          name="servings"
          value={formData.servings}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {initialData ? 'Update Recipe' : 'Create Recipe'}
      </button>
    </form>
  );
} 