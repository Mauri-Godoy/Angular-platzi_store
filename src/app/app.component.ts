import { Component } from '@angular/core';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  imgRta = '';

  constructor(
    private userService: UsersService,
    private fileService: FilesService
  ) { }

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.userService.create({
      name: "Sebas",
      email: "sebas@mail.com",
      password: "1234"
    })
      .subscribe(data => {
        console.log(data)
      })
  }

  dowloandPdf() {
    this.fileService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdd').subscribe()
  }

  onUpload(event: Event) {
    const element = event?.target as HTMLInputElement;
    const file = element.files?.item(0);

    if (file)
      this.fileService.uploadFile(file).subscribe(
        response => {
          this.imgRta = response.location;
        }
      )
  }
}
