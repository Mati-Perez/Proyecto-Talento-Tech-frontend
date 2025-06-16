
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
let botones = JSON.parse(localStorage.getItem("botones")) || [];


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
    //localStorage.setItem(button.id, "activo");
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
}

document.addEventListener("DOMContentLoaded", () => {

  const btn = document.querySelector(".hamburguesa");
  const menu = document.querySelector(".menu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("activo");
  });



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
})

window.addEventListener("beforeunload", () => {
  console.log("Antes de guardar:");
    console.log("Favoritos:", favoritos);
    console.log("Botones:", botones);

  localStorage.setItem("favoritos",JSON.stringify(favoritos));
  localStorage.setItem("botones", JSON.stringify(botones));
})

