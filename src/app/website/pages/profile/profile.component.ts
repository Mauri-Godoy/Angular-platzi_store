import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile: User | null = null

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    //En vez de realizar una petición, obtenemos el estado global del usuario
    this.authService.user$.subscribe(profile =>
      this.profile = profile);
  }

}
