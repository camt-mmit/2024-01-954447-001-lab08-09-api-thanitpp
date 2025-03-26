// Define types for contacts-related data
export interface Person {
  resourceName: string;
  etag?: string;
  names?: {
    displayName?: string;
    givenName?: string;
    familyName?: string;
  }[];
  emailAddresses?: {
    value: string;
  }[];
  phoneNumbers?: {
    value: string;
  }[];
}

export interface ConnectionsResponse {
  connections: Person[];
  nextPageToken?: string;
  totalItems?: number;
}

export interface CreateContactRequest {
  names: {
    givenName?: string;
    familyName?: string;
  }[];
  emailAddresses?: {
    value: string;
  }[];
  phoneNumbers?: {
    value: string;
  }[];
}
