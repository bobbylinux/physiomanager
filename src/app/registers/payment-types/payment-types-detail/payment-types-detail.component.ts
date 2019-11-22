import { Component, OnInit } from "@angular/core";
import { PaymentTypeInterface } from "src/app/interfaces/payment-type.interface";
import { FormGroup, FormControl } from "@angular/forms";
import { PaymentTypeService } from "src/app/services/registers/payment-type.service";
import { ActivatedRoute, Router } from "@angular/router";
import { PaymentType } from "src/app/classes/payment-type";
import { Logouttable } from "src/app/classes/logouttable";
import { AuthService } from "src/app/services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-payment-types-detail",
  templateUrl: "./payment-types-detail.component.html",
  styleUrls: ["./payment-types-detail.component.css"]
})
export class PaymentTypesDetailComponent extends Logouttable implements OnInit {
  public newPaymentType = false;
  public loading: boolean = false;

  enabledOptions = [
    { id: true, text: "Sì" },
    { id: false, text: "No" }
  ];

  private paymentType: PaymentTypeInterface;

  formGroup = new FormGroup({
    id: new FormControl(),
    description: new FormControl(),
    enabled: new FormControl()
  });

  constructor(
    private paymentTypeService: PaymentTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    super();
  }

  ngOnInit() {
    this.paymentType = new PaymentType();
    this.route.params.subscribe(params => {
      if (!params.id) {
        this.newPaymentType = true;
        return;
      }
      this.loading = true;
      this.paymentTypeService.get(params.id, "").subscribe(
        response => {
          if (response["data"].length > 0) {
            this.paymentType = response["data"][0];
            this.formGroup = new FormGroup({
              id: new FormControl(this.paymentType.id),
              description: new FormControl(this.paymentType.description),
              enabled: new FormControl(this.paymentType.enabled)
            });
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
    });
  }

  get id() {
    return this.formGroup.get("id");
  }

  get description() {
    return this.formGroup.get("description");
  }

  get enabled() {
    return this.formGroup.get("enabled");
  }

  addPaymentType() {
    const description = this.description.value;
    const enabled = this.enabled.value;
    const paymentType = new PaymentType();
    paymentType.description = description;
    paymentType.enabled = enabled.toString() == "true" ? true : false;
    this.paymentTypeService.create(paymentType).subscribe(
      () => {
        this.toastr.info("Tipo di pagamento aggiunto correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.router.navigate(["payment_types"]);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di aggiunta del tipo di pagamento",
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

  updatePaymentType() {
    const id = this.id.value;
    const description = this.description.value;
    const enabled = this.enabled.value;
    const paymentType = new PaymentType();
    paymentType.id = id;
    paymentType.description = description;
    paymentType.enabled = enabled.toString() == "true" ? true : false;

    this.paymentTypeService.update(paymentType).subscribe(
      () => {
        this.toastr.info("Tipo di pagamento modificato correttamente", "", {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: "toast-top-right"
        });
        this.router.navigate(["payment_types"]);
      },
      error => {
        if (error.status && error.status == 401) {
          this.logout(this.auth, this.router, this.toastr);
        } else {
          this.toastr.info(
            "Errore in fase di aggiornamento del tipo di pagamento",
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
      }
    );
  }

  submitForm() {
    this.loading = true;
    if (this.newPaymentType) {
      this.addPaymentType();
    } else {
      this.updatePaymentType();
    }
  }
}
