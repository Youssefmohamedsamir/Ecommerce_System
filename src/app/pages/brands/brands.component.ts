import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/service/brands/brands.service';
import { Ibrand } from '../../shared/interfaces/ibrand';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly brandsService = inject(BrandsService)
  private readonly ngxSpinnerService = inject(NgxSpinnerService)


  brandDetails: Ibrand[] = []


  Allbrands() {
    this.ngxSpinnerService.show('loading')
    this.brandsService.brand().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandDetails = res.data
        this.ngxSpinnerService.hide('loading')

      },
    })
  }

  ngOnInit(): void {
    this.Allbrands()
  }


}
