import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule, MatCheckboxModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatTableModule, MatTabsModule, MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchComponent} from './search/search.component';
import {RelicComponentsComponent} from './relicComponents/relicComponents.component';
import {RecipeComponent} from './recipe/recipe.component';
import {RelicComponent} from './relic/relic.component';
import {WarfameMarketService} from './warfameObject/WarfameMarketService';
import {ResourceComponent} from './resource/resource.component';
import {ResourceListComponent} from './resourceList/resourceList.component';
import {BuildTreeComponent} from './buildTree/buildTree.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    RelicComponentsComponent,
    RecipeComponent,
    RelicComponent,
    ResourceComponent,
    ResourceListComponent,
    BuildTreeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDividerModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatTooltipModule,
    MatCheckboxModule,
    FormsModule
  ],
  providers: [WarfameMarketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
