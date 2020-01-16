import Items, {Item, Category, Drop} from 'warframe-items';

export class WarframeItems {
  static itemMap: { [name: string]: Item } = (new Items({category: ['All']})).reduce((map, item) => {
    map[item.uniqueName] = item;
    return map;
  }, {});
  static recipes = (new Items({category: ['All']})).filter(
    item => item.components && item.components.length > 0 && item.vaultDate);
  static relics = new Items({category: ['Relics']});

  static getSearchMatches(search: string): Item[] {
    return WarframeItems.recipes.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  }
}
