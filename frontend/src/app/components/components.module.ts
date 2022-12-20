import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header/header.component";




const components = [
    HeaderComponent,
    FooterComponent,
    RegisterFormComponent,
    LoginFormComponent
]

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: components,
    exports: components
})

export class ComponentsModule {}
