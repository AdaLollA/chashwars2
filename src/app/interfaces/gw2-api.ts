export interface IDetails {
    type: string;
}

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
    details: IDetails;
}

export interface IBuys {
    quantity: number;
    unit_price: number;
}

export interface ISells {
    quantity: number;
    unit_price: number;
}

export interface IPrice {
    id: number;
    whitelisted: boolean;
    buys: IBuys;
    sells: ISells;
}
