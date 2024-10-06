export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

export async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  if (!res.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await res.json();
  // Приводим результат к массиву объектов типа Recipe
  return data.meals as Recipe[];
}
