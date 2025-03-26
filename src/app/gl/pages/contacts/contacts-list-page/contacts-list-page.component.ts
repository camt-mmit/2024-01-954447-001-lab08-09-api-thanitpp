import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Person } from '../../../models/contacts';
import { ContactsService } from '../../../services/contacts.service';

@Component({
  selector: 'app-contacts-list-page',
  imports: [CommonModule, RouterModule],
  templateUrl: './contacts-list-page.component.html',
  styleUrl: './contacts-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsListPageComponent implements OnInit {
  contacts: Person[] = [];
  isLoading = true;

  constructor(
    private contactsService: ContactsService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.contactsService.getContacts().subscribe({
      next: (response) => {
        this.contacts = response.connections || [];
        this.isLoading = false;
        console.log('Fetched contacts:', this.contacts);
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching contacts:', err);
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
