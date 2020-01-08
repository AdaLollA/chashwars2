import {IApiBuys, IApiDetails, IApiPrice, IApiSells} from './gw2-api';

export interface IItem {
    name: string;
    description: string;
    type: string;
    level: number;
    rarity: string;
    vendor_value: number;
    game_types: string[];
    flags: any[];
    restrictions: any[];
    id: number;
    chat_link: string;
    icon: string;
    details: IApiDetails;
    whitelisted: boolean;
    buys: IApiBuys;
    sells: IApiSells;
}
