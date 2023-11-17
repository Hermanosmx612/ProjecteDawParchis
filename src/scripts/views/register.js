
import { registerUser } from "../services/users.js";




export function registerForm() {
    const divLogin = document.createElement('div');
    divLogin.classList.add('formulari_centrat');
    divLogin.innerHTML = `   <div id="central">
    <div class="titulo">Registro</div>
    <div id="registro">
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
      const dataLogin = await registerUser(email, password);
      console.log(dataLogin);
    });
  
    return divLogin;
  }