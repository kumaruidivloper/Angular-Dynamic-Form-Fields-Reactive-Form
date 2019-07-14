import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Angular-Dynamic-Form-Fields-Reactive-Form';
  public form: FormGroup;
  public contactList: FormArray;
  public positionList: FormArray;
  public country: string[] =  ['India', 'Singapore', 'England', 'Pakistan', 'UAE', 'South Africa'];

  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get('contacts') as FormArray;
  }

  // returns all form groups under position
  get positionFormGroup() {
    return this.form.get('position') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      organization: [null],
      contacts: this.fb.array([this.createContact()]),
      position: this.fb.array([this.createPosition()])
    });

    // set contactlist to this field
    this.contactList = this.form.get('contacts') as FormArray;
    this.positionList = this.form.get('position') as FormArray;
  }

  // contact formgroup
  createContact(): FormGroup {
    return this.fb.group({
      type: ['email', Validators.compose([Validators.required])], // i.e Email, Phone
      name: [null, Validators.compose([Validators.required])], // i.e. Home, Office
      value: [null, Validators.compose([Validators.required, Validators.email])],
      country: [''],
      gender: [''],
      language: ['']
    });
  }

  // Position formgroup
  createPosition(): FormGroup {
    return this.fb.group({
      type: ['email', Validators.compose([Validators.required])], // i.e Email, Phone
      name: [null, Validators.compose([Validators.required])], // i.e. Home, Office
      value: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  // add a contact form group
  addContact() {
    this.contactList.push(this.createContact());
  }

  // add a position form group
  addPosition() {
    this.positionList.push(this.createPosition());
  }

  // remove contact from group
  removeContact(index) {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.contactList.removeAt(index);
  }

  // remove position from group
  removePostion(index) {
    // this.contactList = this.form.get('contacts') as FormArray;
    console.log(this.positionList.length);
    this.positionList.removeAt(index);
  }

  // triggered to change validation of value field type
  changedFieldContactType(index) {
    let validators = null;

    if (this.getContactsFormGroup(index).controls.type.value === 'email') {
      validators = Validators.compose([Validators.required, Validators.email]);
    } else {
      validators = Validators.compose([
        Validators.required,
        Validators.pattern(new RegExp('^\\+[0-9]?()[0-9](\\d[0-9]{9})$')) // pattern for validating international phone number
      ]);
    }

    this.getContactsFormGroup(index).controls.value.setValidators(
      validators
    );


    this.getContactsFormGroup(index).controls.value.updateValueAndValidity();
  }


  changedFieldPositionType(index) {
    let validators = null;
    if (this.getPositionFormGroup(index).controls.type.value === 'email') {
      validators = Validators.compose([Validators.required, Validators.email]);
    } else {
      validators = Validators.compose([
        Validators.required,
        Validators.pattern(new RegExp('^\\+[0-9]?()[0-9](\\d[0-9]{9})$')) // pattern for validating international phone number
      ]);
    }

    this.getPositionFormGroup(index).controls.value.setValidators(
      validators
    );

    this.getPositionFormGroup(index).controls.value.updateValueAndValidity();
  }

  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.contactList.controls[index] as FormGroup;
    return formGroup;
  }

  // get the formgroup under contacts form array
  getPositionFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.positionList.controls[index] as FormGroup;
    return formGroup;
  }

  // method triggered when form is submitted
  submit() {
    console.log(this.form.value);
  }
}
