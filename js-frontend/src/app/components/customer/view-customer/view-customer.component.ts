import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { Material } from '../../../model/material';
import MaterialList from '../../../../assets/materials.json';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

interface ExtraGlass {
  values: number;
  total: number;
}

@Component({
  selector: 'app-view-customer',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.scss',
})
export class ViewCustomerComponent implements OnInit {
  editMode = false;
  showAddShutterForm = false;
  showAddGlassForm = false;
  selectedType: string | null = null;
  ifEditShutter: boolean = false;
  ifEditGlass: boolean = false;
  selectedShutterId?: number;
  selectedGlassId?: number;
  materialDetails: Material[] = MaterialList;
  customer = {
    name: 'Amit Sharma',
    phone: '9876543210',
    address: '123 Main St, Delhi',
  };
  shutterTypes = [
    'Without Handle',
    'Top Handle',
    'Bottom Handal',
    'Left Handle',
    'Right Handal',
  ];

  hingesTypes = this.materialDetails.filter((x) => x.category == 'Hinges');
  profileTypes = this.materialDetails.filter((x) => x.category == 'Profile');
  glassTypes = this.materialDetails.filter((x) => x.category == 'Glass');
  glassWork = ['Ruff', 'Polish', 'Pel'];
  glassThickness = ['4mm', '6mm', '8mm', '12mm', '18mm'];

  shutters: any[] = [
    {
      type: 'Without Handle',
      height: 24,
      width: 24,
      units: 1,
      hingesCount: 1,
      hinges: 'Regular 3D softclose hinges',
      profile: '3mm Edge Gola',
      glass: 'Smoke Glass',
      heightInch: 24,
      widthInch: 24,
      patti45mmFoot: 8,
      handal68mmFoot: 0,
      glassAreaFoot: 4,
    },
    {
      type: 'Top Handle',
      height: 27,
      width: 9,
      units: 1,
      hingesCount: 1,
      hinges: '20mm Softclose Hinges',
      profile: '20mm Regular ',
      glass: 'Smoke Glass',
      heightInch: 27,
      widthInch: 9,
      patti45mmFoot: 5.25,
      handal68mmFoot: 0.75,
      glassAreaFoot: 1.6875,
    },
    {
      type: 'Bottom Handal',
      height: 24,
      width: 15,
      units: 1,
      hingesCount: 1,
      hinges: 'Regular 3D softclose hinges',
      profile: '8mm Edge Regular',
      glass: 'Backpainted Glass',
      heightInch: 24,
      widthInch: 15,
      patti45mmFoot: 5.25,
      handal68mmFoot: 1.25,
      glassAreaFoot: 2.5,
    },
    {
      type: 'Left Handle',
      height: 48,
      width: 15,
      units: 1,
      hingesCount: 1,
      hinges: 'Regular 3D softclose hinges',
      profile: '1mm Edge Gola',
      glass: 'Backpainted Glass',
      heightInch: 48,
      widthInch: 15,
      patti45mmFoot: 6.5,
      handal68mmFoot: 4,
      glassAreaFoot: 5,
    },
  ];

  glasses: any[] = [
    {
      height: 24,
      width: 24,
      glassName: 'Smoke Glass',
      glassEdge: 'Ruff',
      glassThickness: '4mm',
      units: 1,
      glassAreaFoot: 4,
    },
    {
      height: 36,
      width: 36,
      glassName: 'Smoke Glass',
      glassEdge: 'Ruff',
      glassThickness: '4mm',
      units: 2,
      glassAreaFoot: 18,
    },
    {
      height: 48,
      width: 24,
      glassName: 'Backpainted Glass',
      glassEdge: 'Ruff',
      glassThickness: '4mm',
      units: 1,
      glassAreaFoot: 8,
    },
  ];

  newShutter = {
    type: '',
    height: null as number | null,
    width: null as number | null,
    units: 1,
    hingesCount: 1,
    hinges: 'Regular 3D softclose hinges',
    profile: '3mm Edge Gola',
    glass: 'Smoke Glass',
  };

  newGlass = {
    height: null as number | null,
    width: null as number | null,
    glassName: 'Smoke Glass',
    glassEdge: 'Ruff',
    glassThickness: '4mm',
    units: 1,
  };

  objectKeys = Object.keys;

  ngOnInit(): void {
    (pdfMake as any).vfs = pdfFonts;
  }

  inchToFoot(inch: number): number {
    return +(inch / 12).toFixed(2);
  }

  toggleAddShutterForm() {
    this.showAddShutterForm = !this.showAddShutterForm;
    this.showAddGlassForm = false;
    this.ifEditGlass = false;
    this.selectedType = null;
    this.resetShutterForm();
  }

