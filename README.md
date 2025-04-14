# Recipe Management Application

This is a [Next.js](https://nextjs.org) application for managing recipes, featuring both a collection view for users and an administrative interface. The application uses a JSON server as a REST API backend for data management.

## Features

- **Collection View**
  - Browse all recipes in a styled list
  - View detailed information for each recipe
  - Static generation for the first 10 recipes
  - Error handling for non-existent recipes

- **Admin Interface**
  - Complete CRUD operations (Create, Read, Update, Delete)
  - Form validation for recipe creation and editing
  - Table view of all recipes
  - On-demand revalidation after changes

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the JSON server (REST API):
```bash
npm run serve-json
```

3. In a new terminal, start the development server:
```bash
npm run dev

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## API Endpoints

The JSON server runs on `http://localhost:4000` and provides the following endpoints:

- GET `/recipes` - Get all recipes
- GET `/recipes/:id` - Get a specific recipe
- POST `/recipes` - Create a new recipe
- PUT `/recipes/:id` - Update a recipe
- DELETE `/recipes/:id` - Delete a recipe

## Recipe Data Structure

Each recipe contains the following fields:
- `id` (string): Unique identifier
- `title` (string): Recipe name
- `cook_time_minutes` (number): Cooking duration
- `servings` (number): Number of servings
- `difficulty` (string): Cooking difficulty level (easy/medium/hard)

## Form Validation Rules

- Title: 5-50 characters
- Cook Time: 10-240 minutes
- Servings: 1-20
- Difficulty: Must be 'easy', 'medium', or 'hard'

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
