import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Butterbrot', 'Food of Gods',
      'https://ladyeve.ru/wp-content/uploads/2012/02/kolbasnyiy-buterbrod.jpg',
      [new Ingredient('butter', 100), new Ingredient('bread', 1), new Ingredient('saussage', 1)]),
    new Recipe('Butterbrot with salo', 'Less godlike but still the foot of Gods',
      'https://znaj.ua/crops/a580aa/620x0/1/0/2019/02/19/wKf2FFhkJWVsKz8V8X25Wdd0u3ivyVWPRtcF9ziP.jpeg',
      [new Ingredient('salo', 50), new Ingredient('bread', 1), new Ingredient('garlic', 1)])
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
