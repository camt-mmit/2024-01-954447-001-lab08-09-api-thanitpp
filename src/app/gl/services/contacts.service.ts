import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ConnectionsResponse,
  CreateContactRequest,
  Person, // Import Person directly
} from './../models/contacts';
import { OauthService } from './oauth.service';

@Injectable()
export class ContactsService {
  private apiUrl = 'https://people.googleapis.com/v1';

  constructor(
    private http: HttpClient,
    private oauthService: OauthService,
  ) {}

  getContacts(): Observable<ConnectionsResponse> {
    const token = this.oauthService.accessToken();
    if (!token) {
      throw new Error('No access token available');
    }
    return this.http.get<ConnectionsResponse>(
      `${this.apiUrl}/people/me/connections`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { personFields: 'names,emailAddresses,phoneNumbers' },
      },
    );
  }

  createContact(contact: CreateContactRequest): Observable<Person> {
    // Use Person instead of CreateContactResponse
    const token = this.oauthService.accessToken();
    if (!token) {
      throw new Error('No access token available');
    }
    return this.http.post<Person>(
      `${this.apiUrl}/people:createContact`,
      contact,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { personFields: 'names,emailAddresses,phoneNumbers' },
      },
    );
  }
}
