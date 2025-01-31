export interface Item {
    _id?: string;
    name: string;
    brand: string;
    series?: string;
    character?: string;
    type?: string;
    condition?: string;
    tags?: string;
    photo?: string | null;
    edition?: string;
}
