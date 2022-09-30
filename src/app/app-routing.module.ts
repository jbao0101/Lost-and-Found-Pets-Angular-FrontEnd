import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { MapComponent } from './map/map.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
    {path: 'Search', component: SearchComponent},
    {path: 'Map', component: MapComponent},
    {path: '', component: SignupComponent}
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }