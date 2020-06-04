import { Pipe, PipeTransform } from '@angular/core';
import { SessionService } from '@craftsjs/boilerplate';

@Pipe({
  name: 'isGranted'
})
export class IsGrantedPipe implements PipeTransform {

  constructor(private _sessionService: SessionService) { }

  transform(permission: string): boolean {
    const user = this._sessionService.user;
    if (!user) { return false; }
    return user.permissions.find(x => x === permission) !== undefined;
  }

}
