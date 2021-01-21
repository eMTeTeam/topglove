import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    constructor(private apiService: ApiService) {
    }

    load = () => {

    }
}
