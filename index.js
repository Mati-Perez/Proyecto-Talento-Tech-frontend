
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let botones = JSON.parse(localStorage.getItem("botones")) || [];


document.addEventListener("DOMContentLoaded", async () => {
  const btn = document.querySelector(".hamburguesa");
  const menu = document.querySelector(".menu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("activo");
  });

  const contenedor = document.getElementById("propiedades-container");
  let contador = 0;

  try {
    const response = await fetch("https://api-prop.onrender.com/api/propiedades");
    const data = await response.json();

    let grupoContainer = null;

    data.forEach((propiedad, index) => {
      if (contador % 3 === 0) {
        grupoContainer = document.createElement("div");
        grupoContainer.className = "productos-container";
      }

      const producto = document.createElement("div");
      producto.className = "producto";

      const contenedorImagen = document.createElement("div");
      contenedorImagen.className = "contenedor-imagen";

      const imagen = document.createElement("img");
      imagen.src = propiedad.imagen;
      imagen.alt = propiedad.titulo;

      const btnFav = document.createElement("button");
      btnFav.className = "btn-favorito";
      btnFav.id = `heart${contador + 1}`;
      btnFav.innerHTML = `<i class="fa-solid fa-heart fa-2x"></i>`;

      btnFav.addEventListener("click", function () {
        agregarAFavoritos(
          this,
          propiedad.imagen,
          propiedad.titulo,
          propiedad.moneda + propiedad.precio,
          propiedad.ciudad,
          propiedad.provincia,
          propiedad.direccion
        );
      });

      contenedorImagen.appendChild(imagen);
      contenedorImagen.appendChild(btnFav);

      const titulo = document.createElement("p");
      titulo.style.color = "white";
      titulo.textContent = propiedad.titulo;

      const precio = document.createElement("p");
      precio.className = "precio";
      precio.textContent = propiedad.moneda + propiedad.precio;

      const ciudadProvincia = document.createElement("p");
      ciudadProvincia.textContent = `${propiedad.ciudad}. ${propiedad.provincia}`;

      const direccion = document.createElement("p");
      direccion.style.color = "white";
      direccion.textContent = propiedad.direccion;

      const verMas = document.createElement("a");
      verMas.href = "#";
      verMas.className = "ver-mas";
      verMas.textContent = "Ver más";

      verMas.addEventListener("click", (e) => {
        abrirModal(e, propiedad);
      });

      producto.appendChild(contenedorImagen);
      producto.appendChild(titulo);
      producto.appendChild(precio);
      producto.appendChild(ciudadProvincia);
      producto.appendChild(direccion);
      producto.appendChild(verMas);

      grupoContainer.appendChild(producto);

      contador++;

      if (contador % 3 === 0 || index === data.length - 1) {
        contenedor.appendChild(grupoContainer);
        grupoContainer = null;
      }
    });

    pintarFavoritos();
    actualizarContadorFavoritos();
  } catch (error) {
    console.error("Error al obtener las propiedades:", error);
    contenedor.innerHTML =
      "<p style='color: white'>Hubo un error al cargar las propiedades</p>";
  }
});


window.addEventListener("beforeunload", () => {
  localStorage.setItem("favoritos",JSON.stringify(favoritos));
  localStorage.setItem("botones", JSON.stringify(botones));
})


const agregarAFavoritos = (button, imagen, ambientes, precio, direccion1, direccion2) => {
  const nuevaPropiedad = {
    key: button.id,
    imagen: imagen,
    ambientes: ambientes,
    precio: precio,
    direccion1: direccion1,
    direccion2: direccion2
  };

  toggleHeart(button, nuevaPropiedad)
}

const toggleHeart = (button, prop) => {
  button.classList.toggle("activo");

  const nuevoBoton = {
    id: button.id
  }

  if(button.classList.contains("activo")){

    favoritos.push(prop);
    botones.push(nuevoBoton);
  }else{

    const indexProp = favoritos.findIndex(producto => producto.key === button.id);
    const indexBtn = botones.findIndex(boton => boton.id === button.id);

    if(indexProp !== -1){
      favoritos.splice(indexProp,1);
    }

    if(indexBtn !== -1){
      botones.splice(indexBtn,1)
    }
    
  }
  localStorage.setItem("favoritos",JSON.stringify(favoritos));
  localStorage.setItem("botones", JSON.stringify(botones));
  actualizarContadorFavoritos();
}

const pintarFavoritos = () => {
  if(botones === 0){
    console.log('no hay botones')
    return;
  }

  document.querySelectorAll(".btn-favorito").forEach((button,index) => {
    let key = button.id;
    if(botones.some(boton => boton.id === key)){
      button.classList.add("activo");
    }

  })
}
const actualizarContadorFavoritos = () => {
  const fav = document.querySelector("#favoritos a");
  if(botones.length === 0){
    fav.innerHTML = `Favoritos`
  }else{
    fav.innerHTML = `Favoritos(${botones.length})`
  }
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
