import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Glass } from '../model/glass';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  materialDetails: any = [];
  private setIndex = new BehaviorSubject<number>(0)
  getIndex = this.setIndex.asObservable()

  constructor(private http: HttpClient) { }

  sendMaterialDetail(data: any) {
    this.materialDetails = data
  }

  getMaterialDetail() {
    return this.materialDetails
  }

  sendIndex(index: number) {
    this.setIndex.next(index)
  }

  addCustomer(data: any) {
    return this.http.post(environment.apiUrl + '/customer', data)
  }

  updateCustomer(id: string, data: any) {
    return this.http.put(environment.apiUrl + '/customer/' + id, data)
  }

  getAllCustomer() {
    return this.http.get(environment.apiUrl + '/customer')
  }

  getCustomerById(id: string) {
    return this.http.get(environment.apiUrl + '/customer/' + id)
  }

  addShutters(id: string, shutters: any) {
    return this.http.post(environment.apiUrl + '/customer/' + id + '/add-shutters', shutters)
  }

  addGlasses(id: string, glasses: any) {
    return this.http.post(environment.apiUrl + '/customer/' + id + '/add-glasses', glasses)
  }

  getAllMaterial() {
    return this.http.get(environment.apiUrl + '/customer/material')
  }

  getAllItem(routeName: string) {
    return this.http.get(environment.apiUrl + '/customer/' + routeName)
  }

  addTotalAmount(id: string, amount: any) {
    return this.http.post(environment.apiUrl + '/customer/' + id + '/add-amount', amount)
  }

  addOrderDetails(id: string, data: any) {
    return this.http.post(environment.apiUrl + '/customer/' + id + '/add-orderDetail', data)
  }

  addOtherDetails(id: string, data: any) {
    return this.http.post(environment.apiUrl + '/customer/' + id + '/add-other', data)
  }

  async getInvoiceDetails(materialSummary: any, materialDetails: any, otherDetail?: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const profileAmount = this.calculateProfilePattiAmount(
        materialSummary,
        materialDetails
      );

      const connectorAmount = materialSummary.connectors * 80;

      const hingesAmount = this.calculateHingesAmount(
        materialSummary,
        materialDetails
      );

      const pumpAmount = this.calculatePumpAmount(
        materialSummary,
        materialDetails
      );

      const glassAmount = this.calculateGlassAmount(
        materialSummary,
        materialDetails
      );

      const extraGlassAmount: Record<string, Glass> =
        this.calculateExtraGlassAmount(
          materialSummary,
          materialDetails
        );

      const labourAmount = materialSummary.labour * 500;
      let invoiceItems = [];

      if (profileAmount.grandTotal > 0) {
        invoiceItems.push({ name: 'Finish Profile', amount: profileAmount.grandTotal })
      }

      if (connectorAmount > 0) {
        invoiceItems.push({ name: 'Connector', amount: connectorAmount })
      }

      if (hingesAmount.grandTotal > 0) {
        invoiceItems.push({ name: 'Blandox 3D softclose Hings', amount: hingesAmount.grandTotal })
      }

      if (glassAmount.grandTotal > 0) {
        invoiceItems.push({ name: 'Profile Glass', amount: glassAmount.grandTotal })
      }

      if (pumpAmount.grandTotal > 0) {
        invoiceItems.push({ name: 'Blandox Softclose Jumper', amount: pumpAmount.grandTotal })
      }

      if (labourAmount > 0) {
        invoiceItems.push({ name: 'Profile Labour', amount: labourAmount })
      }

      for (const key of Object.keys(extraGlassAmount)) {
        invoiceItems.push({
          name:
            key +
            ' - ' +
            extraGlassAmount[key].values +
            'ft²' +
            ' × ' +
            materialDetails.find((x: any) => x.name == key)?.pattiPrice,
          amount: extraGlassAmount[key].total,
        });
      }

      for (let other of otherDetail ?? []) {
        invoiceItems.push({
          name: other.key,
          amount: other.value
        })
      }

      const grandTotal =
        profileAmount.grandTotal +
        connectorAmount +
        hingesAmount.grandTotal +
        (pumpAmount.grandTotal || 0) +
        glassAmount.grandTotal +
        labourAmount +
        (Object.values(extraGlassAmount).reduce(
          (sum, item: any) => sum + item.total,
          0
        ) || 0) +
        (otherDetail?.reduce((sum, item) => {
          return sum + Number(item.value || 0)
        }, 0) || 0);

      resolve({ invoiceItems, grandTotal })
    })
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

        const pattiAmount = (values.patti45mm / 9.75) * product.pattiPrice; // convert Ft to patti so divide of 9.75
        const handalAmount = (values.handal68mm / 9.75) * product.handalPrice;
        const total = pattiAmount + handalAmount;

        result[profileName] = {
          // patti45mm: values.patti45mm,
          // handal68mm: values.handal68mm,
          // pattiPrice: product.pattiPrice,
          // handalPrice: product.handalPrice,
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
        const total = values * product.pattiPrice;

        result[glassName] = {
          total,
        };

        grandTotal += total;
      }
    }

    return { result, grandTotal };
  }

  private calculateExtraGlassAmount(summary: any, products: any) {
    const result: any = {};
    // let grandTotal = 0;

    for (const glassName in summary.addedGlassArea) {
      if (summary.addedGlassArea.hasOwnProperty(glassName)) {
        const values = summary.addedGlassArea[glassName];

        const product = products.find(
          (p: any) => p.name.trim() === glassName.trim()
        );

        if (!product) continue;
        const total = values * product.pattiPrice;

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
        const total = values * product.pattiPrice;

        result[hingesName] = {
          total,
        };

        grandTotal += total;
      }
    }

    return { result, grandTotal };
  }

  private calculatePumpAmount(summary: any, products: any) {
    const result: any = {};
    let grandTotal = 0;

    for (const pumpName in summary.pumpCount) {
      if (summary.pumpCount.hasOwnProperty(pumpName)) {
        const values = summary.pumpCount[pumpName];

        const product = products.find(
          (p: any) => p.name.trim() === pumpName.trim()
        );

        if (!product) continue;
        const total = values * product.pattiPrice;

        result[pumpName] = {
          total,
        };

        grandTotal += total;
      }
    }

    return { result, grandTotal };
  }

  async generateInvoice(customer: any, items: any[], grandTotal: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const docDefinition: any = {
        pageSize: 'A4',
        pageMargins: [20, 10, 20, 30],

        background: function () {
          return {
            canvas: [
              {
                type: 'rect',
                x: 10,
                y: 10,
                w: 575,   // A4 width - margins
                h: 822,   // A4 height - margins
                r: 0,
                lineWidth: 1
              }
            ]
          };
        },

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
                                text: `Phone : ${customer.phoneNumber}`,
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
                                  { text: this.formatDateDDMMYYYY(customer.updatedAt) },
                                ],
                              },
                              {
                                columns: [
                                  { text: 'Time:', width: 70 },
                                  { text: new Date(customer.updatedAt).toLocaleTimeString('en-IN') },
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

      resolve(docDefinition)
    })
  }

  private formatDateDDMMYYYY(date: string | Date): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
