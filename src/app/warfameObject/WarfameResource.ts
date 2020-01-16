import {Item, Category, Drop, Component} from 'warframe-items';
import {WarframeObject} from './WarfameObject';

export class WarframeResource extends WarframeObject {
  recipeComponents = [];
  resourceComponents = [];

  itemCount: number;

  constructor(item: WarframeResource | Component) {
    super();
    this.uniqueName = item.uniqueName;
    this.name = item.name;
    this.itemCount = item.itemCount;
    this.imageName = item.imageName;
    this.description = item.description;
  }

  getTotalQuantityRequired(): number {
    return this.itemCount;
  }
}
