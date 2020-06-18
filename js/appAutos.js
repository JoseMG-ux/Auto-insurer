
//PROYECTO FINALIZADO
// Builder for insurance, collect the info
class Seguro{
     constructor (marca, anio, tipo) {
          this.marca = marca;
          this.anio = anio;
          this.tipo = tipo; 
     }
     


cotizarSeguro(){
    /*

          1 = Americano 1.15
          2 = Asiatico 1.05
          3 = Europeo 1.35

    */
   let cantidad;
   const base = 2000;
   switch(this.marca){
        case '1': cantidad = base * 1.15;
        break;
        case '2': cantidad = base * 1.05;
        break;
        case '3': cantidad = base * 1.35;
        break;
   }
   const diferencia = new Date().getFullYear() - this.anio;
   // Each year of difference the value of the insurance must be reduced by 3%
    cantidad -= ((diferencia*3)) * cantidad / 100;

    /*
     If the insurance is basic it is multiplied by 38% more
     If the insurance is complete 56% more.
    */

     if(this.tipo === 'basico'){
          cantidad *= 1.30;
     }else{
          cantidad *= 1.50; 
     }
   return cantidad;
}
}






class Interfaz{

     //Message that prints in HTML
     mostrarMensaje (mensaje, tipo){
         const div = document.createElement('div');
         
         if(tipo === 'error'){
              
               div.classList.add('mensaje','error');
          
         }else{
               div.classList.add('mensaje','correcto');
               
         }
         div.innerHTML = `${mensaje}`;
         formulario.insertBefore(div, document.querySelector('.form-group'));
         setTimeout(function(){
               document.querySelector('.mensaje').remove();
         },3000);
        
     }
     mostrarCotizando(mensaje){
          const div = document.createElement('div');
          
          
                div.classList.add('mensaje','loading','correcto');
                
          
          div.innerHTML = `${mensaje}`;
          formulario.insertBefore(div, document.querySelector('.form-group'));
          setTimeout(function(){
                document.querySelector('.mensaje').remove();
          },3000);
         
      }


     //Print the result of the quote
     mostrarInfo (seguro, total){
          const resultado = document.getElementById('resultado');
          let marca;
          switch(seguro.marca){
                    case '1': marca = 'Americano';
                    break;
                    case '2': marca = 'Asiatico';
                    break;
                    case '3':  marca ='Europeo';
                    break;
          }
          const div = document.createElement('div');

          div.innerHTML = `
               <p class="header">Tu resumen:</p>

               <p >Marca: ${marca}</p>

               <p>Año: ${seguro.anio}</p>

               <p>Tipo: ${seguro.tipo}</p>

               <p>Total: ${total}</p>

          `;
          const spinner = document.querySelector('#cargando img');
          spinner.style.display = 'block';
          
          setTimeout(function(){
               spinner.style.display = 'none';
               
               resultado.appendChild(div);
               
          },3000 );       
}
}
//EventListener

const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
     e.preventDefault();
     //Read mark (Spinner)
     const marca = document.getElementById('marca');
     const marcaSeleccionada = marca.options[marca.selectedIndex].value;
     
     
     //Read year (Spinner)
     const anio = document.getElementById('anio');
     const anioSeleccionado = anio.options[anio.selectedIndex].value;

     //Read the value of RadioButton
     const tipo = document.querySelector('input[name="tipo"]:checked').value;

     //Create interface instance
     const interfaz = new Interfaz();
     
     //Check that the fields are not empty
     if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
          //Interface printing error
          interfaz.mostrarMensaje('Falta datos, revisa el formulario y prueba de nuevo', 'error');
          
     }else{


          //clear previous results
          const resultados = document.querySelector('#resultado div');
               if(resultados != null){
                    resultados.remove();
               }
          //Instant Secure
               const seguro = new Seguro(marcaSeleccionada,anioSeleccionado,tipo)
          //Quote insurance
          const cantidad = seguro.cotizarSeguro(seguro);     
          
          //Show result

          interfaz.mostrarInfo(seguro, cantidad);
          interfaz.mostrarCotizando('Cotizando','loading');       
     }
     
     
});



//Years
const max = new Date().getFullYear(),
     min = max - 20;

const selecAnio = document.getElementById('anio');

for(let i = max; i > min; i--){
     let option = document.createElement('option');
     option.value = i;
     option.innerHTML = i;
     selecAnio.appendChild(option);
}