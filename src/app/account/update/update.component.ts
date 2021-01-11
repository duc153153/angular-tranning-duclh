import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/core/services/account.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  form!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateComponent>,
    private formBuilder: FormBuilder,
    private service: AccountService
  ) {
    this.form = this.formBuilder.group({
      _id: [],
      account_number: [undefined, [Validators.required]],
      balance: [0, [Validators.required]],
      age: [undefined, [Validators.required]],
      firstname: [undefined, [Validators.required]],
      lastname: [undefined, [Validators.required]],
      gender: [undefined, [Validators.required]],
      address: [undefined, [Validators.required]],
      employer: [undefined, [Validators.required]],
      email: [undefined, [Validators.required]],
      city: [undefined, [Validators.required]],
      state: [undefined, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  update(): void {
    this.service.editAccount(this.form.value).subscribe((data) => {
      console.log('update email', this.form.value.email);
      this.dialogRef.close(true);
    }, (error) => {
      console.log('error', error);
    });
  }

}
