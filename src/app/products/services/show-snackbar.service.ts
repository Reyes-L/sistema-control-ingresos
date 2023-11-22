import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class ShowSnackbarService {
  constructor(private snackbar: MatSnackBar) { }

  showSnackbarProduct( message: string ): void{
    this.snackbar.open( message, "done", {
      duration: 2500,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    } )
  }

  showSnackbarOrder( message: string ): void{
    this.snackbar.open( message, "done", {
      duration: 2500,
    } )
  }

}
