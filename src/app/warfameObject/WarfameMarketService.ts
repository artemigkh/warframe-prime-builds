import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WarframeRecipe} from './WarfameRecipe';

@Injectable()
export class WarfameMarketService {
  private static baseMarketUrl = 'https://cors-anywhere.herokuapp.com/https://api.nexushub.co/warframe/v1/items/';

  constructor(private http: HttpClient) {
  }

  getAverageMarketPrice(item: WarframeRecipe): Observable<{ [uniqueName: string]: number }> {
    return new Observable(observer => {
      this.http.get(WarfameMarketService.baseMarketUrl + encodeURI(item.name)).subscribe(
        (marketInfo: object) => {
          console.log(marketInfo);
          const averagePriceMap: { [uniqueName: string]: number } = {};
          (marketInfo['components'] as object[]).forEach(component => {
            const averagePrice = component['prices']['selling']['current']['median'];
            if (averagePrice) {
              averagePriceMap[component['uniqueName']] = averagePrice;
            }
          });
          observer.next(averagePriceMap);
          observer.complete();
        },
        (error: HttpErrorResponse) => {
          observer.error(error);
          observer.complete();
        }
      );
    });
  }
}
