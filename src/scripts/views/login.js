import { loginUser } from "../services/users.js";
import { recoverPasswordSupabase } from "../services/http.js";

export function loginForm() {
    const divLogin = document.createElement('div');
    divLogin.classList.add('formulari_centrat');
  
    divLogin.innerHTML = `  <div id="central">
    <div id="login">
        <div class="titulo">
            Bienvenido
        </div>
        <form id="loginform">
            <input type="text" name="usuario" placeholder="Usuario" id="loginemail" required>
            
            <input type="password" placeholder="Contraseña" name="password" id="loginpassword" required>
            
            <button type="submit" id="loginbutton" title="Ingresar" name="Ingresar">Login</button>
            <div id="errors"></div>
        </form>
        <div class="pie-form">
            <a id="forgotPassword" href="#">¿Perdiste tu contraseña?</a>
            <a id="signUp"href="#">¿No tienes Cuenta? Registrate</a>
        </div>
    </div>
</div>`;
  
    divLogin.querySelector('#loginbutton').addEventListener('click', async (event) => {
      event.preventDefault();
      const email = divLogin.querySelector('#loginemail').value;
      const password = divLogin.querySelector('#loginpassword').value;
      loginUser(email, password).then((status) => {
        if (status.success){
            window.location.hash = '#/game';
        } 
        else {
          divLogin.querySelector('#errors').innerHTML = status.errorText;
        }
      });
    });

    divLogin.querySelector('#signUp').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.hash = "#/register"
      });


  
    divLogin.querySelector('#forgotPassword').addEventListener('click', (event) => {
      event.preventDefault();
      const email = divLogin.querySelector('#loginemail').value;
      recoverPasswordSupabase(email);
      event.target.parentElement.append('You have an Email');
    });
  
    return divLogin;
  }