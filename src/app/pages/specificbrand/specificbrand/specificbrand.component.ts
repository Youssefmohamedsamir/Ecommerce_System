import { Component, inject, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BrandsService } from '../../../core/service/brands/brands.service';
import { Ibrand } from '../../../shared/interfaces/ibrand';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specificbrand',
  imports: [],
  templateUrl: './specificbrand.component.html',
  styleUrl: './specificbrand.component.scss'
})
export class SpecificbrandComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly ngxSpinnerService = inject(NgxSpinnerService)
  private readonly brandsService = inject(BrandsService)

  idSpacific: any
  specificBrand: Ibrand = {} as Ibrand

  ngOnInit(): void {
    this.ngxSpinnerService.show('loading')
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {

        this.idSpacific = res.get("id")!
        console.log(this.idSpacific);
        this.ngxSpinnerService.hide('loading')
        this.brandsService.getspcificproduct(this.idSpacific).subscribe({
          next: (res) => {
            console.log(res.data);
            this.specificBrand = res.data
          }
        })
      }
    })
  }

}