  toggleAddGlassForm() {
    this.showAddGlassForm = !this.showAddGlassForm;
    this.showAddShutterForm = false;
    this.ifEditShutter = false;
    this.resetGlassForm();
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

    console.log(this.shutters);

    // Reset form
    this.resetShutterForm();
    this.ifEditShutter = false;
    this.showAddShutterForm = false;
    this.selectedType = null;
  }

  saveGlass() {
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

    console.log(this.glasses);

    this.resetGlassForm();
    this.ifEditGlass = false;
    this.showAddGlassForm = false;
  }

  resetShutterForm() {
    this.newShutter = {
      type: '',
      height: null,
      width: null,
      units: 1,
      hingesCount: 1,
      hinges: 'Regular 3D softclose hinges',
      profile: '3mm Edge Gola',
      glass: 'Smoke Glass',
    };
  }

  resetGlassForm() {
    this.newGlass = {
      height: null as number | null,
      width: null as number | null,
      glassName: 'Smoke Glass',
      glassEdge: 'Ruff',
      glassThickness: '4mm',
      units: 1,
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

  editGlass(i: number, glass: any) {
    this.ifEditGlass = true;
    this.showAddGlassForm = true;
    this.selectedGlassId = i;

    this.newGlass.height = glass.height;
    this.newGlass.width = glass.width;
    this.newGlass.glassName = glass.glassName;
    this.newGlass.glassEdge = glass.glassEdge;
    this.newGlass.glassThickness = glass.glassThickness;
  }

  deleteShutter(i: number) {
    this.shutters.splice(i, 1);
  }

  deleteGlass(i: number) {
    this.glasses.splice(i, 1);
  }

  // -------------------------------
  // Material Summary
  // -------------------------------
  get materialSummary() {
    const profileCount: any = {};
    const hingesCount: any = {};
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
      addedGlassArea[g.glassThickness + ' ' + g.glassName] =
        (addedGlassArea[g.glassName] || 0) + g.glassAreaFoot;
    }

    return {
      profileCount,
      hingesCount,
      glassArea,
      addedGlassArea,
      connectors,
      labour,
      profilePatti,
    };
  }

  submitDetails() {
    console.log(this.materialSummary);
  }

  goToInvoice() {
    const profileAmount = this.calculateProfilePattiAmount(
      this.materialSummary,
      this.materialDetails
    );

    const connectorAmount = this.materialSummary.connectors * 80;

    const hingesAmount = this.calculateHingesAmount(
      this.materialSummary,
      this.materialDetails
    );

    const glassAmount = this.calculateGlassAmount(
      this.materialSummary,
      this.materialDetails
    );

    const extraGlassAmount: Record<string, ExtraGlass> =
      this.calculateExtraGlassAmount(
        this.materialSummary,
        this.materialDetails
      );

    console.log(extraGlassAmount);

    const labourAmount = this.materialSummary.labour * 500;
    const invoiceItems = [
      { name: 'Finish Profile', amount: profileAmount.grandTotal },
      { name: 'Connector', amount: connectorAmount },
      { name: 'Blandox 3D softclose Hings', amount: hingesAmount.grandTotal },
      { name: 'Profile Glass', amount: glassAmount.grandTotal },
      { name: 'Labour', amount: labourAmount },
    ];

    for (const key of Object.keys(extraGlassAmount)) {
      invoiceItems.push({
        name:
          key +
          ' - ' +
          extraGlassAmount[key].values +
          'ft²' +
          ' × ' +
          this.materialDetails.find((x) => x.name == key)?.patti_price,
        amount: extraGlassAmount[key].total,
      });
    }

    const grandTotal =
      profileAmount.grandTotal +
      connectorAmount +
      hingesAmount.grandTotal +
      glassAmount.grandTotal +
      labourAmount +
      Object.values(extraGlassAmount).reduce(
        (sum, item: any) => sum + item.total,
        0
      );

    this.generateInvoice(this.customer, invoiceItems, grandTotal);
  }

  private calculateProfilePattiAmount(summary: any, products: any) {
    const result: any = {};
    let grandTotal = 0;

    for (const profileName in summary.profilePatti) {
      if (summary.profilePatti.hasOwnProperty(profileName)) {
        const values = summary.profilePatti[profileName];

        const product = products.find(
          (p: any) => p.name.trim() === profileName.trim()
        );

        if (!product) continue;

        const pattiAmount = (values.patti45mm / 9.75) * product.patti_price; // convert Ft to patti so divide of 9.75
        const handalAmount = (values.handal68mm / 9.75) * product.handal_price;
        const total = pattiAmount + handalAmount;

        result[profileName] = {
          // patti45mm: values.patti45mm,
          // handal68mm: values.handal68mm,
          // patti_price: product.patti_price,
          // handal_price: product.handal_price,
          total,
        };

        grandTotal += total;
      }
    }

    return { result, grandTotal };
  }

  private calculateGlassAmount(summary: any, products: any) {
    const result: any = {};
    let grandTotal = 0;

    for (const glassName in summary.glassArea) {
      if (summary.glassArea.hasOwnProperty(glassName)) {
        const values = summary.glassArea[glassName];

        const product = products.find(
          (p: any) => p.name.trim() === glassName.trim()
        );

        if (!product) continue;
        const total = values * product.patti_price;

        result[glassName] = {
          total,
        };

        grandTotal += total;
      }
    }

    return { result, grandTotal };
  }

  private calculateExtraGlassAmount(summary: any, products: any) {
    console.log('summary' + JSON.stringify(summary));

    const result: any = {};
    // let grandTotal = 0;

    for (const glassName in summary.addedGlassArea) {
      if (summary.addedGlassArea.hasOwnProperty(glassName)) {
        const values = summary.addedGlassArea[glassName];

        const product = products.find(
          (p: any) => p.name.trim() === glassName.trim()
        );

        if (!product) continue;
        const total = values * product.patti_price;

        result[glassName] = {
          values,
          total,
        };

        // grandTotal += total;
      }
    }

    return result;
  }

  private calculateHingesAmount(summary: any, products: any) {
    const result: any = {};
    let grandTotal = 0;

    for (const hingesName in summary.hingesCount) {
      if (summary.hingesCount.hasOwnProperty(hingesName)) {
        const values = summary.hingesCount[hingesName];

        const product = products.find(
          (p: any) => p.name.trim() === hingesName.trim()
        );

        if (!product) continue;
        const total = values * product.patti_price;

        result[hingesName] = {
          total,
        };

        grandTotal += total;
      }
    }

    return { result, grandTotal };
  }

  generateInvoice(customer: any, items: any[], grandTotal: number) {
    const docDefinition: any = {
      pageSize: 'A4',
      pageMargins: [20, 10, 20, 30],

      footer: {
        columns: [
          {
            text: 'Contact: Rohitbhai - 9824893895 | Kaushalbhai - 7069398271',
            alignment: 'center',
            fontSize: 9,
            margin: [0, 5, 0, 5],
          },
        ],
      },

      content: [
        {
          table: {
            widths: ['*'],
            body: [
              [
                {
                  stack: [
                    // Top header
                    {
                      text: 'Estimate',
                      alignment: 'center',
                      bold: true,
                      margin: [0, 2, 0, 4],
                    },

                    // Shop name
                    {
                      text: 'JAY HARSIDDHI PROFILE SHUTTER',
                      alignment: 'center',
                      fontSize: 14,
                      bold: true,
                    },

                    // Address
                    {
                      text: 'Shop no. - 13, Lalguru Chambers, Malod Chokdi,\nNear Bypass Road, Wadhwan, Surendranagar, 363020.',
                      alignment: 'center',
                      margin: [0, 3, 0, 10],
                    },

                    // Customer + Invoice Details
                    {
                      columns: [
                        {
                          width: '*',
                          stack: [
                            {
                              text: `Name: ${customer.name}`,
                              bold: true,
                              fontSize: 10,
                            },
                            {
                              text: `Phone : ${customer.phone}`,
                              bold: true,
                              fontSize: 10,
                            },
                          ],
                        },
                        {
                          width: 'auto',
                          stack: [
                            {
                              columns: [
                                { text: 'Invoice No.:', width: 70 },
                                { text: '—' },
                              ],
                            },
                            {
                              columns: [
                                { text: 'Date:', width: 70 },
                                { text: new Date().toLocaleDateString() },
                              ],
                            },
                            {
                              columns: [
                                { text: 'Time:', width: 70 },
                                { text: new Date().toLocaleTimeString() },
                              ],
                            },
                          ],
                          fontSize: 9,
                        },
                      ],
                      margin: [0, 5, 0, 8],
                    },

                    // Table Header
                    {
                      table: {
                        widths: ['10%', '70%', '20%'],
                        body: [
                          [
                            { text: 'Sr No.', bold: true },
                            { text: 'Product Name', bold: true },
                            { text: 'Amount', bold: true, alignment: 'right' },
                          ],
                          ...items.map((item, i) => [
                            i + 1,
                            item.name,
                            {
                              text: item.amount.toFixed(0),
                              alignment: 'right',
                            },
                          ]),
                          [
                            {
                              text: '',
                              margin: [0, 5, 0, 5],
                            },
                            {
                              text: '',
                            },
                            {
                              text: '',
                            },
                          ],
                          [
                            {
                              text: '',
                            },
                            {
                              text: 'Grand Total',
                              bold: true,
                              alignment: 'right',
                              fontSize: 12,
                            },
                            {
                              text: grandTotal.toFixed(0),
                              bold: true,
                              alignment: 'right',
                              fontSize: 12,
                            },
                          ],
                        ],
                      },
                      margin: [0, 0, 0, 6],
                    },
                  ],
                  border: true,
                },
              ],
            ],
          },
        },
      ],
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
