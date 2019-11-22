import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { PaymentTypeService } from "src/app/services/registers/payment-type.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { Logouttable } from "src/app/classes/logouttable";
import { PaymentTypeInterface } from "src/app/interfaces/payment-type.interface";
import { DeletePaymentTypeComponent } from "./delete/delete-payment-type.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-payment-types",
  templateUrl: "./payment-types.component.html",
  styleUrls: ["./payment-types.component.css"]
})
export class PaymentTypesComponent extends Logouttable implements OnInit {
  private loading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private paymentTypesService: PaymentTypeService,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  public paymentTypes: PaymentTypeInterface[] = [];

  ngOnInit() {
    this.paymentTypesService.getAll().subscribe(
      response => {
        if (response["data"].length > 0) {
          this.paymentTypes = response["data"];
          console.log("paymentTypes", this.paymentTypes);
        }
        this.loading = false;
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di caricamento dei tipi di pagamento",
            "",
            {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-warning alert-with-icon",
              positionClass: "toast-top-right"
            }
          );
        }
        this.loading = false;
      }
    );
  }

  editPaymentType(paymentType: PaymentTypeInterface) {
    this.router.navigate(["payment_types", paymentType.id, "edit"]);
  }

  deleteConfirmation(paymentType: PaymentTypeInterface) {
    const dialogRef = this.dialog.open(DeletePaymentTypeComponent, {
      data: {
        paymentType: paymentType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "delete") {
        this.loading = true;
        this.deletePaymentType(paymentType);
      }
    });
  }

  deletePaymentType(paymentType: PaymentTypeInterface) {
    this.paymentTypesService.delete(paymentType.id).subscribe(
      result => {
        const idx = this.paymentTypes.indexOf(paymentType);
        this.paymentTypes.splice(idx, 1);
        this.loading = false;
        this.toastr.info("Tipo di pagamento eliminato correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di eliminazione dei tipi di pagamento",
            "",
            {
              timeOut: 8000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-warning alert-with-icon",
              positionClass: "toast-top-right"
            }
          );
          this.loading = false;
        }
      }
    );
  }
}
