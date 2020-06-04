import { Injectable, Injector } from '@angular/core';
import { ProfileDto } from '../models/profile-dto.model';
import { UpdateProfileDto } from '../models/update-profile-dto.model';
import { ServiceApiBase } from '@redux/shared/services/service-base';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ServiceApiBase {

  constructor(injector: Injector) {
    super(injector, 'api/users/profile');
  }

  getProfile() {
    return this.get<ProfileDto>('get');
  }

  update(profile: UpdateProfileDto) {
    return this.put<UpdateProfileDto, ProfileDto>('update', profile);
  }
}
