function irAPagina(url) {
    document.querySelector('.inicio').style.display = 'none';
    document.querySelector('.pagina-interna').style.display = 'flex';
    document.querySelector('.pagina-interna').style.backgroundImage = `url('${url}')`;
}

function volverInicio() {
    document.querySelector('.pagina-interna').style.display = 'none';
    document.querySelector('.inicio').style.display = 'flex';
}

