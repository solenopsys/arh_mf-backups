import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {BootstrapComponent, TABLE_PAGE, UITemplatesModule} from "@solenopsys/ui-templates";
import {DataPageConfig, DgraphDataBuffered, FieldType} from "@solenopsys/fl-dgraph";
import {FormsModule} from "@angular/forms";
import {UIListsModule} from "@solenopsys/ui-lists";
import {CommonModule} from "@angular/common";
import {ClusterState} from "@solenopsys/fl-clusters";
import {HStreamsState} from "@solenopsys/fl-hyperstreams";

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
  {provide: 'assets_dir', useValue: "/fm/modules/mf-backups"},
  {provide: 'mod_name', useValue: "backups"}
]

export const STATES=[ ClusterState, HStreamsState]

export const IMPORTS_CONF = [
  BrowserModule,
  RouterModule.forChild(routes),//todo сделать child
  FormsModule,
  UITemplatesModule,

  UIListsModule,
  CommonModule,
]
@NgModule({
  declarations: [],
  imports: [
    ...IMPORTS_CONF
  ],
  providers: [...PROVIDERS_CONF],
})
export class RemoteEntryModule {}
