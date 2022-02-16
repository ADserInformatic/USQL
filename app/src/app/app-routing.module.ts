import { FotoseditComponent } from './components/datavisual/fotosedit/fotosedit.component';
import { ReportphotoComponent } from './components/reportphoto/reportphoto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModuleWithProviders} from '@angular/compiler/src/core';
//componentes
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRegComponent } from './components/dashboard-reg/dashboard-reg.component';
import { PolicyComponent } from './components/policy/policy.component';
import { LiteracyComponent } from './components/literacy/literacy.component';
import { DatavComponent } from './components/datav/datav.component';
import { DownloadComponent } from './components/download/download.component';
import { PagecontactComponent } from './components/pagecontact/pagecontact.component';
import {MainRegComponent} from './components/main-reg/main-reg.component';
import {RegistroComponent} from './components/registro/registro.component';
import { ReporteComponent } from './components/reporte/reporte.component';

//NOTICIAS
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsAddComponent } from './components/news-add/news-add.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { NewsDelComponent } from './components/news-del/news-del.component';
//USUARIOS
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersEditComponent } from './components/users-edit/users-edit.component';
import { UsersAddComponent } from './components/users-add/users-add.component';
import { UsersDelComponent } from './components/users-del/users-del.component';
import { UsersLoginComponent } from './components/users-login/users-login.component';
import { UsersLogoutComponent} from './components/users-logout/users-logout.component';
//CATEGORIAS
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoriesAddComponent } from './components/categories-add/categories-add.component';
import { CategoriesEditComponent } from './components/categories-edit/categories-edit.component';
import { CategoriesDelComponent } from './components/categories-del/categories-del.component';
import { from } from 'rxjs';
//fotos y videos
import { FotoslistComponent } from './components/datavisual/fotoslist/fotoslist.component';
import { VideoslistComponent } from './components/datavisual/videoslist/videoslist.component';
import { VideoseditComponent } from './components/datavisual/videosedit/videosedit.component';
import { VideosdelComponent } from './components/datavisual/videosdel/videosdel.component';
import { FotosaddComponent } from './components/datavisual/fotosadd/fotosadd.component';
import { FotosdelComponent } from './components/datavisual/fotosdel/fotosdel.component';
import { VideosaddComponent } from './components/datavisual/videosadd/videosadd.component';
import { EditComponent } from './components/principal/edit/edit.component';
//pdf
import { AddpdfComponent } from './components/addpdf/addpdf.component';


const routes: Routes = [
 {path:'', component: MainComponent},//elijo el componente que va como principal
 {path:'newreg', component: RegistroComponent},
 {path:'main', component: MainComponent},
 {path:'panelu',component: DashboardComponent } ,
 {path:'panela',component:  DashboardRegComponent },
 {path:'addpdf/:new_id',component:  AddpdfComponent },
 //{path:'panela/:ppal',component:  DashboardRegComponent },
 {path:'policy',component: PolicyComponent },
 {path:'literacy',component: LiteracyComponent },
 {path:'dvisuals',component: DatavComponent },
 {path:'download',component: DownloadComponent },
 {path:'contact',component: PagecontactComponent }, 
 {path:'mainr',component:MainRegComponent},
 {path: 'rep', component: ReporteComponent},
 {path: 'repp', component: ReportphotoComponent},
 {path: 'repp/:repp_id', component: ReportphotoComponent},
 {path: 'rep/:rep_id', component: ReporteComponent},
 {path: 'ppal',component:EditComponent},

    //Photos y videos
  {path: 'pholist', component: FotoslistComponent},
  {path:'phoadd', component: FotosaddComponent},
  {path:'phodel/:repp_id', component: FotosdelComponent},
  {path:'phodel', component: FotosdelComponent},
  {path:'phodel/:repp_id', component: FotosdelComponent},
  {path:'rec', component:FotoseditComponent},

  //Videos
  {path: 'vidlist',component: VideoslistComponent},
  {path:'vidadd', component: VideosaddComponent},
  {path:'videdit/:vid_id', component: VideoseditComponent},
  {path:'viddel/:vid_id', component: VideosdelComponent},
  {path:'reppvid', component: VideoseditComponent},
  {path:'reppvid/:vid_id', component: VideoseditComponent},
  {path:'viddel', component: VideosdelComponent},
  {path:'viddel/:vid_id', component: VideosdelComponent},


    // news
  {path:'newslist', component: NewsListComponent},
  {path:'newsadd', component: NewsAddComponent},
  {path:'newsedit/:new_id', component: NewsEditComponent},
  {path:'newsdel/:new_id', component: NewsDelComponent},
  {path:'newsedit', component: NewsEditComponent},
  {path:'newsdel', component: NewsDelComponent},
    // users
  {path:'userslist', component: UsersListComponent},
  {path:'useredit', component: UsersEditComponent},
  {path:'useredit/:user_id', component: UsersEditComponent},
  {path:'userdel', component: UsersDelComponent},
  {path:'userdel/:user_id', component: UsersDelComponent},
  {path:'usersadd', component: UsersAddComponent},
  {path: 'web-panel', component:UsersLoginComponent},
  {path: 'logout', component:UsersLogoutComponent},
    // categories
    {path:'categorieslist', component: CategoriesListComponent},
    {path:'categoryedit', component: CategoriesEditComponent},
    {path:'categoryedit/:cat_id', component: CategoriesEditComponent},
    {path:'categorydel', component: CategoriesDelComponent},
    {path:'categorydel/:cat_id', component: CategoriesDelComponent},
    {path:'categoryadd', component: CategoriesAddComponent},
    {path:'**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    ,{useHash: false}
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
// export const routingComponent = [DashboardComponent,DashboardRegComponent,PolicyComponent,LiteracyComponent,
//                                 DatavComponent,DownloadComponent,ContactComponent,NewsListComponent,NewsAddComponent,
//                                 NewsEditComponent,UsersListComponent,UsersEditComponent,UsersDelComponent,UsersAddComponent,
//                                 UsersLoginComponent,CategoriesListComponent,CategoriesEditComponent,CategoriesDelComponent,CategoriesAddComponent]
