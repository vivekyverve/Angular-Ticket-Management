import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketValue } from '../Interfaces/ticket-value';
import { Ticket } from '../Services/ticket';
import { EstimatedHoursValidation } from '../Directives/estimated-hours-validation';
import { PercentageValidation } from '../Directives/percentage-validation';

@Component({
  selector: 'app-add-update-ticket',
  imports: [CommonModule, ReactiveFormsModule, EstimatedHoursValidation, PercentageValidation],
  templateUrl: './add-update-ticket.html',
  styleUrl: './add-update-ticket.css',
})
export class AddUpdateTicket implements OnInit {
  ticketForm!: FormGroup;

  editId: number | null = null;

  invalidTracker = false;
  allowedTracker = ['New Request', 'Support'];

  invalidStatus = false;
  allowedStatus = ['New', 'In Progress', 'Resolved'];

  invalidPriority = false;
  allowedPriority = ['Normal', 'Urgent', 'Immediate'];

  invalidAssignee = false;
  allowedAssignee = ['Vivek', 'Shivanshu', 'Anuj'];


  constructor(private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private ticketService: Ticket) { }

  trackerOptions: string[] = ['New Request', 'Support'];
  statusOptions: string[] = ['New', 'In Progress', 'Resolved'];
  priorityOptions: string[] = ['Normal', 'Urgent', 'Immediate'];
  assigneeOption: string[] = ['Vivek', 'Shivanshu', 'Anuj'];

  // THIS FUNCTION IS FOR VALIDATING TRACKER

  validTracker() {
    const tracker = this.ticketForm.get('tracker')?.value;

    this.invalidTracker = !this.allowedTracker.includes(tracker);

    if (this.invalidTracker) {
      this.ticketForm.get('tracker')?.setErrors({ invalid: true });
    } else {
      this.ticketForm.get('tracker')?.setErrors(null);

    }
  }

  // THIS FUNCTION IS FOR VALIDATING STATUS

  validStatus() {
    const status = this.ticketForm.get('status')?.value;

    this.invalidStatus = !this.allowedStatus.includes(status);

    if (this.invalidStatus) {
      this.ticketForm.get('status')?.setErrors({ invalid: true });
    } else {
      this.ticketForm.get('status')?.setErrors(null);
    }
  }

  // THIS FUNCTION IS FOR VALIDATING PRIORITY

  validPriority() {
    const priority = this.ticketForm.get('priority')?.value;

    this.invalidPriority = !this.allowedPriority.includes(priority);

    if (this.invalidPriority) {
      this.ticketForm.get('priority')?.setErrors({ invalid: true });
    } else {
      this.ticketForm.get('priority')?.setErrors(null);
    }
  }

  // THIS FUNCTION IS FOR VALIDATING ASSIGNEE

  validAssignee() {
    const assignee = this.ticketForm.get('assignee')?.value;

    this.invalidAssignee = !this.allowedAssignee.includes(assignee);

    if (this.invalidAssignee) {
      this.ticketForm.get('assignee')?.setErrors({ invalid: true });
    } else {
      this.ticketForm.get('assignee')?.setErrors(null);
    }
  }

  // THIS FUNCTION IS FOR SELECTING TRACKER IN MODEL

  selectTracker(tracker: string){
    this.ticketForm.patchValue({
      tracker: tracker
    });
  }


  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      tracker: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      assignee: ['', Validators.required],
      startDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      updatedDate: [],
      progress: ['', Validators.required],
      estimatedHours: ['', Validators.required],
    });

    const id = this.activeRoute.snapshot.paramMap.get('id');

    if (id) {
      this.editId = +id;

      const ticket = this.ticketService.getTicketById(this.editId);

      if (ticket) {
        this.ticketForm.patchValue(ticket);
      }
    }
  }

  onSubmit(): void {

    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    if (this.ticketForm.valid) {

      if (this.editId !== null) {

        const updateTicket: TicketValue = {

          id: this.editId, ...this.ticketForm.value
        };

        this.ticketService.updateTicket(updateTicket);

        console.log('Tickets is Updated Successfully');


      } else {
        const newTicket: TicketValue = {

          id: new Date().getTime(), ... this.ticketForm.value

        };

        this.ticketService.addTicket(newTicket);

        console.log('Tickets is added Successfully');

      }
      this.router.navigate(['/'])
    }
  }
}
