export class PermissionTreeModel {
    id: string;
    name: string;
    hasParent: boolean;
    children: PermissionTreeModel[];
    level: number;
    parentId: string;
}
