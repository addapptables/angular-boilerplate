import { NgModule } from '@angular/core';
import { CropImageComponent } from './components/crop-image/crop-image.component';
import { ImageCropperModule } from 'ngx-img-cropper';
import { SharedModule } from '../../../shared/shared.module';
import { SingleUploadModule } from '../upload/single-upload/single-upload.module';

@NgModule({
  declarations: [CropImageComponent],
  imports: [
    SharedModule,
    SingleUploadModule,
    ImageCropperModule
  ],
  exports: [
    CropImageComponent
  ]
})
export class CropImageModule { }
