import { Component, OnInit } from '@angular/core';
import { async } from '@firebase/util';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { __await } from 'tslib';
import { Producto } from './Backend/Modelo';




@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPageModule implements OnInit {
  

  productos: Producto[] = [];

  newProducto: Producto = {
    nombre : '',
    precio : null,
    cantidad : null,
    descripcion : '',
    foto : '',
    id : this.firestoreService.getId(),
    fecha : new Date(),
  } 

      enableNewProd = false;

  private path = 'Productos/'; 

  newImageload = '';
  newFile = '';

  loading: any;



  constructor(public menucontroler:MenuController,
              public firestoreService: FirestoreService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController: AlertController,
              public firestorageService: FirestorageService) { }




              
  ngOnInit() {
    this.getProd();
  }

  openMenu(){
    console.log('open Menu');
    this.menucontroler.toggle('principal');
  }

  async guardarProd(){
    this.presentLoading();
    const path = "Productos";
    const name = this.newProducto.nombre;
    //const res = await this.firestorageService.uploadImage(this.newFile, path, name);
    //this.newProducto.foto = res;

    const id = this.firestoreService.getId(); 
    this.firestoreService.createDoc(this.newProducto, this.path, this.newProducto.id).then( res => {
    this.loading.dismiss(); 
      
      this.presentToast('Guardado exitosamente!!!'); 
      }).catch( error => {
        this.presentToast('No fue posible guardar la información'); 
    });   
  }

  getProd(){ 
    this.firestoreService.getCollection<Producto>(this.path).subscribe( res => { 
      this.productos = res;
    });
  } 

  async eliminarProd(producto: Producto){ 
      const alert = await this.alertController.create({
        cssClass: 'normal', //cambair a normal
        header: 'Advertencia!', //Que titulo va a contener la ventana
        message: '¿Seguro que quieres <strong>eliminar</strong> este Producto?',
        buttons: [
          {
            text: 'No', //Cambiaremos por No
            role: 'cancel',
            cssClass: 'normal', // Podemos dejar o quitar
            id: 'cancel-button',
            handler: (blah) => { //Esto es una llamada
              console.log('Confirm Cancel: blah'); // Si damos clic , se cerrara la ventana
            }
          }, {
            text: 'Si', // Cambiaremos por Si
            id: 'confirm-button',
            handler: () => { //Esto es una llamada
              console.log('Confirm Okay');
              this.firestoreService.deleteDoc(this.path, producto.id).then( res => {
                this.presentToast('Eliminado con exito!!!'); 
                this.alertController.dismiss();
              }).catch( error => {
                this.presentToast('No fue posible eliminar la información'); 
              });;
            }
          }
        ]
      });
  
      await alert.present();
    }

  nuevo(){
    this.enableNewProd = true;
    this.newProducto = {
    nombre: ' ',
    precio: null,
    cantidad: null,
    descripcion: ' ',
    foto: ' ',                     
    id: this.firestoreService.getId(),
    fecha: new Date()
    };
  }
 //

 async presentLoading() { //Función asincrona, 
  this.loading = await this.loadingController.create({
    cssClass: 'normal',  //Se puede dejar, o se puede quitar
    message: 'Guardando....', //Cambiamos mensage
    duration: 2000 //Quitamos 
  });
  await this.loading.present(); //Crea y presenta 
}



async presentToast(msg: string) { // msg --> enviamos parametro 
  const toast = await this.toastController.create({
    message: msg,
    duration: 2000, //Durante 2 segundos
  });
  toast.present(); // Va a presentar
}

async newImage(event: any){
  
  if (event.target.files && event.target.files[0]){
    this.newFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = ((image) => {
      this.newProducto.foto= image.target.result as string;
    });
    reader.readAsDataURL(event.target.files[0]);
  }

}
    
}
