import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsCreatePageComponent } from './contacts-create-page.component';

describe('ContactsCreatePageComponent', () => {
  let component: ContactsCreatePageComponent;
  let fixture: ComponentFixture<ContactsCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
