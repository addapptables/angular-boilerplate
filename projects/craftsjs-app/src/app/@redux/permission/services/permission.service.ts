import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { PermissionDto } from '../models/permission-dto.model';
import { ServiceApiBase } from '@redux/shared/services/service-base';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/permissions');
  }

  getAll(): Observable<PermissionDto[]> {
    return this.get<PermissionDto[]>('');
  }
}
