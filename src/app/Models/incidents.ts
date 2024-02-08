export interface Incidents {
    id: number,
    name: string,
    description:string,
    status: number,
    statusDisplayName: string,
    symptoms: string,
    requesterId: number,
    tenantId: number,
    priority: number,
    urgency: number,
    createdDate: string,
    cityId: number,        
    priorityId: number,
    priorityDisplayName: string,
    urgencyId: number,
    urgencyDisplayName: string,
}

export enum IncidentStatus
{
    New = 0,
    Assigned,
    InProgress,
    Resolved,
    Closed,
    Cancelled,
    Rejected
}

export function getStatusEnumText(enumValue: number): string {
    const enumText = Object.keys(IncidentStatus).find(key => IncidentStatus[key] === enumValue);
    return enumText || 'Unknown';
}

export enum Priority
{
    High = 0,
    Medium = 1,
    Low = 2,
}

export function getPriorityEnumText(enumValue: number): string {
    const enumText = Object.keys(Priority).find(key => Priority[key] === enumValue);
    return enumText || 'Unknown';
}

export enum Urgency
{
    High = 0,
    Medium = 1,
    Low = 2,
}

export function getUrgencyEnumText(enumValue: number): string {
    const enumText = Object.keys(Urgency).find(key => Urgency[key] === enumValue);
    return enumText || 'Unknown';
}