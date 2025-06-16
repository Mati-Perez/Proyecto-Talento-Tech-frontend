let favoritos = JSON.parse(localStorage.getItem("favoritos") ) || [];
let botones = JSON.parse(localStorage.getItem("botones")) || [];

const mostrarFavoritos = () => {
  let contador=0;

  const lista = document.getElementById("productos-fav");

  if(favoritos.length===0){
    lista.style= "height: 50vh;"
  }else{
    lista.style= "height: auto;"
  }

  const contenedores = document.querySelectorAll(".productos-container");
  contenedores[0].innerHTML = "";
  contenedores[1].innerHTML = "";
  contenedores[2].innerHTML = "";

  if(favoritos.length === 0){
    lista.innerHTML = '<h2>Aun no has agregado ninguna propiedad</h2>';
    
    return;
  }
  if(botones.length === 0){
    lista.innerHTML = '<h2>Aun no has agregado ninguna propiedad</h2>';

    return;
  }

  favoritos.forEach((item, indice) => {
    const producto = document.createElement("div");
    producto.classList.add("producto");

    const contenedorImagen = document.createElement("div");
    contenedorImagen.classList.add("contenedor-imagen");

    const imagen = document.createElement("img");
    imagen.src = item.imagen;

    const btnFav = document.createElement("button");
    btnFav.classList.add("btn-favorito");
    btnFav.id=botones[indice].id;
    
    const iconoCorazon = document.createElement("i");
    iconoCorazon.classList.add("fa-solid");
    iconoCorazon.classList.add("fa-heart");
    iconoCorazon.classList.add("fa-2x");
    

    btnFav.appendChild(iconoCorazon);

    btnFav.classList.add("activo");
    
    btnFav.addEventListener("click", function() {
      agregarAFavoritos(this, item.imagen, item.ambientes, item.precio, item.direccion1, item.direccion2);
    });
  
  
    contenedorImagen.appendChild(imagen);
    contenedorImagen.appendChild(btnFav);

    const ambientes = document.createElement("p");
    ambientes.innerHTML = item.ambientes;

    const precio = document.createElement("p");
    precio.innerHTML = item.precio;

    const direccion1 = document.createElement("p");
    direccion1.innerHTML = item.direccion1;

    const direccion2 = document.createElement("p");
    direccion2.innerHTML = item.direccion2;

    const verMas = document.createElement("a");
    verMas.href="#";
    verMas.text="ver mas";

    producto.appendChild(contenedorImagen);
    producto.appendChild(ambientes);
    producto.appendChild(precio);
    producto.appendChild(direccion1);
    producto.appendChild(direccion2);
    producto.appendChild(verMas);
   

    if(contador < 3){
      contenedores[0].appendChild(producto);
      
    }else if(contador <6){
      contenedores[1].appendChild(producto);
      
    }else{
      contenedores[2].appendChild(producto);
    }
    
    contador++;
  })
}

const agregarAFavoritos = (button, imagen, ambientes, precio, direccion1, direccion2) => {
  const nuevoObjeto = {
    key: button.id,
    imagen: imagen,
    ambientes: ambientes,
    precio: precio,
    direccion1: direccion1,
    direccion2: direccion2
  };
  
  toggleHeart(button, nuevoObjeto)
}

const toggleHeart = (button, prop) => {
  button.classList.toggle("activo");

  if(button.classList.contains("activo")){
    favoritos.push(prop)
    localStorage.setItem(button.id, "activo");
  }else{
    
    const indexProp = favoritos.findIndex(producto => producto.key === button.id);
    const indexBtn = botones.findIndex(boton => boton.id === button.id);
    console.log('button id', button.id);
    console.log(button);
    favoritos.forEach(favorito => {
      console.log('producto key:', favorito.key)
    })

    botones.forEach(boton => {
      console.log('boton key:', boton.id)
    })

    console.log('indexbtn:', indexBtn);
    console.log('indexProp', indexProp)
    if(indexBtn !== -1){
      botones.splice(indexBtn, 1);
    }
    if(indexProp != -1){
      favoritos.splice(indexProp, 1);
    }
  }
}

window.addEventListener("beforeunload", () => {
 

  localStorage.setItem("favoritos",JSON.stringify(favoritos))
  localStorage.setItem("botones",JSON.stringify(botones))
})

mostrarFavoritos();


