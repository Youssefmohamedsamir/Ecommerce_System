import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from '../../../core/service/catigories/categories.service';
import { Icategories } from '../../../shared/interfaces/icategories';

@Component({
  selector: 'app-specific-categories',
  imports: [],
  templateUrl: './specific-categories.component.html',
  styleUrl: './specific-categories.component.scss'
})
export class SpecificCategoriesComponent {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly ngxSpinnerService = inject(NgxSpinnerService)
  private readonly categoriesService = inject(CategoriesService)

  id: any
  specificCategories: Icategories = {} as Icategories

  ngOnInit(): void {
    this.ngxSpinnerService.show('loading')
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.id = res.get("id")!
        console.log(this.id);
        this.ngxSpinnerService.hide('loading')
        this.categoriesService.getspeceficcategories(this.id).subscribe({
          next: (res) => {
            console.log(res.data);
            this.specificCategories = res.data
          }
        })
      }
    })
  }
}
