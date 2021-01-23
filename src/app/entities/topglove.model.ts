export interface TopGlovEntity {
    SerialNo: number,
    Date: Date,
    User: string,
    Former: string,
    Size: string,
    Factory: string,
    FiringType: string | null | undefined,
    DefectType: string | null | undefined,
    Accept: boolean
}