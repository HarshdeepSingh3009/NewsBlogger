import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BloggingPageComponent } from './components/blogging-page/blogging-page.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { TheGuardianService } from './services/posts/the-guardian.service';
import { UrlResolverService } from './services/common/url-resolver.service';
import { NewYorkTimesService } from './services/posts/new-york-times.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutUsComponent,
    BloggingPageComponent,
    BlogPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    TheGuardianService,
    UrlResolverService,
    NewYorkTimesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
