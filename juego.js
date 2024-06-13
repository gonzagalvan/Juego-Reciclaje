const niveles = [
    [
        { nombre: 'Botella de plástico', reciclable: true, puntos: 1, imagen: 'images/botella.png' },
        { nombre: 'Papel de diario', reciclable: true, puntos: 1, imagen: 'images/diario-1.png' },
        { nombre: 'Cartón limpio', reciclable: true, puntos: 1, imagen: 'images/caja-carton.png' },
        { nombre: 'Cáscara de banana', reciclable: false, puntos: 1, imagen: 'images/cascara-banana.png' },
        { nombre: 'Lata de Coca-Cola', reciclable: true, puntos: 1, imagen: 'images/lata-coca.png' }
    ],
    [
        { nombre: 'Caja leche', reciclable: true, puntos: 2, imagen: 'images/carton-leche.png' },
        { nombre: 'Botella vidrio', reciclable: true, puntos: 2, imagen: 'images/botella-vidrio.png' },
        { nombre: 'Paquete de papas fritas', reciclable: false, puntos: 2, imagen: 'images/bolsa-papas.png' }
    ],
    [
        { nombre: 'Pilas', reciclable: true, puntos: 3, imagen: 'images/bateria.png' },
        { nombre: 'Teclado y mouse', reciclable: true, puntos: 3, imagen: 'images/teclado-mouse.png' },
        { nombre: 'CD', reciclable: true, puntos: 3, imagen: 'images/CD.png' }
    ]
];

let nivelActual = 0;
let elementosNivelActual;
let puntaje = 0;
let racha = 0;

function iniciarJuego() {
    document.getElementById('pantallaInicio').style.display = 'none';
    document.getElementById('pantallaJuego').style.display = 'block';
    elementosNivelActual = niveles[nivelActual].slice();
    mostrarElemento();
}

function mostrarElemento() {
    if (elementosNivelActual.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * elementosNivelActual.length);
        const elemento = elementosNivelActual.splice(indiceAleatorio, 1)[0];

        document.getElementById('elemento').innerText = elemento.nombre;
        document.getElementById('imagenElemento').src = elemento.imagen;

    } else if (nivelActual < niveles.length - 1) {
        nivelActual++;
        elementosNivelActual = niveles[nivelActual].slice();
        document.getElementById('elemento').innerText = `¡Nivel ${nivelActual + 1}!`;
        document.getElementById('imagenElemento').src = '';
        setTimeout(() => {
            mostrarElemento();
        }, 1000);
    } else {
        document.getElementById('elemento').innerText = '¡Juego terminado!';
        document.getElementById('imagenElemento').src = '';
        document.getElementById('resultado').innerText = `Puntuación: ${puntaje}`;
        document.querySelectorAll('button').forEach(button => button.disabled = true);
    }
}

function verificarReciclable(respuesta) {
    if (elementosNivelActual.length >= 0) {
        const elementos = niveles[nivelActual];
        const elemento = elementos[elementos.length - elementosNivelActual.length - 1];
        if (respuesta === elemento.reciclable) {
            puntaje += elemento.puntos;
            racha++;
            if (racha % 3 === 0) {
                puntaje += 2; 
            }
            document.getElementById('resultado').innerText = '¡Correcto!';
        } else {
            document.getElementById('resultado').innerText = 'Incorrecto.';
            racha = 0; 
        }
        setTimeout(() => {
            document.getElementById('resultado').innerText = '';
            mostrarElemento();
        }, 1000);
    }
}