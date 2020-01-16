import {Component, EventEmitter, Output} from '@angular/core';
import {Item} from 'warframe-items';
import {FormControl, FormGroup} from '@angular/forms';
import {WarframeItems} from '../warfameObject/WarfameItems';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  buildItem: Item;
  @Output() buildItemChange = new EventEmitter<string>();

  form: FormGroup = new FormGroup({
    searchString: new FormControl(''),
  });

  constructor() {
    this.buildItem = WarframeItems.itemMap['/Lotus/Powersuits/Cowgirl/MesaPrime'];
  }

  getSearchMatches(): Item[] {
    if (this.form.get('searchString').value.length > 0) {
      return WarframeItems.getSearchMatches(this.form.get('searchString').value).slice(0, 10);
    } else {
      return [];
    }
  }

  setActiveBuildObject(item: Item) {
    this.buildItem = item;
    this.buildItemChange.emit(item.uniqueName);
    this.form.setValue({searchString: ''});
  }
}
