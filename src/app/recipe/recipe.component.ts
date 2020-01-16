import {Component, Input} from '@angular/core';
import {WarframeRecipe} from '../warfameObject/WarfameRecipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  @Input() recipe: WarframeRecipe;
  @Input() displayCost = true;

  getCreditIconUrl(): string {
    return 'assets/credits.png';
  }

  getPlatinumIconUrl(): string {
    return 'assets/platinum.png';
  }
}

