import { Component, OnInit, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TicketValue } from '../Interfaces/ticket-value';
import { Ticket } from '../Services/ticket';
import { EstimatedHoursValidation } from '../Directives/estimated-hours-validation';
import { PercentageValidation } from '../Directives/percentage-validation';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap/modal';


@Component({
  selector: 'app-add-update-ticket',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, EstimatedHoursValidation, PercentageValidation,],
  templateUrl: './add-update-ticket.html',
  styleUrl: './add-update-ticket.css',
  encapsulation: ViewEncapsulation.None,
})
export class AddUpdateTicket implements OnInit {
  ticketForm!: FormGroup;

  editId: number | null = null;

  selectedTracker: string = '';

  invalidTracker = false;
  allowedTracker = ['New Request', 'Support'];

  invalidStatus = false;
  allowedStatus = ['New', 'In Progress', 'Resolved'];

  invalidPriority = false;
  allowedPriority = ['Normal', 'Urgent', 'Immediate'];

  invalidAssignee = false;
  allowedAssignee = ['Vivek', 'Shivanshu', 'Anuj'];


  constructor(private fb: FormBuilder, private router: Router, private activeRoute: ActivatedRoute, private ticketService: Ticket, config: NgbModalConfig,
    private modalService: NgbModal,) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  // trackerOptions: string[] = ['New Request', 'Support'];

  trackerOptions: any[] = [
    { id: 1, name: 'New Request' },
    { id: 2, name: 'Support' }
  ];

  // statusOptions: string[] = ['New', 'In Progress', 'Resolved'];

  statusOptions: any[] = [
    { id: 1, name: 'New' },
    { id: 2, name: 'In Progress' },
    { id: 3, name: 'Resolved' }
  ];

  // priorityOptions: string[] = ['Normal', 'Urgent', 'Immediate'];

  priorityOptions: any[] = [
    { id: 1, name: 'Normal' },
    { id: 2, name: 'Urgent' },
    { id: 3, name: 'Immediate' }
  ];

  // assigneeOption: string[] = ['Vivek', 'Shivanshu', 'Anuj'];

  assigneeOption: any[] = [
    { id: 1, name: 'Vivek' },
    { id: 2, name: 'Shivanshu' },
    { id: 3, name: 'Anuj' },
  ];

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

  // selectTracker(tracker: string) {
  //   this.ticketForm.patchValue({
  //     tracker
  //   });
  //   this.modalService.dismissAll()
  // }

  openModel(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });

    console.log('NG-Bootstrap Model is open for Tracker field');
  }

  selectTracker(tracker: string) {
    this.selectedTracker = tracker
  }

  saveTracker(){
    this.ticketForm.patchValue({
      tracker: this.selectedTracker
    });
  }

  ngOnInit(): void {
    this.loadForm();

    const id = this.activeRoute.snapshot.paramMap.get('id');

    if (id) {
      this.editId = +id;

      const ticket = this.ticketService.getTicketById(this.editId);

      if (ticket) {
        this.ticketForm.patchValue(ticket);
      }
    }
  }

  loadForm() {
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

    console.log('Ticket creation form is loaded successfully');

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

        console.log('New Tickets is added Successfully');

      }
      this.router.navigate(['/'])
    }
  }
}
