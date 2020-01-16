import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material';
import {WarframeRecipe} from '../warfameObject/WarfameRecipe';
import {WarframeObject} from '../warfameObject/WarfameObject';

@Component({
  selector: 'app-build-tree',
  templateUrl: './buildTree.component.html',
  styleUrls: ['./buildTree.component.scss'],
})
export class BuildTreeComponent implements OnInit, OnChanges {
  @Input() buildObject: WarframeRecipe;
  treeControl = new NestedTreeControl<WarframeObject>(node => node.getAllComponents());
  dataSource = new MatTreeNestedDataSource<WarframeObject>();

  ngOnInit(): void {
    this.dataSource.data = [this.buildObject];
    this.treeControl.dataNodes = [this.buildObject];
    console.log('in build tree component');
    console.log(this.dataSource.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.buildObject);
    this.dataSource.data = [this.buildObject];
    this.treeControl.dataNodes = [this.buildObject];
  }

  hasChild = (_: number, node: WarframeObject) => {
    return node.getAllComponents().length > 0;
  }
}
