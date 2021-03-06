import { Component, OnInit, OnDestroy } from '@angular/core';
import { Posts } from '../../models/posts.model';
import { TheGuardianService } from '../../services/posts/the-guardian.service';
import { UrlResolverService } from '../../services/common/url-resolver.service';
import { NewYorkTimesService } from '../../services/posts/new-york-times.service';
import { NewsSouces } from '../../util/news-source';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**
 * This class is the page component renderer which contains methods to fetch news posts
 * and then pass it to the view layer
 */
@Component({
  selector: 'app-blogging-page',
  templateUrl: './blogging-page.component.html',
  styleUrls: ['./blogging-page.component.scss']
})
export class BloggingPageComponent implements OnInit, OnDestroy {
  
  private posts: Posts[] = [];
  private ngUnsubscribe = new Subject();

  constructor(private theGuardianSvc: TheGuardianService,
    private urlResolverSvc: UrlResolverService,
    private newYorkTimesSvc: NewYorkTimesService ) { }

  ngOnInit() {
    const THE_GUARDIAN = NewsSouces[NewsSouces.THE_GUARDIAN];
    const NEW_YORK_TIMES = NewsSouces[NewsSouces.NEW_YORK_TIMES];
    this.getNewsPosts(THE_GUARDIAN);
    //this.getNewsPosts(NEW_YORK_TIMES);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  //This method gets the news posts and creates an array of Posts objects that are displayed on screen
  private getNewsPosts(agent: string) {
    var postArr: Posts[] = this.posts;
    const newsServiceurl = this.urlResolverSvc.getServiceURL(agent);

    if(NewsSouces.THE_GUARDIAN === NewsSouces[agent]) {
      newsServiceurl.pipe(
        takeUntil(this.ngUnsubscribe)
      ).pipe(
        mergeMap(url => this.theGuardianSvc.fetchNewsPosts(url))
      ).subscribe(
        data => {
          data.response.results.map(
            postObjct => postArr.push(new Posts(postObjct))
          )
        }
      );
    } else if(NewsSouces.NEW_YORK_TIMES === NewsSouces[agent]) {
      newsServiceurl.pipe(
        takeUntil(this.ngUnsubscribe)
      ).pipe(
        mergeMap(url => this.newYorkTimesSvc.fetchNewsPosts(url)
        )
      ).subscribe(
        data => data.results.map(
          postObjct => {
            postObjct.webTitle = postObjct.title;
            postObjct.webUrl = postObjct.url;
            postObjct.type = postObjct.item_type;
            postObjct.webPublicationDate = postObjct.published_date;
            postArr.push(new Posts(postObjct))
          }
        )
      );
    }
    this.posts = postArr;
  }
}