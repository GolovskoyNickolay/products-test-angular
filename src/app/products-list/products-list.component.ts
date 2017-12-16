import { Component, OnInit } from '@angular/core';
import {HttpService} from "../services/httpService";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import {LoginService} from "../services/loginService";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {
  products: Array<{}> = [];
  currentProduct:any = {
    name:'',
    price:'',
    description:'',
    productID:''
  };
  changeProductForm = this.fb.group({
    productName: ['', Validators.required],
    productPrice: ['', [Validators.required,Validators.pattern('^[0-9]+$')]],
    productDescription: ['', Validators.required],
  });

  constructor(private httpService: HttpService,private modalService: NgbModal,private fb:FormBuilder,
              private loginService: LoginService) { }

  ngOnInit() {
  this.updateProducts();
  }

  updateProducts(){
    this.httpService.get('Products').subscribe((data:any)=>{
      this.products = data;
    });
  }

  getProduct(id){
    this.httpService.get(`Products/${id}`).subscribe((data:any)=>{
      this.currentProduct = {
        name: data.name,
        price: data.price,
        description: data.description,
        productID:data.productID
      }
    });
  }

  saveProduct(){
    if(this.currentProduct.productID == 'new'){
      //dummy ID
      this.currentProduct.productID = new Date().valueOf().toString().substring(0,5);
      this.httpService.post('Products', this.currentProduct).subscribe((data)=>{
        this.updateProducts();
      });
    }else{
      this.httpService.put(`Products/${this.currentProduct.productID}`,this.currentProduct).subscribe((data)=>{
        this.updateProducts();
      })
    }
  }

  deleteProduct(){
    this.httpService.remove(`Products/${this.currentProduct.productID}`).subscribe((data)=>{
      this.updateProducts();
    });
  }

  open(content,id,isNew) {
    this.currentProduct.productID = id;
    if(isNew){
      this.currentProduct = {
        name: 'New Name',
        price: 0,
        description: 'New Description',
        productID:'new'
      }
    }
    this.modalService.open(content);
  }
}
