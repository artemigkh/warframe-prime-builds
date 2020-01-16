import {Item, Category, Drop, Component} from 'warframe-items';
import {WarframeObject} from './WarfameObject';
import {WarframeRelicDrop} from './WarfameRelicDrop';

export class WarfamePrimeComponent extends WarframeObject {
  relicDrops: WarframeRelicDrop[];
  blueprintUniqueName = null;

  constructor(item: Component, relicDrops: WarframeRelicDrop[], parentRecipeName: string) {
    super();
    this.uniqueName = item.uniqueName;
    this.name = parentRecipeName + ' ' + item.name;
    this.imageName = item.imageName;
    this.description = item.description;
    this.relicDrops = relicDrops;
  }
}
