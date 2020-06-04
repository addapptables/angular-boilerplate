import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-organization-unit-association-layout',
  templateUrl: './organization-unit-association-layout.component.html',
  styleUrls: ['./organization-unit-association-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationUnitAssociationLayoutComponent {

  @Input()
  organizationUnitId: number;

}
