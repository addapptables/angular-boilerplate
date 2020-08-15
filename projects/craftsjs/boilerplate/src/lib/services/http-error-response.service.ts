import { MatDialogRef } from '@angular/material/dialog';
import { DialogAlertComponent, AlertService } from '@craftsjs/alert';
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpErrorResponseService {

  defaultError = {
    message: 'No se ha obtenido respuesta del servidor',
  };

  defaultError401 = {
    message: 'You are not authenticated!',
  };

  defaultError403 = {
    message: 'You are not authorized!',
  };

  defaultError404 = {
    message: 'Resource not found!',
  };

  dialog: MatDialogRef<DialogAlertComponent>;

  constructor(
    private alertService: AlertService,
    private translateService: TranslateService
  ) { }

  handleNonErrorResponse(response: HttpResponse<any>) {
    switch (response.status) {
      case 401:
        this.showError(this.defaultError401);
        break;
      case 403:
        this.showError(this.defaultError403);
        break;
      case 404:
        this.showError(this.defaultError404);
        break;
      default:
        this.showError(this.defaultError);
        break;
    }
  }

  showError(error): any {
    let message = '';
    if (Array.isArray(error.message)) {
      message = error.message[0] || this.defaultError.message;
    } else {
      message = error.message || this.defaultError.message;
    }
    this.dialog && this.dialog.close();
    this.dialog = this.alertService.showError('Error', this.translateService.instant(message));
  }

}
