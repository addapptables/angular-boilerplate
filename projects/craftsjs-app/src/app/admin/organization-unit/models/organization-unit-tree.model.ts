export class OrganizationUnitTreeModel {
    id: string;
    name: string;
    parentId: string;
    hasParent: boolean;
    level: number;
    children: OrganizationUnitTreeModel[];
}
