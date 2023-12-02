import { signUpSupabase, loginSupabase, logoutSupabase } from "./http.js";





export function registerUser(email, password) {
    const status = { success: false };
    try {
      signUpSupabase(email, password).then((dataRegister) => {
        console.log(dataRegister);
        status.success = true;
      });
    } catch (err) {
      console.log(err);
      status.success = false;
      status.errorText = err.error_description;
    }
    return status;
  }

  function expirationDate(expires_in) {
    return Math.floor(Date.now() / 1000) + expires_in;
  }


  export async function loginUser(email, password) {
    const status = { success: false };
    try {
      const dataLogin = await loginSupabase(email, password);
      console.log(dataLogin);
      localStorage.setItem('email', dataLogin.user.email)
      localStorage.setItem('access_token', dataLogin.access_token);
      localStorage.setItem('uid', dataLogin.user.id);
      localStorage.setItem('expirationDate', expirationDate(dataLogin.expires_in));
      status.success = true;
      console.log("Login correcto")
    } catch (err) {
      console.log(err);
      status.success = false;
      status.errorText = err.error_description;
    }
  
    return status;
  }


  
    export function logout() {
      logoutSupabase(localStorage.getItem('access_token')).then((lOData) => {
        console.log(lOData);
      });
      localStorage.removeItem('access_token');
      localStorage.removeItem('uid');
    }
  