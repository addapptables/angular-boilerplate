import { Injectable, Inject } from '@angular/core';
import { NotifierService } from '@craftsjs/notifier';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenService, CONFIGURATION_BOILERPLATE, ConfigurationModel } from '@craftsjs/boilerplate';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor(
    private _tokenService: TokenService,
    private _translateService: TranslateService,
    private _notifier: NotifierService,
    private _httClient: HttpClient,
    @Inject(CONFIGURATION_BOILERPLATE)
    private _configuration: ConfigurationModel,
  ) { }

  createUploader(
    url: string,
    success?: (result: any) => void,
    onCompleteAll?: () => void,
    additionalParameter?: any,
  ): FileUploader {
    const uploader = new FileUploader({
      url: this._configuration.remoteServiceBaseUrl + url,
    });
    uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    uploader.onSuccessItem = (_, response) => {
      const ajaxResponse = JSON.parse(response);
      if (ajaxResponse.success) {
        if (success) {
          success(ajaxResponse.result);
        }
      } else {
        this._notifier.openError(
          this._translateService.instant('general.error'),
          this._translateService.instant(ajaxResponse.error.message),
        );
      }
    };

    uploader.onCompleteAll = () => {
      onCompleteAll !== undefined && onCompleteAll();
    };

    const uploaderOptions: FileUploaderOptions = {};
    uploaderOptions.authToken = 'Bearer ' + this._tokenService.getToken();
    uploaderOptions.additionalParameter = additionalParameter;
    uploaderOptions.removeAfterUpload = true;
    uploader.setOptions(uploaderOptions);
    return uploader;
  }

  getFile(id: string) {
    const url = this._configuration.remoteServiceBaseUrl + `api/File/GetBinaryFile?id=${id}`;
    return this._httClient.get(url, { responseType: 'blob' }).pipe(
      map(blob => ({ id, blob }))
    );
  }

  getAllFiles(ids: string[]) {
    const observables = ids.map(x => this.getFile(x));
    return forkJoin(observables);
  }
}
