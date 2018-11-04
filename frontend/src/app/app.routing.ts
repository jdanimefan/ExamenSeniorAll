import { Routes, RouterModule } from '@angular/router';

import {CreateComponent} from './create/create.component';
import {SearchComponent} from './search/search.component';
import {DeleteComponent} from './delete/delete.component';
import {UpdateComponent} from './update/update.component';
import { ReportComponent } from './report/report.component';

const appRoutes: Routes = [
    { path: '', component: CreateComponent },
    { path: 'search', component: SearchComponent },
    { path: 'update', component: UpdateComponent},
    { path: 'pagomensual', component: DeleteComponent},
    { path: 'reporte', component: ReportComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);