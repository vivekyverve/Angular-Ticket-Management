export interface TicketValue {
    id: number;
    tracker: string;
    subject: string;
    description: string;
    status: string;
    priority: string;
    assignee: string;
    startDate: string;
    dueDate: string;
    updatedDate: string;
    progress: number,
    estimatedHours: number;
}
