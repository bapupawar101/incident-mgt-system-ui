export interface Incidents {
    id: number,
    name: string,
    description:string,
    status: number,
    symptoms: string,
    requesterId: number,
    tenantId: number,
    priority: number,
    urgency: number,
    createdDate: string
}
