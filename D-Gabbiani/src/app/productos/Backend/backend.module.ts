import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductosPage } from "../productos.module";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

@NgModule({
    declarations: [
        ProductosPage,
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
})
export class BackendModule { }