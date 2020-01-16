import {Component, Input} from '@angular/core';
import {WarframeResource} from '../warfameObject/WarfameResource';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
})
export class ResourceComponent {
  @Input() resource: WarframeResource;
}
