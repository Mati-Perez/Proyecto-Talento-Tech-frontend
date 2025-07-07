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

    verMas.addEventListener("click", (e) => {
      abrirModal(e, item);
    });
    

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

  const seccion = document.querySelector("#productos");

  const btnExistente = document.getElementById("btn-vaciar");
  if (btnExistente) {
    btnExistente.remove();
  }

  const btnLimpiar = document.createElement("button");
  btnLimpiar.textContent = "Vaciar Favoritos";
  btnLimpiar.id="btn-vaciar";
  btnLimpiar.addEventListener("click", function() {
    vaciarFavoritos();
  });
  seccion.appendChild(btnLimpiar);
}


const abrirModal = (e, item) => {
  e.preventDefault();

  const modal = document.getElementById("modal");
  const modalContenido = document.getElementById("modal-detalle");

  modalContenido.innerHTML = '<span class="cerrar">&times;</span>';

  const contenido = `
    <h2>${item.direccion1}</h2>
    <img src="${item.imagen}" alt="Imagen propiedad" style="width: 100%; border-radius: 8px; margin-bottom: 15px;" />
    <p><strong>Ambientes:</strong> ${item.ambientes}</p>
    <p><strong>Precio:</strong> ${item.precio}</p>
    <p><strong>Dirección:</strong> ${item.direccion1} ${item.direccion2}</p>
    <p><strong>Más detalles:</strong> Propiedad en excelente estado con servicios modernos, ideal para vivir o invertir.</p>
    <div style="margin-top: 20px; display: flex; justify-content: space-between;">
      <button id="btn-contactar" style="padding: 10px 20px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Contactar Vendedor</button>
      <button id="btn-cerrar" style="padding: 10px 20px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Cerrar</button>
    </div>
  `;

  modalContenido.innerHTML += contenido;

  document.getElementById("btn-contactar").addEventListener("click", () => {
    alert("Gracias por tu interés. En breve nos contactaremos con vos.");
    window.location.href = "index.html";
  });

  document.getElementById("btn-cerrar").addEventListener("click", () => {
    modal.classList.remove("visible");
  });

  modal.classList.add("visible");

  modalContenido.querySelector(".cerrar").addEventListener("click", () => {
    modal.classList.remove("visible");
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("visible");
    }
  });
};


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

  actualizarContadorFavoritos();
  mostrarFavoritos();
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".hamburguesa");
  const menu = document.querySelector(".menu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("activo");
  });

  actualizarContadorFavoritos();
})

window.addEventListener("beforeunload", () => {

  localStorage.setItem("favoritos",JSON.stringify(favoritos))
  localStorage.setItem("botones",JSON.stringify(botones))
})

mostrarFavoritos();

const actualizarContadorFavoritos = () => {
  const fav = document.querySelector("#fav a");
  if(botones.length === 0){
    fav.innerHTML = `Favoritos`
  }else{
    fav.innerHTML = `Favoritos(${botones.length})`
  }
}


const vaciarFavoritos = () => {
  
  favoritos = [];
  botones = [];
  mostrarFavoritos();
  actualizarContadorFavoritos();
}

