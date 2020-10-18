
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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClipboardModule } from 'ngx-clipboard';

import { RecepieComponent } from './recepie/recepie.component';
import { TagSearchComponent } from './tag-search/tag-search.component';
import { RecepiePreviewComponent } from './recepie-preview/recepie-preview.component';
import { TextFilterPipe } from './text-filter-pipe';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { SeasonViewerComponent } from './season-viewer/season-viewer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { EditTagsComponent } from './edit-tags/edit-tags.component';
import { CollectionComponent } from './collection/collection.component';
import { CollectionOverviewComponent } from './collection-overview/collection-overview.component';
import { CollectionPreviewComponent } from './collection-preview/collection-preview.component';
import { TeaserImageComponent } from './teaser-image/teaser-image.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecepieComponent,
    TagSearchComponent,
    RecepiePreviewComponent,
    TextFilterPipe,
    IngredientsComponent,
    SeasonViewerComponent,
    NotFoundComponent,
    EditRecipeComponent,
    EditTagsComponent,
    CollectionComponent,
    CollectionOverviewComponent,
    CollectionPreviewComponent,
    TeaserImageComponent,
    EditCollectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatAutocompleteModule,
    ClipboardModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatInputModule,
    InfiniteScrollModule,
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
      { path: 'recipe/edit/:id', component: EditRecipeComponent },
      { path: 'add-recepie', component: EditRecipeComponent },
      { path: 'edit-tags', component: EditTagsComponent },
      { path: 'collection', component: CollectionOverviewComponent },
      { path: 'collection/edit/:id', component: EditCollectionComponent },
      { path: 'collection/:id', component: CollectionComponent },
      { path: 'add-collection', component: EditCollectionComponent },
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '/404'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
