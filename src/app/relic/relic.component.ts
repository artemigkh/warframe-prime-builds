import {Component, Input} from '@angular/core';
import {WarframeRelicDrop} from '../warfameObject/WarfameRelicDrop';

@Component({
  selector: 'app-relic',
  templateUrl: './relic.component.html',
  styleUrls: ['./relic.component.scss'],
})
export class RelicComponent {
  @Input() relic: WarframeRelicDrop;

  getFormattedDropChance(chance: number) {
    return (chance * 100).toFixed(2);
  }
}
