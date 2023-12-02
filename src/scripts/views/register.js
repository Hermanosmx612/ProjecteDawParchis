
import { putDefaultPhoto } from "../services/http.js";
import { registerUser } from "../services/users.js";
import { userInfo } from "../services/http.js";




export function registerForm() {
    const divLogin = document.createElement('div');
    divLogin.classList.add('formulari_centrat');
    divLogin.innerHTML = `   <div id="central">
    <div class="titulo">Registro</div>
    <div id="registro">
      <input type="email" id="signupname" placeholder="Full Name">
      <input type="email" id="signupusername" placeholder="Username">
      <input type="email" id="signupemail" placeholder="Email">
      <input type="password" id="signuppassword"placeholder="Password">
      <input type="password" placeholder="Repeat Password">
      <button id ="signupbtn" type="submit">Submit</button>
    </div>
    <div class="pie-form">
      <a href="#">Forgot Password?</a>
    </div>
    <div class="inferior">
      <a href="#">Already have an account? Log in</a>
    </div>
  </div>`;
  
    divLogin.querySelector('#signupbtn').addEventListener('click', async (event) => {
      event.preventDefault();
      const email = divLogin.querySelector('#signupemail').value;
      const password = divLogin.querySelector('#signuppassword').value;
      const fullName = divLogin.querySelector('#signupname').value;
      const username = divLogin.querySelector('#signupusername').value;
      const dataLogin = await registerUser(email, password);
      userInfo(fullName, username, localStorage.getItem("idRegisteredPlayer"));
      localStorage.removeItem("idRegisteredPlayer");
      //console.log(responseUserInfo)
      //await putDefaultPhoto();
      //console.log(dataLogin);
      window.location.hash = "#/login";

    });
  
    return divLogin;
  }