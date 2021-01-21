import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SlotsService {

    private _count: number = 0;
    private _id: string = '';

    constructor() { }

    set count(c: number) {
        this._count = c;
    }

    get count(): number {
        return this._count;
    }

    set id(slotId: string) {
        this._id = slotId;
    }

    get id(): string {
        return this._id;
    }

}
