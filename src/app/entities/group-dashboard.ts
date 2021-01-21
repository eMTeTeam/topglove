import { User } from './user';

export interface GroupDashBoard {
    dayMeasure: DayMeasure;
    user: User
};

export interface DayMeasure {
    id: string;
    intime: string;
    outtime: string;
    notedDate: string;

    healthMeasures: Array<HealthMeasure>;
}

export interface HealthMeasure {
    cough: string;
    heatRate: string;
    imageWithPPE: string;
    oxygenSaturation: string;
    runnyNose: boolean;
    shortnessBreath: boolean;
    sneezing: boolean;
    temperature: number;
    temperatureUnit: string;
    updateDateTime: string;
}