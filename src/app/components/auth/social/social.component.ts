import { Component, Input, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
declare var gapi: any;
@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent implements OnInit {
  @Input() auth: 'login' | 'register';
  constructor(public authService: UsersService) {}

  ngOnInit(): void {}
}
