import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TicketValue } from '../Interfaces/ticket-value';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Ticket } from '../Services/ticket';

@Component({
  selector: 'app-ticket-list',
  imports: [CommonModule, RouterModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatTooltipModule],
  templateUrl: './ticket-list.html',
  styleUrl: './ticket-list.css',
})
export class TicketList implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  tickets: TicketValue[] = [];
  paginatorOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['id', 'status', 'tracker', 'priority', 'subject', 'description', 'assignee', 'startDate', 'dueDate', 'updatedDate', 'progress', 'estimatedHours', 'action'];

  dataSource = new MatTableDataSource<TicketValue>(this.tickets);

  selectedTicketId!: number;

  constructor(private ticketService: Ticket) { }

  ngOnInit(): void {
    this.loadTickets();
  }


  loadTickets() {
    this.ticketService.tickets$.subscribe((tickets) => {
      this.tickets = tickets;
      this.dataSource.data = tickets;
      console.log('Tickets are loaded Successfully');
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTicket(id: number): void {

    this.ticketService.deleteTicket(id);

    console.log('Tickets is Deleted from the Local-Storage');
  }

  openDeleteModal(id: number): void {
    this.selectedTicketId = id;
  }

  confirmDelete(): void {
    if (this.selectedTicketId) {
      this.deleteTicket(this.selectedTicketId);
    }
  }
}


