export { menu };
import { knowLogin, knowDisabled } from "../services/http.js";


function menu (){
    let templateMenu = `<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${knowLogin()}" href="#/allgames" aria-disabled="${knowDisabled()}">Your Games</a>
          </li>
          <li class="nav-item">
          <a class="nav-link" href="#/login">Login</a>
        </li>
        <li class="nav-item">
        <a class="nav-link" href="#/register">Register</a>
      </li>
      <li class="nav-item">
          <a class="nav-link" href="#/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#/logout">Logout</a>
        </li>
          <li class="nav-item">
            <a class="nav-link disabled">Disabled</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>`

  let headerMenu = document.querySelector("#menuSuperior");
  headerMenu.innerHTML = templateMenu
  return headerMenu;


}

