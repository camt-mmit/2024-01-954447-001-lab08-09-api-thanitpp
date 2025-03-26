import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateContactRequest } from '../../../models/contacts';
import { ContactsService } from '../../../services/contacts.service';

@Component({
  selector: 'app-contact-create-page',
  imports: [FormsModule],
  templateUrl: './contacts-create-page.component.html',
  styleUrls: ['./contacts-create-page.component.scss'],
})
export class ContactCreatePageComponent {
  contact: {
    givenName?: string;
    familyName?: string;
    email?: string;
    phoneNumber?: string;
  } = {};

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private contactsService = inject(ContactsService);

  ngOnInit() {
    console.log('Create page initial contact:', this.contact);
  }

  onSubmit() {
    const newContact: CreateContactRequest = {
      names: [
        {
          givenName: this.contact.givenName,
          familyName: this.contact.familyName,
        },
      ],
      emailAddresses: this.contact.email ? [{ value: this.contact.email }] : [],
      phoneNumbers:
        this.contact.phoneNumber ? [{ value: this.contact.phoneNumber }] : [],
    };

    this.contactsService.createContact(newContact).subscribe({
      next: (response) => {
        console.log('Contact created successfully:', response);
        this.router
          .navigate(['..'], { relativeTo: this.route })
          .then((success) => {
            console.log('Navigation to contacts list success:', success);
          });
      },
      error: (err) => {
        console.error('Error creating contact:', err);
        this.router
          .navigate(['..'], { relativeTo: this.route })
          .then((success) => {
            console.log(
              'Navigation to contacts list on error success:',
              success,
            );
          });
      },
    });
  }

  cancel() {
    console.log('Cancel clicked, navigating back to contacts list');
    this.router.navigate(['..'], { relativeTo: this.route }).then((success) => {
      console.log('Navigation to contacts list from cancel success:', success);
    });
  }
}
