import { Routes } from '@angular/router';
import { TicketList } from './ticket-list/ticket-list';
import { AddUpdateTicket } from './add-update-ticket/add-update-ticket';

export const routes: Routes = [
    { 
        path: '', 
        component: TicketList
    },
    { 
        path: 'add', 
        component: AddUpdateTicket
    },
    { 
        path: 'edit/:id', 
        component: AddUpdateTicket
    },
];
