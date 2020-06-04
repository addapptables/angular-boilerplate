import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileLayoutComponent } from './components/profile-layout/profile-layout.component';
import { ProfileBasicInfoComponent } from './components/profile-basic-info/profile-basic-info.component';
import { ReduxRegisterModule } from '@craftsjs/ngrx-action';
import { ProfileStore } from '@redux/profile/stores/profile.store';
import { ProfileEffects } from '@redux/profile/effects/profile.effects';
import { EffectsModule } from '@ngrx/effects';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { ProfileChangePasswordComponent } from './components/profile-change-password/profile-change-password.component';
import { CropImageModule } from '../controls/crop-image/crop-image.module';
import { SharedFormsModule } from '../../shared/shared-forms-module.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ProfileLayoutComponent,
    ProfileBasicInfoComponent,
    ProfileFormComponent,
    ProfileChangePasswordComponent
  ],
  imports: [
    SharedModule,
    SharedFormsModule,
    ProfileRoutingModule,
    CropImageModule,
    ReduxRegisterModule.forFeature('profile', { store: ProfileStore }),
    EffectsModule.forFeature([ProfileEffects])
  ]
})
export class ProfileModule { }
