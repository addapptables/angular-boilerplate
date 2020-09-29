import { Component, ChangeDetectionStrategy, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { OrganizationUnitTreeFlatNode } from '../../models/organization-unit-tree-flat.model';
import { OrganizationUnitTreeModel } from '../../models/organization-unit-tree.model';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { OrganizationUnitTreeService } from '../../services/organization-tree.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { OrganizationUnitDto } from '@redux/organization-unit/models/organization-unit-dto.model';
import { OrganizationUnitActionService } from '../../services/organization-unit-action.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-organization-unit-tree',
  templateUrl: './organization-unit-tree.component.html',
  styleUrls: ['./organization-unit-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    OrganizationUnitTreeService,
    OrganizationUnitActionService
  ]
})
export class OrganizationUnitTreeComponent implements OnDestroy {

  flatNodeMap = new Map<OrganizationUnitTreeFlatNode, OrganizationUnitTreeModel>();
  nestedNodeMap = new Map<OrganizationUnitTreeModel, OrganizationUnitTreeFlatNode>();
  treeControl: FlatTreeControl<OrganizationUnitTreeFlatNode>;
  treeFlattener: MatTreeFlattener<OrganizationUnitTreeModel, OrganizationUnitTreeFlatNode>;
  dataSource: MatTreeFlatDataSource<OrganizationUnitTreeModel, OrganizationUnitTreeFlatNode>;

  loading$: Observable<boolean>;

  isEmptySubject = new BehaviorSubject(true);

  isEmpty$ = this.isEmptySubject.asObservable();

  contextMenuPosition = { x: '0px', y: '0px' };

  @ViewChild(MatMenuTrigger, { static: true })
  contextMenu: MatMenuTrigger;

  @Output()
  selectOrganizationId = new EventEmitter<string>();

  selection = new SelectionModel(false);

  constructor(
    private _organizationUnitTreeService: OrganizationUnitTreeService,
    private _organizationUnitActionService: OrganizationUnitActionService
  ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<OrganizationUnitTreeFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.loading$ = _organizationUnitTreeService.loading$;
    _organizationUnitTreeService.connect()
      .subscribe(data => {
        this.dataSource.data = data;
        this.isEmptySubject.next(data.length === 0);
        this.treeControl.expandAll();
      });
  }

  getLevel = (node: OrganizationUnitTreeFlatNode) => node.level;

  isExpandable = (node: OrganizationUnitTreeFlatNode) => node.expandable;

  getChildren = (node: OrganizationUnitTreeModel): OrganizationUnitTreeModel[] => node.children;

  hasChild = (_: number, _nodeData: OrganizationUnitTreeFlatNode) => _nodeData.expandable;

  transformer = (node: OrganizationUnitTreeModel, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.id === node.id
      ? existingNode
      : new OrganizationUnitTreeFlatNode();
    flatNode.id = node.id;
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = node.children.length > 0;
    flatNode.parentId = node.parentId;
    flatNode.hasParent = node.hasParent;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  onContextMenu(event: MouseEvent, node: OrganizationUnitDto) {
    event.preventDefault();
    this.contextMenuPosition.x = `${event.clientX}px`;
    this.contextMenuPosition.y = `${event.clientY}px`;
    this.contextMenu.menuData = { organizationUnit: node };
    this.contextMenu.openMenu();
  }

  editOrganizationUnit(organizationUnit: OrganizationUnitDto) {
    this._organizationUnitActionService.openModalUpsert(organizationUnit);
  }

  addSubUnit(organizationUnit: OrganizationUnitDto) {
    this._organizationUnitActionService.openModalUpsert({ parentId: organizationUnit.id } as OrganizationUnitDto);
  }

  deleteOrganizationUnit(organizationUnit: OrganizationUnitDto) {
    this._organizationUnitActionService.deleteOrganizationUnit(organizationUnit);
  }

  onSelectOrganization(node: OrganizationUnitTreeFlatNode) {
    this.selection.select(node.id);
    this.selectOrganizationId.emit(node.id);
  }

  ngOnDestroy(): void {
    this._organizationUnitTreeService.disconnect();
  }
}
