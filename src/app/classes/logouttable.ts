import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ToastrService } from "ngx-toastr";

export abstract class Logouttable {
  logout(auth: AuthService, router: Router, toastr: ToastrService) {
    toastr.info("Sessione scadura, accedere nuovamente", "", {
      timeOut: 8000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-warning alert-with-icon",
      positionClass: "toast-top-right"
    });
    auth.logout();
    router.navigate(["login"]);
  }
}
