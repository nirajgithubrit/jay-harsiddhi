import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-all-customer',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './all-customer.component.html',
  styleUrl: './all-customer.component.scss',
})
export class AllCustomer implements OnInit {
  customers: any = []
  // [
  //   {
  //     name: 'Amit Sharma',
  //     phone: '9876543210',
  //     address: '123 Main St, Delhi',
  //     status: 'Confirm',
  //     totalAmount: 1200,
  //     recievedAmount: 1200,
  //     paymentType: 'Cash',
  //     invoice: 'INV001',
  //   }
  // ];

  constructor(private router: Router,
    private customerService: CustomerService) { }

  async ngOnInit() {
    const materials = await this.getMaterials()
    this.customerService.sendMaterialDetail(materials)
    this.customerService.getAllCustomer().subscribe((res) => {
      this.customers = res
    })
  }

  goToAddCustomer() {
    this.router.navigateByUrl('add-customer');
  }

  goToViewCustomer(id: number) {
    this.router.navigateByUrl('view-customer/' + id);
  }

  showInvoice(customer: any) {
    this.router.navigateByUrl('/view-invoice/' + customer._id)
  }

  async getMaterials(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.customerService.getAllMaterial().subscribe((res) => {
        resolve(res)
      })
    })
  }
}
