import { signUpSupabase, loginSupabase, logoutSupabase, updateData, fileRequest } from "./http.js";





export async function registerUser(email, password) {
  const status = { success: false };
  try {
    const dataRegister = await signUpSupabase(email, password);
    console.log(dataRegister);
    status.success = true;
    localStorage.setItem("idRegisteredPlayer", dataRegister.id);
    console.log("Guardado el idRegisteredPlayer");
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


    export async function updateProfile(profile) {
      const access_token = localStorage.getItem('access_token');
      const uid = localStorage.getItem('uid');
    
      const formImg = new FormData();
      formImg.append('avatar', profile.avatar, 'avatarProfile.png');
    
      console.log(formImg);
    
      const avatarResponse = await fileRequest(`/storage/v1/object/avatars/avatar${uid}.png`, formImg, access_token);
    
      // console.log(avatarResponse);
      profile.avatar_url = avatarResponse.urlAvatar;
      delete profile.avatar;
    
      const responseUpdate = await updateData(`profiles?id=eq.${uid}&select=*`, access_token, profile);
      // console.log(responseUpdate);
      // createData('profiles',access_token,profile);
    }

    
    
  