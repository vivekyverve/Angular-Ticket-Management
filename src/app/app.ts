import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
// import { AddUpdateTicket } from './add-update-ticket/add-update-ticket';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ticket-Management');
}
