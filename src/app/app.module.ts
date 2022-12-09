import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {BootstrapComponent, FuiTemplatesModule, GridState, TABLE_PAGE} from "@solenopsys/uimatrix-templates";
import {DataPageConfig, FieldType} from "@solenopsys/lib-dgraph";
import {FormsModule} from "@angular/forms";
import {createNgxs} from "@solenopsys/lib-storage";
import { FuiGridModule, RowsState} from "@solenopsys/uimatrix-lists";
import {CommonModule} from "@angular/common";
import {environment} from "../environments/environment";
import {ClusterState} from "@solenopsys/lib-clusters";
import {DgraphDataBuffered} from "@solenopsys/lib-dgraph";


export const BACKUPS: DataPageConfig = {
  title: 'Backups',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {key: 'develop.backup', title: 'Backup', type: FieldType.STRING},
    {key: 'host', title: 'Host', type: FieldType.STRING},
    {key: 'command', title: 'Command', type: FieldType.STRING_MULTILINE},
  ],
  commands: ['edit'],
  listQ: 'has(develop.backup)',
  dataProvider: DgraphDataBuffered,
};

export const BACKUPS_ARCHIVES: DataPageConfig = {
  title: 'Archives',
  fields: [
    {key: 'uid', title: 'UID', type: FieldType.UID},
    {
      key: 'develop.backup.archive',
      title: 'Backup',
      type: FieldType.EUID,
      link: {titleField: 'develop.backup', multiple: false}
    },
    {key: 'local.location', title: 'Local Location', type: FieldType.STRING},
    {key: 'aws.location', title: 'AWS Location', type: FieldType.STRING},
    {key: 'aws.archiveId', title: 'AWS Archive Id', type: FieldType.STRING},
    {key: 'aws.checksum', title: 'AWS Checksum', type: FieldType.STRING},
    {key: 'size', title: 'Size MB', type: FieldType.NUMBER},
    {key: 'date', title: 'Date', type: FieldType.DATE},
  ],
  commands: [],
  listQ: 'has(develop.backup.archive)',
  dataProvider: DgraphDataBuffered,
};

const routes: Routes = [
  TABLE_PAGE(':table'),
  {path: '', redirectTo: 'configs', pathMatch: 'full'},
];


const TABLES = {
  configs: BACKUPS,
  archives: BACKUPS_ARCHIVES,
};

export const PROVIDERS_CONF = [
  //todo убрать это
  {provide: 'tables', useValue: TABLES},
  {provide: 'assets_dir', useValue: "/fm/modules/alexstorm/backups"},
  {provide: 'mod_name', useValue: "backups"}
]

export const IMPORTS_CONF = [
  BrowserModule,
  RouterModule.forChild(routes),//todo сделать child
  FormsModule,
  FuiTemplatesModule,
  ...createNgxs(!environment.production, []), //todo убрать это ClusterState, HStreamsState

  FuiGridModule,
  CommonModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...IMPORTS_CONF
  ],
  providers: [...PROVIDERS_CONF],
  bootstrap: [BootstrapComponent],
})
export class AppModule {
}
