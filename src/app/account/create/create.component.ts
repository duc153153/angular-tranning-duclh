import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from 'app/core/services/account.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateComponent>,
    private formBuilder: FormBuilder,
    private service: AccountService
  ) {
    this.form = this.formBuilder.group({
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
  }

  create(): void {
    this.service.addAccount(this.form.value).subscribe((data) => {
      console.log('add email', this.form.value.email);
      this.dialogRef.close(true);
    }, (error) => {
      console.log('error', error);
    });
  }
}
