import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/service/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly orderService = inject(OrderService)


  paramId: string = "";

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      this.paramId = res.get('id')!
      console.log(this.paramId)
    })
  }



  checkForm: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null)

  })

  submitForm(): void {
    console.log(this.checkForm.value);
    this.orderService.order(this.paramId, this.checkForm.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          open(res.session.url, '_self')
        }
      },
      error: (err) => {
        console.log(err);

      }
    })


  }

}
