
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import{MatCheckboxModule} from '@angular/material/checkbox';
import{MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { ImageCropperModule } from 'ngx-image-cropper';

import { RecepieComponent } from './recepie/recepie.component';
import { TagSearchComponent } from './tag-search/tag-search.component';
import { RecepiePreviewComponent } from './recepie-preview/recepie-preview.component';
import { TextFilterPipe } from './text-filter-pipe';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { AddRecepieComponent } from './add-recepie/add-recepie.component';
import { SeasonViewerComponent } from './season-viewer/season-viewer.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecepieComponent,
    TagSearchComponent,
    RecepiePreviewComponent,
    TextFilterPipe,
    IngredientsComponent,
    AddRecepieComponent,
    SeasonViewerComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatInputModule,
    MatMenuModule,
    ImageCropperModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    RouterModule.forRoot([
      { path: '', component: TagSearchComponent },
      { path: 'recipe/:id', component: RecepieComponent },
      { path: 'add-recepie', component: AddRecepieComponent },
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '/404'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
