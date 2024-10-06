<script lang="ts" setup>
import { Recipe } from "../api/recipeApi";

const props = defineProps<{
  recipe: Recipe | null;
}>();

// Функция для получения ингредиентов и их количества в виде массива
const ingredients = () => {
  if (!props.recipe) return [];
  const result = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = (props.recipe as Record<string, any>)[
      `strIngredient${i}`
    ];
    const measure = (props.recipe as Record<string, any>)[`strMeasure${i}`];

    // Добавляем только те ингредиенты, которые существуют (не пустые)
    if (ingredient && ingredient.trim() !== "") {
      result.push(`${ingredient} - ${measure ? measure : ""}`);
    }
  }

  return result;
};
</script>

<template>
  <div class="contain">
    <section v-if="recipe" class="recipe-details">
      <div class="title-img-section">
        <div class="meal-description">
          <h2>{{ recipe.strMeal }}</h2>
          <div class="meal-details">
            <p>{{ recipe.strCategory }}</p>
            <p>{{ recipe.strArea }}</p>
          </div>
        </div>
        <img
          :src="recipe.strMealThumb"
          :alt="recipe.strMeal"
          class="recipe-img"
        />
      </div>
      <div class="description">
        <div class="description-ingredients">
          <p><strong>Ingredients:</strong></p>
          <ul>
            <li v-for="(ingredient, index) in ingredients()" :key="index">
              {{ ingredient }}
            </li>
          </ul>
        </div>

        <div class="description-instruction">
          <p><strong>Instruction:</strong></p>
          <ol class="instruction">
            <li>{{ recipe.strInstructions }}</li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.contain {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: auto;
  margin-left: 20px;
  width: 90%;
  max-width: 600px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
}

.title-img-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}
.meal-description {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  text-align: left;
}
.meal-description h2 {
  font-size: 36px;
  font-weight: bold;
}
.meal-details {
  display: flex;
  gap: 20px;
}
.recipe-img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.description {
  width: 100%;
}

.description-ingredients,
.description-instruction {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
}

.description-ingredients strong,
.description-instruction strong {
  display: block;
  font-size: 18px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

ul li {
  margin-bottom: 5px;
  font-size: 17px;
  color: #333;
  padding-left: 10px;
  position: relative;
}

ul li::before {
  content: "•";
  color: #ff6347;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.instruction {
  padding-left: 20px;
}

ol li {
  margin-bottom: 10px;
  font-size: 17px;
}
</style>
