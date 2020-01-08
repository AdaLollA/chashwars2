export interface IApiDetails {
    type: string;
}

export interface IApiItem {
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
}

export interface IApiBuys {
    quantity: number;
    unit_price: number;
}

export interface IApiSells {
    quantity: number;
    unit_price: number;
}

export interface IApiPrice {
    id: number;
    whitelisted: boolean;
    buys: IApiBuys;
    sells: IApiSells;
}

export interface IApiMaterials {
    id: number;
    name: string;
    items: number[];
    order: number;
}
