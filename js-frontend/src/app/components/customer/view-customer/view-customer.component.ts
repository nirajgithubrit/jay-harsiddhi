import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.scss',
})
export class ViewCustomerComponent implements OnInit {
  editMode = false;
  selectedType: string | null = null;
  ifEditShutter: boolean = false;
  ifEditGlass: boolean = false;
  ifEditOtherDetail: boolean = false
  showShutterModal = false;
  showGlassModal = false;
  showOtherDetailModal = false
  selectedShutterId?: number;
  selectedGlassId?: number;
  materialDetails: any = [];
  customerId?: string
  customer: any

  shutterTypes = [
    'Without Handle',
    'Top Handle',
    'Bottom Handal',
    'Left Handle',
    'Right Handal',
  ];

  categories: any = []
  hingesTypes: any = [];
  profileTypes: any = [];
  glassTypes: any = [];
  pumpTypes: any = [];
  glassWork = ['Ruff', 'Polish', 'Pel'];
  glassThickness = ['4mm', '6mm', '8mm', '12mm', '18mm'];
  paymentMethodTypes = ['UPI', 'Cash', 'Check', 'Net Banking'];
  orderStatusTypes = ['Not-Confirm', 'InProgress', 'Confirm', 'Completed']
  shutters: any = [];
  glasses: any = [];

  newShutter = {
    type: '',
    height: null as number | null,
    width: null as number | null,
    units: 1,
    hingesCount: 1,
    pumpCount: 1,
    pump: null as string | null,
    hinges: null as string | null,
    profile: null as string | null,
    glass: null as string | null,
  };

  newGlass = {
    height: null as number | null,
    width: null as number | null,
    glassName: null as string | null,
    glassEdge: 'Ruff',
    glassThickness: '4mm',
    units: 1,
  };

  otherDetails: { key: string; value: string }[] = [];
  newOtherDetails: { key: string; value: string }[] = [];

