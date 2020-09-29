import {
  Component, ViewChild,
  ChangeDetectionStrategy, forwardRef, AfterViewInit
} from '@angular/core';
import { CropperSettings, ImageCropperComponent } from 'ngx-img-cropper';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CropImageComponent),
      multi: true
    }
  ]
})
export class CropImageComponent implements ControlValueAccessor, AfterViewInit {

  image: any = {};

  cropperSettings: CropperSettings;

  disabled: boolean;

  writeImage: HTMLImageElement;

  @ViewChild(ImageCropperComponent, { static: true })
  cropper: ImageCropperComponent;

  constructor() {
    this.setCropperSettings();
  }

  setCropperSettings() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 400;
    this.cropperSettings.height = 400;
    this.cropperSettings.minWithRelativeToResolution = true;
    this.cropperSettings.croppedWidth = 400;
    this.cropperSettings.croppedHeight = 400;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 400;
    this.cropperSettings.minWidth = 200;
    this.cropperSettings.minHeight = 200;
    this.cropperSettings.rounded = true;
    this.cropperSettings.cropperDrawSettings.strokeColor =
      'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.dynamicSizing = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  propagateChange = (_: any) => { };
  onTouched: any = () => { };

  selectFile(event: File) {
    const image = new Image();
    const reader = new FileReader();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    reader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      image.onload = () => {
        self.cropper.setImage(image);
      };
    };
    reader.readAsDataURL(event);
  }

  onCrop() {
    this.propagateChange(this.image.image);
  }

  writeValue(obj: any): void {
    if (obj) {
      const image = new Image();
      image.src = obj;
      this.writeImage = image;
      this.cropper && this.cropper.cropper && this.cropper.setImage(image);
    } else {
      this.cropper.cropper && this.cropper.reset();
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngAfterViewInit(): void {
    this.writeImage && this.cropper && this.cropper.cropper && this.cropper.setImage(this.writeImage);
  }
}
