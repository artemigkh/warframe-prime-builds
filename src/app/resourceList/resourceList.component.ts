import {Component, Input} from '@angular/core';
import {WarframeRecipe} from '../warfameObject/WarfameRecipe';
import {WarframeResource} from '../warfameObject/WarfameResource';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resourceList.component.html',
  styleUrls: ['./resourceList.component.scss'],
})
export class ResourceListComponent {
  @Input() buildObject: WarframeRecipe;

  getSortedResourceList(): WarframeResource[] {
    if (this.buildObject) {
      return this.buildObject.getTotalResourcesRequired().sort((a, b) => (a.itemCount > b.itemCount) ? 1 : -1);
    } else {
      return [];
    }
  }

  trackByFn = (index: number, item: any) => index;
}
