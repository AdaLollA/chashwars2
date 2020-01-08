import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular-devkit/schematics';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    // https://api.guildwars2.com/v2/items?ids=24,68
    // https://api.guildwars2.com/v2/commerce/prices?page=0&page_size=200

    // https://wiki.guildwars2.com/wiki/Mystic_Forge/Material_Promotion
    // https://wiki.guildwars2.com/wiki/Mystic_Forge/Material_Promotion#Cloth_Scraps

    private url: string = 'https://api.guildwars2.com/v2/';

    constructor(private http: HttpClient) {
      this.getPrices(['24','68', '69']).subscribe(value => {
        console.log(value);
      });
    }

    public getPrices(ids: string[]) {
        return this.http.get(`${this.url}commerce/prices?ids=${this.arrayToCsv(ids)}`);
    }

  /**
   * Transforms ['1','2','3'] arrays into '1,2,3' strings
   * @param array Array that is to be converted to csv.
   */
  private arrayToCsv(array: string[]): string {
        let str: string = '';
        array.forEach((value, index) => {
            str += value + (index < array.length-1 ? ',' : '');
        });
        return str;
    }

    /*
    searchData(title: string, type: SearchType): Observable<any> {
      return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
        map(results => results['Search'])
      );
    }
     */
}
