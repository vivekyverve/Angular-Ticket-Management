import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TicketValue } from '../Interfaces/ticket-value';

@Injectable({
  providedIn: 'root',
})
export class Ticket {

  private ticketSubject = new BehaviorSubject<TicketValue[]>([]);

  tickets$ = this.ticketSubject.asObservable();

  constructor(){
    const data = localStorage.getItem('tickets');

    if(data){
      this.ticketSubject.next(JSON.parse(data))
    }
  }

  private updateLocalStorage(tickets:TicketValue[]){
    localStorage.setItem('tickets', JSON.stringify(tickets));
    console.log('Local_storage is updated Successfully')

  }

  getTickets(){
    return this.ticketSubject.value;

  }
  
  addTicket(ticket: TicketValue){
    const tickets = [...this.getTickets(), ticket];

    this.ticketSubject.next(tickets);

    this.updateLocalStorage(tickets)

    // console.log('Ticket is added Successfully');
  }

  updateTicket(updateTicket: TicketValue){
    const tickets = this.getTickets().map(ticket => 
      ticket.id === updateTicket.id ? updateTicket : ticket
    );

    this.ticketSubject.next(tickets);
    this.updateLocalStorage(tickets);

    // console.log('Ticket is updated Successfully');
  }

  getTicketById(id: number){
    console.log('Getting Ticket of Specific ID');

    return this.getTickets().find(ticket => ticket.id === id);
  }

  deleteTicket(id: number){
    const tickets = this.getTickets().filter(ticket => ticket.id !== id);

    this.ticketSubject.next(tickets);
    this.updateLocalStorage(tickets);
    // console.log('Ticket is Deleted From the Local-Storage');

  }
}
