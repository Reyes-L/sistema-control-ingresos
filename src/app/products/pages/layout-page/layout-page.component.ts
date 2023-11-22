import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutComponent } from '../../components/confirm-logout/confirm-logout.component';

@Component({
  selector: 'layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
})
export class LayoutPageComponent {
  public sidebarItems = [
    {label: 'Pedidos', icon: 'label', url: './full-view-order'},
    {label: 'Añadir', icon: 'add', url: './new-order'},
    {label: 'Buscar', icon: 'search', url: './search-order'},
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
    ){}

  get user(): User|undefined{
    return this.authService.currentUser;
  }

  onLogout(){

    const dialogRef = this.dialog.open(ConfirmLogoutComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {
      if( !result ) return;

      this.authService.logout();
      this.router.navigate(['/','login']);
    });
  }

}
