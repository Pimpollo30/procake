import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-validar-email',
  templateUrl: './validar-email.component.html',
  styleUrls: ['./validar-email.component.css']
})
export class ValidarEmailComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit(): void {
  }

}
