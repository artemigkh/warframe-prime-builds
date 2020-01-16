import {Item, Category, Drop} from 'warframe-items';
import {WarframeObject} from './WarfameObject';
import {WarframeItems} from './WarfameItems';

export class WarframeRelicDrop extends WarframeObject {
  radiantDropChance: number;
  flawlessDropChance: number;
  exceptionalDropChance: number;
  intactDropChance: number;
  drops: Drop[];
  vaulted = true;

  static getRelicDropsList(blueprintDropList: Drop[]): WarframeRelicDrop[] {
    if (blueprintDropList) {
      const seenRelics: string[] = [];
      const blueprintRelicDropList: WarframeRelicDrop[] = [];
      blueprintDropList.filter(blueprintDrop => blueprintDrop.type == 'Relics').forEach(blueprintDrop => {
        const nameComponents = blueprintDrop.location.split(' ');
        const relicName = nameComponents[0] + ' ' + nameComponents[1];
        const relicRefinement = nameComponents[2];

        if (!seenRelics.includes(relicName)) {
          seenRelics.push(relicName);
          blueprintRelicDropList.push(new WarframeRelicDrop(relicName));
        }

        blueprintRelicDropList.forEach(blueprintRelicDrop => {
          if (relicRefinement == 'Exceptional') {
            blueprintRelicDrop.exceptionalDropChance = blueprintDrop.chance;
          } else if (relicRefinement == 'Flawless') {
            blueprintRelicDrop.flawlessDropChance = blueprintDrop.chance;
          } else if (relicRefinement == 'Intact') {
            blueprintRelicDrop.intactDropChance = blueprintDrop.chance;
          } else if (relicRefinement == 'Radiant') {
            blueprintRelicDrop.radiantDropChance = blueprintDrop.chance;
          } else {
            console.warn('Unexpected refinement level: ' + relicRefinement);
          }
        });
      });

      blueprintRelicDropList.sort((a, b) => (a.vaulted && !b.vaulted) ? 1 : -1);
      return blueprintRelicDropList;
    } else {
      return [];
    }
  }

  getRecommendedLocation() {
    let recommendedLocation = this.drops[0];
    const aRotationDrops = this.drops.filter(drop => {
      return drop.rotation && drop.rotation == 'A';
    });
    if (aRotationDrops.length > 0) {
      recommendedLocation = aRotationDrops[0];
    }
    return recommendedLocation;
  }

  private constructor(name: string) {
    super();
    this.name = name;
    const relicInformation = WarframeItems.relics.filter(relic => relic.name == name + ' Intact');
    if (relicInformation.length > 0) {
      this.imageName = relicInformation[0].imageName;
      this.drops = relicInformation[0].drops;
      if (this.drops && this.drops.length > 0) {
        this.vaulted = false;
        this.drops.sort((a, b) => (a.chance > b.chance) ? -1 : 1);
      }
    } else {
      console.warn('Could not find relic with name ' + name);
      this.drops = [];
    }
  }
}
