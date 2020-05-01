//Se creo la rama develop


// Constructor para seguro, recolecta la info
function Seguro(marca, anio, tipo){
     this.marca = marca;
     this.anio = anio;
     this.tipo = tipo;
}

//Todo lo que se muestra
function Interfaz(){

     

}
//EventListener

const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function(e){
     e.preventDefault();

     const marca = document.getElementById('marca');
     const marcaSeleccionada = marca.options[marca.selectedIndex].value;

     //Leer anio
     const anio = document.getElementById('anio');
     const anioSeleccionado = anio.options[anio.selectedIndex].value;

     //Lee el valor del RadioButton

     const tipo = document.querySelector('input[name="tipo"]:checked').value;

     //Crear instancia de Interfaz
     const interfaz = new Interfaz();
     
     //Revisar que los campos no esten vacios
     if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
          //Interfaz imprimiendo un error
          console.log('Falton datos')
     }else{
          //Instanciar seguro

          console.log('exito')
     }
     console.log(tipo)
});



//Años
const max = new Date().getFullYear(),
     min = max - 20;

const selecAnio = document.getElementById('anio');

for(let i = max; i > min; i--){
     let option = document.createElement('option');
     option.value = i;
     option.innerHTML = i;
     selecAnio.appendChild(option);
}