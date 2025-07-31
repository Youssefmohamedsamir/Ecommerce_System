import { Component } from '@angular/core';
import { AppComponent } from "../../app.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-auth',
  imports: [AppComponent, RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
