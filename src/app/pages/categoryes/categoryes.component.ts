import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Icategories } from '../../shared/interfaces/icategories';
import { CategoriesService } from '../../core/service/catigories/categories.service';

@Component({
  selector: 'app-categoryes',
  imports: [RouterLink],
  templateUrl: './categoryes.component.html',
  styleUrl: './categoryes.component.scss'
})
export class CategoryesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService)
  private readonly ngxSpinnerService = inject(NgxSpinnerService)

  categoriesDetails: Icategories[] = []


  AllCategories() {
    this.ngxSpinnerService.show('loading')
    this.categoriesService.getallcategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoriesDetails = res.data
        this.ngxSpinnerService.hide('loading')

      },
    })
  }

  ngOnInit(): void {
    this.AllCategories()
  }


}
