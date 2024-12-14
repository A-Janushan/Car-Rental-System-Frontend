import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalService } from 'src/app/core/services/rental.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cost:any;
  rentalId:any
  public payPalConfig?: IPayPalConfig;
  constructor(private _RentalService:RentalService,private toaster:ToastrService,private _ActivatedRoute:ActivatedRoute,private _Router:Router){
    this.cost =Number( this._ActivatedRoute.snapshot.paramMap.get('cost'));
    // this.rentalId =Number( this._ActivatedRoute.snapshot.paramMap.get('id'));
    this._ActivatedRoute.params.subscribe(params => {
      this.rentalId = params['id'];
    })

  }
  ngOnInit(): void {
    console.log(this.rentalId);

this.initConfig();
  }
 private initConfig(): void {
    this.payPalConfig = {
    currency: 'LKR',
    clientId: 'AW3Ox8_lYj9UWdQYkL4byZ5QNol5TSu3OMnKX5CN9X8Rsdm0V3oIdmPaY_kxmdEXW5L5iqDXKZIb90jF',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.cost.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.cost.toString()
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.cost.toString(),
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data:any, actions:any) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
        if(details.status=="APPROVED"){
          this._RentalService.confirmRequest(this.rentalId).subscribe({
            next:res=>{
              console.log(res);
              this._Router.navigate(['/rental']);
            }
          })

        }
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      //this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }


}