  objectKeys = Object.keys;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router) { }

  async ngOnInit() {

    this.customerId = this.activatedRoute.snapshot.params["id"]
    if (this.customerId) {
      this.customerService.getCustomerById(this.customerId).subscribe((res: any) => {
        this.customer = res
        this.customer.paymentMethod = res.paymentMethod ?? 'Cash'
        this.customer.orderStatus = res.orderStatus ?? 'Not-Confirm'
        this.shutters = res.shutters
        this.glasses = res.extraGlasses
      })

      this.customerService.sendIndex(1)
    }

    this.materialDetails = await this.customerService.getMaterialDetail()
    this.categories = await this.getAllItemsDetails('category')

    this.hingesTypes = this.materialDetails.filter((x: any) => x.categoryId == this.getIdUsingCategory('Hinges'));
    this.profileTypes = this.materialDetails.filter((x: any) => x.categoryId == this.getIdUsingCategory('Profile'));
    this.glassTypes = this.materialDetails.filter((x: any) => x.categoryId == this.getIdUsingCategory('Glass'));
    this.pumpTypes = this.materialDetails.filter((x: any) => x.categoryId == this.getIdUsingCategory('Pump'));
  }

  async getAllItemsDetails(type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.customerService.getAllItem(type).subscribe((res) => {
        resolve(res)
      })
    })
  }

  getIdUsingCategory(type: string) {
    return this.categories.find((c: any) => c.name == type)._id
  }

  inchToFoot(inch: number): number {
    return +(inch / 12).toFixed(2);
  }

  editCustomer() {
    this.editMode = !this.editMode
    const customerDTO = {
      name: this.customer.name,
      phoneNumber: this.customer.phoneNumber,
      address: this.customer.address
    }

    if (!this.editMode && this.customerId) {
      this.customerService.updateCustomer(this.customerId, customerDTO).subscribe((res) => {
        alert("Customer Details Updated Successfully!")
        this.customer = res
      })
    }
  }

  openShutterModal(edit = false, index?: number, data?: any) {
    this.ifEditShutter = edit;
    this.selectedShutterId = index;
    this.showShutterModal = true;

    if (edit && data) {
      this.selectedType = data.type;
      this.newShutter = { ...data };
    } else {
      this.resetShutterForm();
      this.selectedType = null;
    }
  }

  openGlassModal(edit = false, index?: number, data?: any) {
    this.ifEditGlass = edit;
    this.selectedGlassId = index;
    this.showGlassModal = true;

    if (edit && data) {
      this.newGlass = { ...data };
    } else {
      this.resetGlassForm();
    }
  }

  openOtherDetailModal(edit = false) {
    this.ifEditOtherDetail = edit
    this.showOtherDetailModal = true

    if (edit) {
      this.newOtherDetails = JSON.parse(
        JSON.stringify(this.customer.other)
      );
    } else {
      this.resetOtherDetailForm();
    }
  }

  addMoreOtherDetail() {
    this.newOtherDetails.push({ key: '', value: '' });
  }

  removeOtherDetail(index: number) {
    this.newOtherDetails.splice(index, 1);
  }

  async saveOtherDetail() {
    // basic validation
    if (this.newOtherDetails.some(d => !d.key || !d.value)) {
      alert('Please fill all key and value fields');
      return;
    }

    if (this.ifEditOtherDetail) {
      this.otherDetails = [...this.newOtherDetails]
    } else {
      this.otherDetails = [...(this.customer?.other || []),
      ...this.newOtherDetails
      ];
    }

    const data = await this.customerService.getInvoiceDetails(this.materialSummary, this.materialDetails)
    const otherDetailAmount = this.otherDetails.reduce((sum, item) => {
      return sum + Number(item.value || 0);
    }, 0)
    const otherDTO = {
      other: this.otherDetails,
      amount: parseInt(data.grandTotal.toFixed(0)) + otherDetailAmount
    }

    if (this.customerId)
      this.customerService.addOtherDetails(this.customerId, otherDTO).subscribe((res) => {
        alert("Other Details saved successfully!")
        this.customer = res
        this.closeModal()
      })
  }

  closeModal() {
    this.showShutterModal = false;
    this.ifEditShutter = false
    this.showGlassModal = false;
    this.ifEditGlass = false
    this.showOtherDetailModal = false
    this.ifEditOtherDetail = false
  }

  selectType(type: string) {
    this.selectedType = type;
    this.newShutter.type = type;
  }

  // Save shutter logic
  async saveShutter() {
    const { type, height, width, units, hingesCount, hinges, profile, glass } =
      this.newShutter;
    if (
      !type ||
      !height ||
      !width ||
      !units ||
      !hingesCount ||
      !hinges ||
      !profile ||
      !glass
    ) {
      alert('Please fill all details.');
      return;
    }

    let patti45mm = 0;
    let handal68mm = 0;

    // ✅ Handle all shutter type calculations
    if (type === 'Without Handle') {
      patti45mm = (height + 1) * 2 + (width + 1) * 2;
    } else if (type === 'Top Handle' || type === 'Bottom Handal') {
      patti45mm = (height + 1) * 2 + (width + 1);
      handal68mm = width + 2;
    } else if (type === 'Left Handle' || type === 'Right Handal') {
      patti45mm = (height + 1) + (width + 1) * 2;
      handal68mm = height + 2;
    }

    // ✅ Convert inch → foot
    const patti45mmFoot = this.inchToFoot(patti45mm) * units;
    const handal68mmFoot = this.inchToFoot(handal68mm) * units;
    const glassAreaFoot =
      this.inchToFoot(height) * this.inchToFoot(width) * units;

    // ✅ Add shutter record

    if (!this.ifEditShutter) {
      this.shutters.push({
        ...this.newShutter,
        heightInch: height,
        widthInch: width,
        patti45mmFoot,
        handal68mmFoot,
        glassAreaFoot,
      });
    } else {
      this.shutters[this.selectedShutterId!] = {
        ...this.newShutter,
        heightInch: height,
        widthInch: width,
        patti45mmFoot,
        handal68mmFoot,
        glassAreaFoot,
      };
    }

    const data = await this.customerService.getInvoiceDetails(this.materialSummary, this.materialDetails)
    const shutterDTO = {
      shutters: this.shutters,
      material: this.materialSummary,
      amount: data.grandTotal.toFixed(0)
    }
    if (this.customerId)
      this.customerService.addShutters(this.customerId, shutterDTO).subscribe((res) => {
        alert('Shutter added successfully!')
        this.customer = res
        this.closeModal()
      })

    // Reset form
    this.resetShutterForm();
    this.ifEditShutter = false;
    this.selectedType = null;
  }

  async saveGlass() {
    const { height, width, glassName, glassEdge, glassThickness, units } =
      this.newGlass;
    if (
      !height ||
      !width ||
      !glassName ||
      !glassEdge ||
      !glassThickness ||
      !units
    ) {
      alert('Please fill all details.');
      return;
    }

    const glassAreaFoot =
      this.inchToFoot(height) * this.inchToFoot(width) * units;

    if (!this.ifEditGlass) {
      this.glasses.push({
        ...this.newGlass,
        glassAreaFoot,
      });
    } else {
      this.glasses[this.selectedGlassId!] = {
        ...this.newGlass,
        glassAreaFoot,
      };
    }

    const data = await this.customerService.getInvoiceDetails(this.materialSummary, this.materialDetails)
    const glassDTO = {
      glasses: this.glasses,
      material: this.materialSummary,
      amount: data.grandTotal.toFixed(0)
    }
    if (this.customerId)
      this.customerService.addGlasses(this.customerId, glassDTO).subscribe((res) => {
        alert('Glass added successfully!')
        this.customer = res
        this.closeModal()
      })

    this.resetGlassForm();
    this.ifEditGlass = false;
  }

  resetShutterForm() {
    this.newShutter = {
      type: '',
      height: null,
      width: null,
      units: 1,
      hingesCount: 1,
      hinges: this.hingesTypes[0].name,
      profile: this.profileTypes[0].name,
      glass: this.glassTypes[0].name,
      pumpCount: 0,
      pump: this.pumpTypes[0]?.name
    };
  }

  resetGlassForm() {
    this.newGlass = {
      height: null as number | null,
      width: null as number | null,
      glassName: this.glassTypes[0].name,
      glassEdge: 'Ruff',
      glassThickness: '4mm',
      units: 1,
    };
  }

  resetOtherDetailForm() {
    this.newOtherDetails = [{ key: '', value: '' }];
  }

  async deleteShutter(i: number) {
    this.shutters.splice(i, 1);
    const data = await this.customerService.getInvoiceDetails(this.materialSummary, this.materialDetails)
    const shutterDTO = {
      shutters: this.shutters,
      material: this.materialSummary,
      amount: data.grandTotal.toFixed(0)
    }
    if (this.customerId)
      this.customerService.addShutters(this.customerId, shutterDTO).subscribe((res) => {
        alert('Shutter deleted successfully!')
        this.customer = res
      })
  }

  async deleteGlass(i: number) {
    this.glasses.splice(i, 1);
    const data = await this.customerService.getInvoiceDetails(this.materialSummary, this.materialDetails)
    const glassDTO = {
      glasses: this.glasses,
      material: this.materialSummary,
      amount: data.grandTotal.toFixed(0)
    }
    if (this.customerId)
      this.customerService.addGlasses(this.customerId, glassDTO).subscribe((res) => {
        alert('Glass deleted successfully!')
        this.customer = res
      })
  }

  // Material Summary
  get materialSummary() {
    const profileCount: any = {};
    const hingesCount: any = {};
    const pumpCount: any = {}
    const glassArea: any = {};
    const addedGlassArea: any = {};
    const profilePatti: any = {}; // for 45mm and 68mm per profile

    let connectors = 0;
    let labour = 0;

    for (const s of this.shutters) {
      // profile count
      profileCount[s.profile] = (profileCount[s.profile] || 0) + 1;

      // hinges count
      hingesCount[s.hinges] =
        (hingesCount[s.hinges] || 0) + s.hingesCount * s.units;

      pumpCount[s.pump] =
        (pumpCount[s.pump] || 0) + s.pumpCount * s.units;

      // glass area
      glassArea[s.glass] = (glassArea[s.glass] || 0) + s.glassAreaFoot;

      // connectors & labour
      connectors += s.units;
      labour += s.units;

      // profile type patti/handal totals
      if (!profilePatti[s.profile]) {
        profilePatti[s.profile] = { patti45mm: 0, handal68mm: 0 };
      }

      // Add foot values
      profilePatti[s.profile].patti45mm += s.patti45mmFoot;
      profilePatti[s.profile].handal68mm += s.handal68mmFoot;
    }

    for (const g of this.glasses) {
      // glass area
      addedGlassArea[g.glassName] =
        (addedGlassArea[g.glassName] || 0) + g.glassAreaFoot;
    }

    return {
      profileCount,
      hingesCount,
      pumpCount,
      glassArea,
      addedGlassArea,
      connectors,
      labour,
      profilePatti,
    };
  }

  async goToInvoice() {
    if (this.customerId) {
      this.router.navigateByUrl('/view-invoice/' + this.customerId)
    }
  }

  submitOrderDetail() {
    const orderDTO = {
      recievedAmount: this.customer.recievedAmount ?? 0,
      orderStatus: this.customer.orderStatus,
      paymentMethod: this.customer.paymentMethod
    }

    if (this.customerId)
      this.customerService.addOrderDetails(this.customerId, orderDTO).subscribe((res) => {
        alert("Order Detail Successfully Submitted.")
      })
  }
}
