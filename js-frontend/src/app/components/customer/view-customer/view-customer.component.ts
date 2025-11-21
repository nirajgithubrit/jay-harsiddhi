import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.scss',
})
export class ViewCustomerComponent {
  // -------------------------------
  // UI States
  // -------------------------------
  editMode = false;
  showAddShutterForm = false;
  selectedType: string | null = null;
  ifEditShutter: boolean = false;
  selectedShutterId?: number;

  // -------------------------------
  // Customer Details
  // -------------------------------
  customer = {
    name: 'Amit Sharma',
    phone: '9876543210',
    address: '123 Main St, Delhi',
  };

  // -------------------------------
  // Dropdown Options
  // -------------------------------
  shutterTypes = [
    'Without Handle',
    'Top Handle',
    'Bottom Handal',
    'Left Handle',
    'Right Handal',
  ];

  hingesTypes = ['Regular Hinges', '20mm Hinges'];
  profileTypes = ['8mm Edge', '5mm Edge', '1mm Edge'];
  glassTypes = [
    'Smoke Glass',
    'Backpainted Glass',
    'Flutted Glass',
    'Plain Glass',
  ];

  // -------------------------------
  // Data Models
  // -------------------------------
  shutters: any[] = [];
  newShutter = {
    type: '',
    height: null as number | null,
    width: null as number | null,
    units: 1,
    hingesCount: 1,
    hinges: 'Regular Hinges',
    profile: '8mm Edge',
    glass: 'Smoke Glass',
  };

  objectKeys = Object.keys;

  // -------------------------------
  // Utility Functions
  // -------------------------------
  inchToFoot(inch: number): number {
    return +(inch / 12).toFixed(2);
  }

  toggleAddShutterForm() {
    this.showAddShutterForm = !this.showAddShutterForm;
    this.selectedType = null;
    this.resetShutterForm();
  }

  selectType(type: string) {
    this.selectedType = type;
    this.newShutter.type = type;
  }

  // -------------------------------
  // Save shutter logic
  // -------------------------------
  saveShutter() {
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
      patti45mm = height * 2 + width * 2;
    } else if (type === 'Top Handle' || type === 'Bottom Handal') {
      patti45mm = height * 2 + width;
      handal68mm = width;
    } else if (type === 'Left Handle' || type === 'Right Handal') {
      patti45mm = height + width * 2;
      handal68mm = height;
    }

    // ✅ Convert inch → foot
    const patti45mmFoot = this.inchToFoot(patti45mm) * units;
    const handal68mmFoot = this.inchToFoot(handal68mm) * units;
    const glassAreaFoot =
      this.inchToFoot(height) * this.inchToFoot(width) * units;

    // ✅ Add shutter record
    debugger;
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

    // Reset form
    this.resetShutterForm();
    this.ifEditShutter = false;
    this.showAddShutterForm = false;
    this.selectedType = null;
  }

  resetShutterForm() {
    this.newShutter = {
      type: '',
      height: null,
      width: null,
      units: 1,
      hingesCount: 1,
      hinges: 'Regular Hinges',
      profile: '8mm Edge',
      glass: 'Smoke Glass',
    };
  }

  editShutter(i: number, shutter: any) {
    this.ifEditShutter = true;
    this.showAddShutterForm = true;
    this.selectedType = shutter.type;
    this.selectedShutterId = i;

    this.newShutter.type = shutter.type;
    this.newShutter.height = shutter.height;
    this.newShutter.width = shutter.width;
    this.newShutter.hinges = shutter.hinges;
    this.newShutter.profile = shutter.profile;
    this.newShutter.glass = shutter.glass;
  }

  deleteShutter(i: number) {
    this.shutters.splice(i, 1);
  }

  // -------------------------------
  // Material Summary
  // -------------------------------
  get materialSummary() {
    const profileCount: any = {};
    const hingesCount: any = {};
    const glassArea: any = {};
    const profilePatti: any = {}; // for 45mm and 68mm per profile

    let connectors = 0;
    let labour = 0;

    for (const s of this.shutters) {
      // profile count
      profileCount[s.profile] = (profileCount[s.profile] || 0) + 1;

      // hinges count
      hingesCount[s.hinges] =
        (hingesCount[s.hinges] || 0) + s.hingesCount * s.units;

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

    return {
      profileCount,
      hingesCount,
      glassArea,
      connectors,
      labour,
      profilePatti,
    };
  }

  goToInvoice() {
    console.log(this.materialSummary);
  }
}
