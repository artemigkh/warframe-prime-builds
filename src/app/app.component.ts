import { Component } from '@angular/core';
import {WarframeRecipe} from './warfameObject/WarfameRecipe';
import {WarframeItems} from './warfameObject/WarfameItems';
import {WarframeRelicDrop} from './warfameObject/WarfameRelicDrop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  buildObject: WarframeRecipe;
  activeRelic: WarframeRelicDrop;

  constructor() {
    this.buildObject = new WarframeRecipe(WarframeItems.itemMap['/Lotus/Powersuits/Cowgirl/MesaPrime']);
    // console.log(WarframeItems.itemMap['/Lotus/Powersuits/Cowgirl/MesaPrime']);
    // console.log(this.buildObject);
    // console.log(this.buildObject.getAllRelicDerivedComponents());
    // // console.log(new WarframeRecipe(WarframeItems.itemMap['/Lotus/Weapons/Tenno/Akimbo/AkLexPrimePistols']));
  }

  setActiveBuildObject(uniqueName: string) {
    this.buildObject = new WarframeRecipe(WarframeItems.itemMap[uniqueName]);
  }

  setActiveRelic(relic: WarframeRelicDrop) {
    this.activeRelic = relic;
  }
}
