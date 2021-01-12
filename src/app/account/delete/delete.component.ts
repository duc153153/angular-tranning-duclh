import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteComponent>,
    private service: AccountService
  ) { }

  ngOnInit(): void {
  }

  delete(): void {
    this.service.deleteAccount(this.data).subscribe((data) => {
      console.log('del account/ id:', this.data._id);
      this.dialogRef.close(true);
    }, (error) => {
      console.log('error', error);
    });
  }
}
