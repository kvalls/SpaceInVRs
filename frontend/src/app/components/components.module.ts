import { FooterComponent } from './footer/footer.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";




const components = [
    HeaderComponent,
    FooterComponent
]

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule
    ],
    declarations: components,
    exports: components
})

export class ComponentsModule {}
