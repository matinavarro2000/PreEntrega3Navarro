document.addEventListener('DOMContentLoaded', () => {
    
    function valorPresente(precioCuotas) {
        return precioCuotas / (1 + 0.1) ** 12;
    }

    function Producto(nombre, precioEfectivo, precioCuotas) {
        this.nombre = nombre;
        this.precioEfectivo = precioEfectivo;
        this.precioCuotas = precioCuotas;
        this.cuotasValorPresente = valorPresente(precioCuotas);
        this.recomendacion = this.cuotasValorPresente < precioEfectivo ? "Conviene pagar en cuotas." : "Conviene pagar en efectivo.";
    }

    function agregarProducto() {
        let nombre = document.getElementById("nombreProducto").value;
        let precioEfectivo = parseInt(document.getElementById("precioEfectivo").value);
        let precioCuotas = parseInt(document.getElementById("precioCuotas").value);
    
        
        let producto = new Producto(nombre, precioEfectivo, precioCuotas);
    
       
        document.getElementById("nombreProducto").value = '';
        document.getElementById("precioEfectivo").value = '';
        document.getElementById("precioCuotas").value = '';
    
        
        let productosUsuario = JSON.parse(localStorage.getItem(localStorage.getItem('usuario') + "_productos")) || [];
        
        
        productosUsuario.push(producto);
        
        
        localStorage.setItem(localStorage.getItem('usuario') + "_productos", JSON.stringify(productosUsuario));
    
        
        mostrarProductos();
    }
    

    
    function mostrarProductos() {
        let listaProductos = document.getElementById("listaProductos");
        listaProductos.innerHTML = ''; 
    
        
        let productosUsuario = JSON.parse(localStorage.getItem(localStorage.getItem('usuario') + "_productos")) || [];
        productosUsuario.forEach(producto => {
            let productoElemento = document.createElement("div");
            productoElemento.innerText = `Producto: ${producto.nombre}, Precio en Efectivo: ${producto.precioEfectivo}, Precio en Cuotas: ${producto.precioCuotas}, Recomendación: ${producto.recomendacion}`;
            listaProductos.appendChild(productoElemento);
        });
    }
    

    
    document.getElementById("botonAgregarProducto").addEventListener("click", agregarProducto);

    
});

function iniciarSesion() {
    let nombreUsuario = document.getElementById("nombreUsuario").value;
    let contraseña = document.getElementById("contraseña").value;

    
    localStorage.setItem("usuario", nombreUsuario);

    document.getElementById("loginSection").style.display = 'none';
    document.getElementById("productSection").style.display = 'block';
}

document.getElementById("botonIniciarSesion").addEventListener("click", iniciarSesion);

if (localStorage.getItem("usuario")) {
    document.getElementById("loginSection").style.display = 'none';
    document.getElementById("productSection").style.display = 'block';
}

function revisarSesion() {
    if (localStorage.getItem("usuario")) {
        
        document.getElementById("loginSection").style.display = 'none';
        document.getElementById("productSection").style.display = 'block';
    } else {
        
        document.getElementById("loginSection").style.display = 'block';
        document.getElementById("productSection").style.display = 'none';
    }
}

function limpiarSesion() {
    localStorage.clear();
    revisarSesion();
    window.location.reload()
}



document.getElementById("botonLimpiarSesion").addEventListener("click", limpiarSesion);
