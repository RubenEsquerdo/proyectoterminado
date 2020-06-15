import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const url = 'http://localhost:8080/seller';


@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http: HttpClient) { }


  getSellers(){
    return this.http.get(`${url}`);
  }

  postSeller(seller) {
    return (this.http.post(url, seller));
  }

  deleteSeller(id: any) {
    return (this.http.delete(`${url}/${id}`));
  }


}
