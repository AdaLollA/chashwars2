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

    private priceCache: IApiPrice[] = null;
    private itemCache: IApiItem[] = null;

    constructor(private http: HttpClient) {
        // todo this is testing
        this.loadPricesWithItemData(['19704', '68', '69']);
    }

    /**
     * Loads the item information (prices and details) into the cache.
     * @param ids The ids of which you want to receive the information on.
     */
    public loadPricesWithItemData(ids: string[]) {
        this.getPrices(ids).subscribe(apiPrice => {
            this.priceCache = apiPrice;
            this.mergeData();
        });
        this.getItems(ids).subscribe(apiItems => {
            this.itemCache = apiItems;
            this.mergeData();
        });
    }

    private mergeData(force = false) {
        if (force || (this.priceCache && this.itemCache)) {
            this.items = this.priceCache.map((item, id) => Object.assign({}, item, this.itemCache[id]));
        }
    }

    /**
     * Fetches the prices from the gw2 api.
     * @param ids The ids of which you want to receive the price information on.
     */
    private getPrices(ids: string[]) {
        return this.http.get<IApiPrice[]>(`${this.url}commerce/prices?ids=${this.arrayToCsv(ids)}`);
    }

    /**
     * Fetches the item details from the gw2 api such as icons, names, etc.
     * @param ids The ids of which you want to receive the details on.
     */
    private getItems(ids: string[]) {
        return this.http.get<IApiItem[]>(`${this.url}items?ids=${this.arrayToCsv(ids)}`);
    }

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
}
