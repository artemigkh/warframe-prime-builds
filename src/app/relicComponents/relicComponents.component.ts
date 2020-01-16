import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {WarframeRecipe} from '../warfameObject/WarfameRecipe';
import {WarframeRelicDrop} from '../warfameObject/WarfameRelicDrop';
import {WarfameMarketService} from '../warfameObject/WarfameMarketService';
import {WarfamePrimeComponent} from '../warfameObject/WarfamePrimeComponent';

@Component({
  selector: 'app-relic-components',
  templateUrl: './relicComponents.component.html',
  styleUrls: ['./relicComponents.component.scss'],
})
export class RelicComponentsComponent implements OnChanges {
  @Input() buildObject: WarframeRecipe;
  @Output() activeRelicChange = new EventEmitter<WarframeRelicDrop>();
  marketAveragePriceMap: { [uniqueName: string]: number };
  showVaulted = true;
  activeRelicName: string;

  constructor(private marketService: WarfameMarketService) {
  }

  getRelicData(relicDrops: WarframeRelicDrop[]): WarframeRelicDrop[] {
    return relicDrops.filter(drop => !drop.vaulted || this.showVaulted);
  }


  getFormattedName(drop: WarframeRelicDrop) {
    return drop.name + (drop.vaulted ? ' (Vaulted)' : '');
  }

  getFormattedDropChance(drop: WarframeRelicDrop) {
    return (drop.intactDropChance * 100).toFixed(0) + ' / ' +
      (drop.flawlessDropChance * 100).toFixed(0) + ' / ' +
      (drop.exceptionalDropChance * 100).toFixed(0) + ' / ' +
      (drop.radiantDropChance * 100).toFixed(0);
  }

  getFormattedRelicLocation(drop: WarframeRelicDrop) {
    if (drop.vaulted) {
      return '';
    } else {
      const bestLocation = drop.getRecommendedLocation();
      return bestLocation.location + ' [Rotation ' + bestLocation.rotation + '] (' + (bestLocation.chance * 100).toFixed(0) + '%)';
    }
  }

  selectRelic(relic: WarframeRelicDrop) {
    this.activeRelicChange.emit(relic);
    this.activeRelicName = relic.name;
    console.log('selecting relic:');
    console.log(relic);
  }

  getMarketPrice(item: WarframeRecipe | WarfamePrimeComponent): number {
    if (this.marketAveragePriceMap[item.blueprintUniqueName]) {
      return this.marketAveragePriceMap[item.blueprintUniqueName];
    } else if (this.marketAveragePriceMap[item.uniqueName]) {
      return this.marketAveragePriceMap[item.uniqueName];
    } else {
      return -1;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.buildObject);
    if (this.buildObject.tradable) {
      this.marketService.getAverageMarketPrice(this.buildObject).subscribe(
        marketAveragePriceMap => this.marketAveragePriceMap = marketAveragePriceMap,
        error => console.warn(error)
      );
    }
  }
}

