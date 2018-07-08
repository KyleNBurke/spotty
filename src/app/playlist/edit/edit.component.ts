import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  name: string;
  public: boolean;

  constructor(public dialogRef: MatDialogRef<EditComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.name = data.name;
    this.public = data.public;
  }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    
  }

}
