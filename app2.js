//SOLICITANDO DATOS A DATA.JSON probando como funciona
const contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("carrito-contenedor");

//BOTON ELIMINAR
//const botonEliminar = document.getElementById("boton-eliminar");

const botonVaciar = document.getElementById("vaciar-carrito");
const botonComprar = document.getElementById("comprar-carrito");

const contadorCarrito = document.getElementById("contadorCarrito");

const cantidad = document.getElementById("cantidad");

const precioTotal = document.getElementById("precioTotal");

const cantidadTotal = document.getElementById("cantidadTotal");

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

//FETCH PARA TRAERME LOS DATOS DE MI JSON. DATA
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    //PINTAR LOS PRODUCTOS EN EL HTML
    data.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
      <img src=${producto.img} alt= "">
      <h3>${producto.nombre}</h3>
      <p>${producto.desc}</p>
      <p>Modalidad: ${producto.modalidad}</p>
      <p class="precioProducto">Precio:$ ${producto.precio}</p>
      <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
      `;
      contenedorProductos.appendChild(div);

      const boton = document.getElementById(`agregar${producto.id}`);

      //FUNCION ELIMINAR ITEM
      const eliminarDelCarrito = (prodId) => {
        console.log(eliminarDelCarrito);
        const item = carrito.find((prod) => prod.id === prodId);

        const indice = carrito.indexOf(item); //Busca el elemento q yo le pase y nos devuelve su indice.

        carrito.splice(indice, 1);
        actualizarCarrito();
        console.log(carrito);

        Swal.fire({
          icon: "error",
          title: "Eliminado",
          text: "El producto fue eliminado de su carrito correctamente!",
        });
      };

      //FUNCION-BOTON AGREGAR AL CARRITO
      boton.addEventListener("click", () => {
        Swal.fire(
          "Agregaste curso al Carrito!",
          "Tu camino al exito esta mas cerca!",
          "success"
        );

        agregarAlCarrito(producto.id, data);
      });

      //FUNCION DE AGREGAR AL CARRITO

      const agregarAlCarrito = (prodId, data) => {
        const existe = carrito.some((prod) => prod.id === prodId);

        if (existe) {
          const prod = carrito.map((prod) => {
            if (prod.id === prodId) {
              prod.cantidad++;
            }
          });
        } else {
          const item = data.find((prod) => prod.id === prodId);

          carrito.push(item);
        }

        actualizarCarrito();
      };

      //FUNCION DE ACTUALIZAR CARRITO
      const actualizarCarrito = (data) => {
        contenedorCarrito.innerHTML = "";

        carrito.forEach((prod) => {
          const div = document.createElement("div");
          div.className = "productoEnCarrito";
          div.innerHTML = `
      <p>${prod.nombre}</p>
      <p>Precio:$${prod.precio}</p>
      <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
      <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
      `;

          contenedorCarrito.appendChild(div);

          localStorage.setItem("carrito", JSON.stringify(carrito));
        });

        contadorCarrito.innerText = carrito.length;
        console.log(carrito);
        precioTotal.innerText = carrito.reduce(
          (acc, prod) => acc + prod.cantidad * prod.precio,
          0
        );
      };

      //BOTON VACIAR CARRITO

      botonVaciar.addEventListener("click", () => {
        carrito.length = 0;
        
        Swal.fire({
          title: "Estas seguro que quieres vaciar el carrito?",
          text: "No podras revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, vaciar carrito!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Confirmado!",
              "Tu carrito se vacio con exito.",
              "success"
            );
          }
        });
        actualizarCarrito();
        
      });

      //BOTON COMPRAR
      botonComprar.addEventListener("click", () => {
        carrito.length = 0;

        Swal.fire(
          "Compra Exitosa!",
          "Gracias por confiar en nosotros, las intrucciones te llegaran al mail!",
          "success"
        );

        actualizarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
      });
    });
  });


