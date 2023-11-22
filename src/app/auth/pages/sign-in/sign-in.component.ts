import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  public hide:boolean = true;

  public myForm:FormGroup = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb:FormBuilder,
    private authService: AuthService,
    private router: Router
    ){}

  isValidField(field:string):boolean{
    return !this.myForm.get(field)?.valid && !this.myForm.get(field)?.touched;
  }
  onSubmit(){
    if( !this.myForm.valid ) return;

    this.authService.login("luis@gmail.com","asddadasd.asdasd.adasd")
    .subscribe( user =>{
      this.router.navigate(['/']);
    })
  }
}
