import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm!: FormGroup
  // selectedFile: File | null = null;
  selectedDrivingLicense: File | null = null;
  selectedProfileImage: File | null = null;
  selectedNationalIDImage: File | null = null;

  constructor(private _Auth: AuthService, private _Router: Router, private toastr: ToastrService, private dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.createForm();
  }
  // onFileSelected(event: any) {
  //   this.selectedFile = event.target.files[0];
  // }
  onProfileImageSelected(event: any) {
    // const files = event.target.files;
    // if (files && files.length > 0) {
    this.selectedProfileImage = event.target.files[0];
    // }
  }

  onNationalIDSelected(event: any) {
    // const files = event.target.files;
    // if (files && files.length > 0) {
    this.selectedNationalIDImage = event.target.files[0];
    // }
  }

  onDrivingLicenseSelected(event: any) {
    // const files = event.target.files;
    // if (files && files.length > 0) {
    this.selectedDrivingLicense = event.target.files[0];
    // }
  }

  createForm(): void {
    this.registerForm = new FormGroup({
      fName: new FormControl('', [Validators.required]),
      lName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^076\d{7}$/)]),
      dob: new FormControl('', [Validators.required]),
      drivingLic: new FormControl('', [Validators.required]),
      imageProfile: new FormControl('', [Validators.required]),
      nationalIdImage: new FormControl('', [Validators.required]),
      role : new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[@$!%*?&])[A-Z][A-Za-z\d@$!%*?&]{7,}$/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[@$!%*?&])[A-Z][A-Za-z\d@$!%*?&]{7,}$/)]),
    }, { validators: this.PasswordMatched })

  }
  PasswordMatched(registerForm: any) {
    let pass = registerForm.get('password')
    let rePass = registerForm.get('confirmPassword')
    if (pass?.value == rePass?.value) {
      return null
    } else {
      rePass?.setErrors({ PasswordMatched: 'Repassword does not match password' })
      return { PasswordMatched: 'Repassword does not match password' }

    }
  }

  register() {
    if (!this.selectedDrivingLicense || !this.selectedProfileImage || !this.selectedNationalIDImage || !this.registerForm.valid) return;
    console.log(this.registerForm.value);
    this.registerForm.value.role = parseInt(this.registerForm.value.role)
    const formData = new FormData();
    formData.append('drivingLic', this.selectedDrivingLicense);
    formData.append('imageProfile', this.selectedProfileImage);
    formData.append('nationalIdImage', this.selectedNationalIDImage);
    formData.append('email', this.registerForm.value.email.split('@')[0]);
    formData.append('address', this.registerForm.value.address);
    formData.append('phoneNumber', this.registerForm.value.phoneNumber);
    formData.append('dob', this.registerForm.value.dob);
    formData.append('confirmPassword', this.registerForm.value.confirmPassword);
    formData.append('fName', this.registerForm.value.fName);
    formData.append('lName', this.registerForm.value.lName);
    formData.append('password', this.registerForm.value.password);
    formData.append('role', this.registerForm.value.role )
    let user = {
      email : formData.get('email'),
      address : formData.get('address'),
      phoneNumber : formData.get('phoneNumber'),
      dob : formData.get('dob'),
      confirmPassword : formData.get('confirmPassword'),
      fName : formData.get('fName'),
      lName : formData.get('lName'),
      password : formData.get('password'),
      role : (formData.get('role'))
    };
    console.log(user);
    this._Auth.register(user).subscribe({
      next:res =>{
        console.log(res)
        console.log(formData);
        if(res.message=='success'){
          this.toastr.success('You are registerd successfully', 'Success',{
            timeOut: 1500,
          });
          this.dialog.closeAll();
          //this._Router.navigate(['/login'])
          const dialogRef = this.dialog.open(LoginComponent,{
            width:'500px',height:'600px'
          });
        }
        },
        error:err=>{
          console.log(err);
          console.log(formData);
          this.toastr.warning(err.error.message, 'Ooops',{
            timeOut: 1500,
          });
        }
    }
    );
  }
  alreadyReg() {
    // this._Router.navigate(['/login'])
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px', height: '600px'
    });
  }

}




