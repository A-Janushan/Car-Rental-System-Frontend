import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-src-img',
  templateUrl: './src-img.component.html',
  styleUrls: ['./src-img.component.css']
})
export class SrcImgComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}
  ngOnInit(): void {
    this.srcImg=this.data.src;
    

  }
srcImg:any
}
