import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';



  // WYSIWYGS
// import { AngularEditorModule } from '@kolkov/angular-editor';
import { CKEditorModule } from 'ckeditor4-angular';


// COMPONENTES
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarRegComponent } from './components/navbar-reg/navbar-reg.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardRegComponent } from './components/dashboard-reg/dashboard-reg.component';
import { PolicyComponent } from './components/policy/policy.component';
import { LiteracyComponent } from './components/literacy/literacy.component';
import { DatavComponent } from './components/datav/datav.component';
import { DownloadComponent } from './components/download/download.component';
import { ContactComponent } from './components/contact/contact.component';
import { WhoweareComponent } from './components/whoweare/whoweare.component';
import { LatestComponent } from './components/latest/latest.component';
import { AutorComponent } from './components/autor/autor.component';
import { SearchComponent } from './components/search/search.component';
import { PagecontactComponent } from './components/pagecontact/pagecontact.component';
import { FooterComponent } from './components/footer/footer.component';
import { FooterMainComponent } from './components/footer-main/footer-main.component';
import { MainRegComponent } from './components/main-reg/main-reg.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReporteComponent } from './components/reporte/reporte.component';
  // usuarios
import { UsersLoginComponent } from './components/users-login/users-login.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersEditComponent } from './components/users-edit/users-edit.component';
import { UsersAddComponent } from './components/users-add/users-add.component';
import { UsersDelComponent } from './components/users-del/users-del.component';
import { UsersLogoutComponent } from './components/users-logout/users-logout.component';
  // news
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsAddComponent } from './components/news-add/news-add.component';
import { NewsEditComponent } from './components/news-edit/news-edit.component';
import { NewsDelComponent } from './components/news-del/news-del.component';
  // categories
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoriesAddComponent } from './components/categories-add/categories-add.component';
import { CategoriesEditComponent } from './components/categories-edit/categories-edit.component';
import { CategoriesDelComponent } from './components/categories-del/categories-del.component';
//Photos

// SERVICIOS
import { CategoriesService } from './services/categories.service';
import { NewsService } from './services/news.service';
import { UsersService } from './services/users.service';
import {CargarjvService} from './services/cargarjv.service';
import { EditComponent } from './components/principal/edit/edit.component';
import { FotoslistComponent } from './components/datavisual/fotoslist/fotoslist.component';
import { VideoslistComponent } from './components/datavisual/videoslist/videoslist.component';
import { VideosaddComponent } from './components/datavisual/videosadd/videosadd.component';
import { VideoseditComponent } from './components/datavisual/videosedit/videosedit.component';
import { VideosdelComponent } from './components/datavisual/videosdel/videosdel.component';
import { FotosaddComponent } from './components/datavisual/fotosadd/fotosadd.component';
import { FotosdelComponent } from './components/datavisual/fotosdel/fotosdel.component';
import { FotoseditComponent } from './components/datavisual/fotosedit/fotosedit.component';
import { ReportphotoComponent } from './components/reportphoto/reportphoto.component';
import { NewsaddphotoComponent } from './components/newsaddphoto/newsaddphoto.component';
import { AddpdfComponent } from './components/addpdf/addpdf.component';











@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarRegComponent,
    UsersListComponent,
    NewsListComponent,
    NewsAddComponent,
    NewsEditComponent,
    UsersEditComponent,
    UsersAddComponent,
    MainComponent,
    UsersDelComponent,
    CategoriesListComponent,
    CategoriesAddComponent,
    CategoriesEditComponent,
    CategoriesDelComponent,
    NewsDelComponent,
    DashboardComponent,
    DashboardRegComponent,
    PolicyComponent,
    LiteracyComponent,
    DatavComponent,
    DownloadComponent,
    ContactComponent,
    UsersLoginComponent,
    UsersLogoutComponent,
    WhoweareComponent,
    LatestComponent,
    AutorComponent,
    SearchComponent,
    PagecontactComponent,
    FooterComponent,
    FooterMainComponent,
    MainRegComponent,
    RegistroComponent,
    ReporteComponent,
    EditComponent,
    FotoslistComponent,
    VideoslistComponent,
    VideosaddComponent,
    VideoseditComponent,
    VideosdelComponent,
    FotosaddComponent,
    FotosdelComponent,
    FotoseditComponent,
    ReportphotoComponent,
    NewsaddphotoComponent,
    AddpdfComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule
    
    
  ],
  providers: [
    CategoriesService,NewsService,UsersService,
    DatePipe,CargarjvService,
    {provide: LocationStrategy, useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
