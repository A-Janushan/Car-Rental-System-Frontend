import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from '../../core/services/car.service';
// import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit{
constructor(private toastr:ToastrService,private _CarService:CarService,private _Router:Router,private dialog:MatDialog){

}
  ngOnInit(): void {
this.createForm()
  }
  ownerId:any
  carForm!:FormGroup
  selectedFile: File | null = null;
  selectedBrand: string='';

  createForm():void{
    this.ownerId=localStorage.getItem("UserId");
    this.carForm =new FormGroup({
      brand:new FormControl('',[Validators.required]),
      otherBrand:new FormControl('',[Validators.required]),
      modell:new FormControl('',[Validators.required]),
      year:new FormControl('',[Validators.required,Validators.min(2005),Validators.max(2024)]),
      color:new FormControl('',[Validators.required]),
      trans_Type:new FormControl('',[Validators.required]),
      seats:new FormControl('',[Validators.required]),
      carImage:new FormControl('',[Validators.required]),
      cost_Per_Day:new FormControl('',[Validators.required]),
      isAvailable:new FormControl('',[Validators.required]),
      ownerId:new FormControl(localStorage.getItem("UserId"),[Validators.required]),
    })
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onBrandChange(event: any): void {
    this.selectedBrand = event.target.value;
    if (this.selectedBrand !== 'others') {
      this.carForm.get('otherBrand')?.setValue('');
    }
  }
  addCar() {
    if (!this.selectedFile || !this.carForm.valid) return;

    const formData = new FormData();
    formData.append('carImage', this.selectedFile);
    // formData.append('brand', this.carForm.value.brand);
    if (this.carForm.value.brand === 'others') {
      formData.append('brand', this.carForm.value.otherBrand);
    } else {
      formData.append('brand', this.carForm.value.brand);
    }
    formData.append('modell', this.carForm.value.modell);
    formData.append('year', this.carForm.value.year);
    formData.append('color', this.carForm.value.color);
    formData.append('trans_Type', this.carForm.value.trans_Type);
    formData.append('seats', this.carForm.value.seats);
    formData.append('cost_Per_Day', this.carForm.value.cost_Per_Day);
    formData.append('isAvailable', this.carForm.value.isAvailable);
    formData.append('ownerId', this.ownerId);

    this._CarService.uploadCar(formData).subscribe({
      next:res =>{
        console.log(res)

        this.toastr.success('you added car successfully', 'Success',{
            timeOut: 1500,
          });
          this.dialog.closeAll();


        this._Router.navigate(['/myCars'])

        },
        error:err=>{
          console.log(err);
          this.toastr.warning(err, 'Ooops',{
            timeOut: 1500,
          });
        }
    }
    );
  }
}
