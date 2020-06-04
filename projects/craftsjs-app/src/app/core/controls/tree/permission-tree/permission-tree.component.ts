import { Component, ChangeDetectionStrategy, forwardRef, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { PermissionTreeService } from './services/permission-tree.service';
import { PermissionTreeFlatNode } from './models/permission-tree-flat.model';
import { PermissionTreeModel } from './models/permission-tree.model';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-permission-tree',
  templateUrl: './permission-tree.component.html',
  styleUrls: ['./permission-tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PermissionTreeComponent),
      multi: true
    },
    PermissionTreeService
  ]
})
export class PermissionTreeComponent implements ControlValueAccessor, OnDestroy {

  value: string[] = [];
  flatNodeMap = new Map<PermissionTreeFlatNode, PermissionTreeModel>();
  nestedNodeMap = new Map<PermissionTreeModel, PermissionTreeFlatNode>();
  treeControl: FlatTreeControl<PermissionTreeFlatNode>;
  treeFlattener: MatTreeFlattener<PermissionTreeModel, PermissionTreeFlatNode>;
  dataSource: MatTreeFlatDataSource<PermissionTreeModel, PermissionTreeFlatNode>;
  checklistSelection = new SelectionModel<PermissionTreeFlatNode>(true);

  propagateChange = (_: any) => { };
  onTouched: any = () => { };

  constructor(private _permissionTreeService: PermissionTreeService, private _cdr: ChangeDetectorRef) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
      this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<PermissionTreeFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    _permissionTreeService.connect()
      .subscribe(data => {
        this.dataSource.data = data;
        this.treeControl.expandAll();
        this._selectNodes();
        this._cdr.markForCheck();
      });
  }

  getChildren = (node: PermissionTreeModel): PermissionTreeModel[] => node.children;

  getLevel = (node: PermissionTreeFlatNode) => node.level;

  isExpandable = (node: PermissionTreeFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: PermissionTreeFlatNode) => _nodeData.expandable;

  transformer = (node: PermissionTreeModel, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.name === node.name
      ? existingNode
      : new PermissionTreeFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = node.children.length > 0;
    flatNode.parentId = node.parentId;
    flatNode.id = node.id;
    flatNode.hasParent = node.hasParent;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  descendantsPartiallySelected(node: PermissionTreeFlatNode): boolean {
    return this.checklistSelection.isSelected(node) && !this.descendantsAllSelected(node);
  }

  descendantsAllSelected(node: PermissionTreeFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  writeValue(values: string[]): void {
    if (values) {
      this.value = values;
      this._selectNodes();
    }
  }

  private _selectNodes() {
    const selectedNodes = this.value;
    this.flatNodeMap.forEach((value, key) => {
      const isSelected = selectedNodes.find(y => y === value.id);
      if (isSelected !== undefined && !this.checklistSelection.isSelected(key)) {
        this.checklistSelection.select(key);
      }
    });
  }

  permissionChildSelectionToggle(node: PermissionTreeFlatNode): void {
    this._toggleChild(node);
    this._change();
  }

  permissionSelectionToggle(node: PermissionTreeFlatNode): void {
    this._toggleParent(node);
    this._change();
  }

  private _toggleChild(node: PermissionTreeFlatNode) {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    this.checkAllParentsSelection(node);
  }

  private _toggleParent(node: PermissionTreeFlatNode) {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: PermissionTreeFlatNode): void {
    let parent: PermissionTreeFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: PermissionTreeFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    if (!nodeSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: PermissionTreeFlatNode): PermissionTreeFlatNode | null {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  private _change() {
    this.onTouched();
    const nodes = this.checklistSelection.selected.map(x => x.id);
    this.propagateChange(nodes);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnDestroy(): void {
    this._permissionTreeService.disconnect();
  }
}
