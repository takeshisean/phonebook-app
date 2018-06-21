
export interface PhoneBookDT {
    _id: string;
    lastName: string;
    firstName: string;
    number: string;
    phoneType: PhoneTypeDT;
    createdAt: Date;
    __v: number;
}

export interface PhoneTypeDT {
    _id: string;
    type: string;
    __v: number;
}
