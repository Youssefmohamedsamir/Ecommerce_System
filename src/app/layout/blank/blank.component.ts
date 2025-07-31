import { Component } from '@angular/core';
import { AppComponent } from "../../app.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-blank',
  imports: [AppComponent, RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.scss'
})
export class BlankComponent {

}
