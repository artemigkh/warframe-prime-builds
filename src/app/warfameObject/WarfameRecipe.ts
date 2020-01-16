import {Item, Category, Drop, Component} from 'warframe-items';
import {WarframeObject} from './WarfameObject';
import {WarframeResource} from './WarfameResource';
import {WarframeItems} from './WarfameItems';
import {WarframeRelicDrop} from './WarfameRelicDrop';
import {WarfamePrimeComponent} from './WarfamePrimeComponent';

enum ItemType {
  Recipe,
  PrimeComponent,
  ResourceComponent,
  Blueprint,
  Unknown
}

function isItemRecipe(item: Item): boolean {
  if (item.consumeOnBuild && item.components && item.components.length > 0) {
    let containsBlueprint = false;
    item.components.forEach(component => {
      if (component.name == 'Blueprint') {
        containsBlueprint = true;
      }
    });
    return containsBlueprint;
  } else {
    return false;
  }
}

function getItemType(item: Component): ItemType {
  if (item.uniqueName.includes('/WeaponParts/')) {
    return ItemType.PrimeComponent;
  } else if (item.name == 'Blueprint') {
    return ItemType.Blueprint;
  } else {
    const itemToCheck = WarframeItems.itemMap[item.uniqueName];
    if (itemToCheck == null) {
      return ItemType.Unknown;
    } else if (isItemRecipe(itemToCheck)) {
      return ItemType.Recipe;
    } else {
      return ItemType.ResourceComponent;
    }
  }
}

export class WarframeRecipe extends WarframeObject {
  recipeComponents: WarframeRecipe[] = [];
  resourceComponents: WarframeResource[] = [];
  primeComponents: WarfamePrimeComponent[] = [];

  blueprintUniqueName: string;
  buildPrice: number;
  buildTime: number;
  skipBuildTimePrice: number;
  tradable: boolean;
  relicDrops: WarframeRelicDrop[] = [];

  constructor(item: Item, relicDrops?: WarframeRelicDrop[]) {
    super();
    this.uniqueName = item.uniqueName;
    this.name = item.name;
    this.imageName = item.imageName;
    this.description = item.description;
    this.buildPrice = item.buildPrice;
    this.buildTime = item.buildTime;
    this.skipBuildTimePrice = item.skipBuildTimePrice;
    this.tradable = item.tradable;
    if (relicDrops) {
      this.relicDrops = relicDrops;
    }
    this.processComponents(item);
  }

  getAllRelicDerivedComponents(): (WarframeRecipe | WarfamePrimeComponent)[] {
    let relicDerivedComponents: (WarframeRecipe | WarfamePrimeComponent)[] = [this];
    relicDerivedComponents = relicDerivedComponents.concat(this.primeComponents);
    this.recipeComponents.forEach(component => {
      relicDerivedComponents = relicDerivedComponents.concat(component.getAllRelicDerivedComponents());
    });
    return relicDerivedComponents;
  }

  getAllRecipeComponents(): WarframeRecipe[] {
    let recipeComponents: WarframeRecipe[] = [this];
    this.recipeComponents.forEach(component => {
      recipeComponents = recipeComponents.concat(component.getAllRecipeComponents());
    });
    return recipeComponents;
  }

  private processComponents(item: Item) {
    item.components.forEach(component => {
      switch (getItemType(component)) {
        case ItemType.Recipe:
          this.recipeComponents.push(new WarframeRecipe(
            WarframeItems.itemMap[component.uniqueName],
            WarframeRelicDrop.getRelicDropsList(component.drops)
          ));
          break;
        case ItemType.PrimeComponent:
          this.primeComponents.push(new WarfamePrimeComponent(
            component,
            WarframeRelicDrop.getRelicDropsList(component.drops),
            this.name
          ));
          break;
        case ItemType.ResourceComponent:
          this.resourceComponents.push(new WarframeResource(component));
          break;
        case ItemType.Blueprint:
          this.blueprintUniqueName = component.uniqueName;
          if (this.relicDrops.length == 0) {
            this.relicDrops = WarframeRelicDrop.getRelicDropsList(component.drops);
          }
          break;
        default:
          console.warn('Could not determine type for component ', component);
      }
    });
  }

  getTotalResourcesRequired(): WarframeResource[] {
    const totalResources: WarframeResource[] = [];
    this.resourceComponents.forEach(resource => {
      this.mergeResourceIntoList(resource, totalResources);
    });

    this.recipeComponents.forEach(recipe => {
      recipe.getTotalResourcesRequired().forEach(resource => {
        this.mergeResourceIntoList(resource, totalResources);
      });
    });

    return totalResources;
  }

  private mergeResourceIntoList(resource: WarframeResource, resourceList: WarframeResource[]) {
    let alreadyExists = false;
    resourceList.forEach(resourceInList => {
      if (resource.uniqueName == resourceInList.uniqueName) {
        resourceInList.itemCount += resource.getTotalQuantityRequired();
        alreadyExists = true;
      }
    });
    if (!alreadyExists) {
      resourceList.push(new WarframeResource(resource));
    }
  }
}
