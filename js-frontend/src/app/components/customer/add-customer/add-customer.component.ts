import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [HeaderComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss',
})
export class AddCustomerComponent implements OnInit {

  customerForm: FormGroup<any> = new FormGroup({})

  constructor(private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phoneNumber: new FormControl(''),
      address: new FormControl('')
    })
  }

  addCustomer() {
    this.customerService.addCustomer(this.customerForm.value).subscribe((res) => {
      alert("Customer Added Successfully!")
      this.router.navigateByUrl('')
    })
  }
}
