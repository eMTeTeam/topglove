export interface User {
    id: string;
    organizationId: string;
    isOrganizationAdmin: boolean;
    email: string;
    name: string;
    dateOfBirth: Date;
    displayPicture?: any;
    address?: any;
    phoneNumber?: any;
    nationality?: any;
    roleDescription?: any;
    alreadyInfected: boolean;
    infectedFrom?: any;
    infectedTo?: any;
    teamId: string;
}