  //FUNÇÃO CRIADA PARA BUSCAR O COOKIE
  export default function buscarCookie(nome){
    let cookies = document.cookie;
    const posicao = cookies.indexOf(nome)

    cookies = cookies.substring(posicao);
    const fimDoCookie = cookies.indexOf(';')

    if (fimDoCookie === -1) {
    } else{
      cookies = cookies.substring(0, fimDoCookie)
    }

    return cookies.slice(cookies.indexOf('=')+1)
  }

/////////////////////////////////////////////////////////
