function encriptar() {
    let textoUsuario = document.getElementById('textoEncriptar').value;

  
    if (textoUsuario.trim() === "") {
        alert("Por favor, ingrese un texto para encriptar.");
        return; 
    }

    
    if (!validarTexto(textoUsuario)) {
        alert("El texto contiene caracteres no permitidos. Solo se permiten letras minúsculas sin tildes y sin números.");
        return; 
    }

    let textoEncriptado = separadorTexto(textoUsuario);
    
    
    document.getElementById('imagen').style.display = 'none';
    document.getElementById('mensajeEncriptado').style.display = 'none';
    
    
    let resultado = document.getElementById('textoResultado');
    resultado.value = textoEncriptado;
    resultado.style.display = 'block';
    
   
    let botonCopiar = document.getElementById('botonCopiar');
    botonCopiar.style.display = 'inline-block';
    botonCopiar.onclick = function() {
        copiarTexto();
        alert("Texto copiado: " + resultado.value);
    };
}

function desencriptar() {
    let textoUsuario = document.getElementById('textoEncriptar').value;

    
    if (textoUsuario.trim() === "") {
        alert("Por favor, ingrese un texto para desencriptar.");
        return; 
    }

    
    if (!validarTexto(textoUsuario)) {
        alert("El texto contiene caracteres no permitidos. Solo se permiten letras minúsculas sin tildes y sin números.");
        return; 
    }

    let textoDesencriptado = separadorTextoDesencriptar(textoUsuario);
    
    
    document.getElementById('imagen').style.display = 'none';
    document.getElementById('mensajeEncriptado').style.display = 'none';
    
    
    let resultado = document.getElementById('textoResultado');
    resultado.value = textoDesencriptado;
    resultado.style.display = 'block';
}

function validarTexto(texto) {
    
    let regex = /^[a-z\s]*$/;
    return regex.test(texto);
}

function separadorTexto(texto) {
    let caracteres = texto.split('');
    let textoEncriptado = caracteres.map((caracter) => {
        return validarLetra(caracter);
    }).join('');

    return textoEncriptado;
}

function validarLetra(letra) {
    let conversiones = [
        { letra: "e", conversion: "enter" },
        { letra: "i", conversion: "imes" },
        { letra: "a", conversion: "ai" },
        { letra: "o", conversion: "ober" },
        { letra: "u", conversion: "ufat" }
    ];
    let resultado = conversiones.find(item => item.letra === letra);
    if (resultado == null) {
        return letra;
    } else {
        return resultado.conversion;
    }
}

function separadorTextoDesencriptar(texto) {
    let conversionesInversas = [
        { conversion: "enter", letra: "e" },
        { conversion: "imes", letra: "i" },
        { conversion: "ai", letra: "a" },
        { conversion: "ober", letra: "o" },
        { conversion: "ufat", letra: "u" }
    ];

    conversionesInversas.forEach(item => {
        let regex = new RegExp(item.conversion, 'g');
        texto = texto.replace(regex, item.letra);
    });

    return texto;
}

function copiarTexto() {
    let textoResultado = document.getElementById('textoResultado');
    textoResultado.select();
    textoResultado.setSelectionRange(0, 99999); 
    document.execCommand("copy");
}