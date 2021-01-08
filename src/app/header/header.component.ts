import {Component, OnDestroy, OnInit} from '@angular/core';

import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import * as fromApp from '../store/app.reducer';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService,
              private store: Store<fromApp.AppState>) {
  }

  onSaveData() {
   // this.dataStorageService.storeRecipes();
    this.store.dispatch(new RecipesActions.StoreRecipes());
  }

  onFetchData() {
    //  this.dataStorageService.fetchRecipes().subscribe();
    this.store.dispatch(new RecipesActions.FetchRecipes());
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth').pipe(map(authState => {
      return authState.user;
    })).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogOut() {
    //this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }
}
