import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular-devkit/schematics';
import {map} from 'rxjs/operators';
import {IItem} from '../interfaces/frontend';
import {IApiItem, IApiPrice} from '../interfaces/gw2-api';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    // https://api.guildwars2.com/v2/items?ids=24,68
    // https://api.guildwars2.com/v2/commerce/prices?page=0&page_size=200

    // https://wiki.guildwars2.com/wiki/Mystic_Forge/Material_Promotion
    // https://wiki.guildwars2.com/wiki/Mystic_Forge/Material_Promotion#Cloth_Scraps

    private url: string = 'https://api.guildwars2.com/v2/';

    public items: IItem[] = null;

    constructor(private http: HttpClient) {
        this.loadPricesWithItemData(['19704', '68', '69']).subscribe(res => {
            console.log(res, 'DATA');
        });
    }

    public loadPricesWithItemData(ids: string[]) {
        console.log('init');
        return new Observable<IItem[]>(subscriber => {
            this.getPrices(ids).subscribe(apiPrice => {
                console.log(apiPrice, 'PRICE');
                this.getItems(ids).subscribe(apiItems => {
                    console.log(apiItems, 'ITEMS');
                });
            });
        });
    }

    public getPrices(ids: string[]) {
        return this.http.get<IApiPrice[]>(`${this.url}commerce/prices?ids=${this.arrayToCsv(ids)}`);
    }

    public getItems(ids: string[]) {
        return this.http.get<IApiItem[]>(`${this.url}items?ids=${this.arrayToCsv(ids)}`);
    }

    /*
    map(actions => {
                return actions.map(a => {
                    const data = a.payload.doc.data() as TimelineObject;
                    const id = a.payload.doc.id;
                    return {id, ...data};
                });
            })
     */

    /**
     * Transforms ['1','2','3'] arrays into '1,2,3' strings
     * @param array Array that is to be converted to csv.
     */
    private arrayToCsv(array: string[]): string {
        let str: string = '';
        array.forEach((value, index) => {
            str += value + (index < array.length - 1 ? ',' : '');
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
