import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorFieldsService {

  public pattersNumber: string = '^([0-9])*$';


}
