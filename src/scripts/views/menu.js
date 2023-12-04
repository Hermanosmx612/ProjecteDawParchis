export { menu };
import { knowLogin, knowDisabled, getImageProfile } from "../services/http.js";


function menu (){
    let templateMenu = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#/profile">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${knowLogin()}" href="#/allgames" aria-disabled="${knowDisabled()}">Search games</a>
          </li>
        <li class="nav-item">
          <a class="nav-link" href="#/logout">Logout</a>
        </li>
        </ul>
      </div>
    </div>
    <img src="" alt="">
  </nav>`

  let url; 
  getImageProfile(localStorage.getItem('uid')).then((resultado)=>{
      url = resultado;
      let img = headerMenu.querySelector("img");
      img.src = url;
  })


  let headerMenu =  document.createElement("div")


  headerMenu.innerHTML = templateMenu

  
  
  return headerMenu;


}

