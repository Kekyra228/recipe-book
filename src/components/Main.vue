<script lang="ts" setup>
import RecipeCard from "./RecipeCard.vue";
import { Recipe, getRecipes } from "../api/recipeApi";
import { onMounted, ref } from "vue";

// Создаем реактивную переменную для хранения данных рецептов
const recipes = ref<Recipe[]>([]);

const selectedRecipe = ref<Recipe | null>(null);

// Загружаем данные при монтировании компонента
onMounted(async () => {
  recipes.value = await getRecipes();
});

const handleClick = (currRecipe: Recipe) => {
  selectedRecipe.value = currRecipe;
  console.log("choose");
};
</script>

<template>
  <header>
    <h1>Recipe Book</h1>
    <nav>
      <!-- <ul>
        <li><a href="#">Главная</a></li>
        <li><a href="#">Все рецепты</a></li>
        <li><a href="#">Добавить рецепт</a></li>
      </ul> -->
    </nav>
  </header>

  <main>
    <section id="recipe-list" :class="{ expanded: !selectedRecipe }">
      <h2>List of recipes</h2>
      <div v-if="recipes.length === 0">loading...</div>
      <ul v-else class="list">
        <li
          v-for="recipe in recipes"
          :key="recipe.idMeal"
          @click="handleClick(recipe)"
        >
          <h2>{{ recipe.strMeal }}</h2>
        </li>
      </ul>
    </section>

    <RecipeCard v-if="selectedRecipe !== null" :recipe="selectedRecipe" />
  </main>
</template>

<style>
main {
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
header {
  background-color: #ff6347;
  color: white;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

header h1 {
  font-size: 46px;
  letter-spacing: 2px;
}

nav ul {
  list-style: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 1rem;
}

nav ul li a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

#recipe-list {
  width: 300px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-y: auto;
  max-height: 80vh;
  transition: width 0.3s ease;
}
#recipe-list.expanded {
  width: 100%;
}

#recipe-list h2 {
  font-size: 24px;
}

.list {
  list-style: none;
  padding-left: 0;
}
.list li {
  list-style-type: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  margin-left: 15px;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  transition: background-color 0.3s;
}

.list li:hover {
  background-color: #f0f0f0;
}
</style>
