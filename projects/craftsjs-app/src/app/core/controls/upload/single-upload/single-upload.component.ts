import { Component, EventEmitter, Output, ChangeDetectionStrategy, OnInit, Input, ElementRef, Optional, Self } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NgForm, FormGroupDirective, NgControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
import { FileUploaderService } from '../../../../shared/services/file-uploader.service';
import { BaseControlValueAccessor } from '../../base-control-value-accessor';

@Component({
  selector: 'app-single-upload',
  templateUrl: './single-upload.component.html',
  styleUrls: ['./single-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MatFormFieldControl, useExisting: SingleUploadComponent }
  ]
})
export class SingleUploadComponent extends BaseControlValueAccessor<string> implements OnInit {

  name: string;

  file: File;

  uploader: FileUploader;

  @Input()
  title = 'general.file';

  @Input()
  multiple = false;

  @Output()
  selectFile = new EventEmitter<File>();

  @Output()
  allFiles = new EventEmitter<File[]>();

  @Input()
  autoUpload = false;

  loadingSubject = new BehaviorSubject(false);

  loading$ = this.loadingSubject.asObservable();

  constructor(
    elementRef: ElementRef,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Self() @Optional() public ngControl: NgControl,
    private _fileUploaderService: FileUploaderService
  ) {
    super(elementRef, _defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
  }

  ngOnInit(): void {
    this.uploader = this._fileUploaderService.createUploader('api/File/SaveBinaryFile', (result) => {
      this.loadingSubject.next(false);
      this.onChange({ value: result.id });
    });
  }

  changeFile($event) {
    const selectedFiles = [];
    const files = Array.from<File>($event.target.files);
    files.forEach(file => {
      if (file.type.includes('image')) {
        this.file = file;
        this.name = this.file.name;
        selectedFiles.push(file);
        this.selectFile.emit(file);
      }
    });
    if (selectedFiles.length > 0) {
      this.allFiles.emit(selectedFiles);
    }
    if (this.autoUpload) {
      this.uploader.addToQueue(selectedFiles);
      this.loadingSubject.next(true);
      this.uploader.uploadAll();
    }
  }
}
