import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CustomerService } from '../../../services/customer.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfjsLib from 'pdfjs-dist';
import { version } from 'pdfjs-dist'
(pdfjsLib as any).GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`

@Component({
  selector: 'app-view-invoice',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './view-invoice.component.html',
  styleUrl: './view-invoice.component.scss'
})
export class ViewInvoiceComponent implements OnInit {

  imgSrc?: string

  constructor(private customerService: CustomerService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {

    (pdfMake as any).vfs = pdfFonts;

    const customerId = this.activatedRoute.snapshot.params["id"]
    const customer = await this.getCustomerDetail(customerId)
    const materialDetails = await this.customerService.getMaterialDetail()

    this.customerService.getCustomerMaterial(customerId).subscribe(async (res: any) => {
      const data = await this.customerService.getInvoiceDetails(res.result, materialDetails)
      const docDefinition = await this.customerService.generateInvoice(customer, data.invoiceItems, data.grandTotal);
      pdfMake.createPdf(docDefinition, pdfMake.tableLayouts,
        pdfMake.fonts,
        pdfMake.vfs).getDataUrl(async (res) => {
          const encodeData = res.replace('data:application/pdf;base64,', '');
          const pdfData = atob(encodeData); // Decode Base64 PDF
          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;

          this.imgSrc = await this.renderPage(pdf, 1);
        });
    })
  }

  async renderPage(pdf: any, pageNumber: number): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const page = await pdf.getPage(pageNumber);
      const scale = 3.0; // Increase scale for better clarity
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      // Increase actual canvas resolution
      const outputScale = window.devicePixelRatio || 2; // Adjust based on screen resolution
      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      ctx.scale(outputScale, outputScale);

      await page.render({ canvasContext: ctx, viewport }).promise;

      resolve(canvas.toDataURL('image/png', 1.0));
    });
  }

  async getCustomerDetail(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.customerService.getCustomerById(id).subscribe((res) => {
        resolve(res)
      })
    })
  }
}
