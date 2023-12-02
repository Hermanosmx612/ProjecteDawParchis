const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrbXFraGNwbHJ5Z2huaHN0anBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjYzMDgsImV4cCI6MjAxNDg0MjMwOH0.hEB-v6NUkWsWW0V26PFR31H0tuI4EiiMucYOc-1cj0U'
const headers = {
    apiKey: SUPABASE_KEY,
    'Content-Type': 'application/json',
  };


export async function createGameState(token, data) {
    const url = 'https://pkmqkhcplryghnhstjpn.supabase.co/rest/v1/GameState';
    const headersAux = {
      ...headers,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer : "return=representation",

    };
    const response = await supaRequest(url, 'post', headersAux, {partida : data });
    const resolvedId = response[0]?.id;
    console.log(resolvedId);
    saveIdLocalStorage(resolvedId);
    return response;
  }

  export async function updateGameState(data, id) {
    const url = `https://pkmqkhcplryghnhstjpn.supabase.co/rest/v1/GameState?id=eq.${id}`;
    const headersAux = {
      ...headers,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'return=minimal',
    };
    const response = await supaRequest(url, 'PATCH', headersAux, {partida : data });
    
    return response;
  }


  export async function readGameState(id) {
    try {
        const response = await fetch(`https://pkmqkhcplryghnhstjpn.supabase.co/rest/v1/GameState?id=eq.${id}&select=partida`, {
            headers: {
                apiKey: SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`,
                "Range": "0-9",
            }
        });

        // Verificar si la respuesta es exitosa (código 2xx)
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
        }

        // Parsear la respuesta como JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        return null;
    }
}

export async function supaRequest(url,method,headers, body){
    const response = await fetch(url,{
        method,
        headers,
        body: JSON.stringify(body)
        
    })
    console.log(response);
    if (response.status >= 200 && response.status <= 300) { // En cas d'error en el servidor
        if (response.headers.get('content-type')) { // Si retorna un JSON
            const returnResponse = await response.json();
            console.log("Exito")
            return returnResponse;
        }
        console.log("Error");
        return {}; // Si no contesta res no té content-type i cal retornar un objecte buit per a ser coherent en l'eixida.
      }
      console.log("Error")
      return Promise.reject(await response.json()); // En cas de problemes en el servidor retornen un reject.
}

export function saveIdLocalStorage(id){
    localStorage.setItem('idPartidaActual', id);
}


export function getIdGame(){
    return localStorage.getItem('idPartidaActual');
}
  
export async function signUpSupabase(email, password) {
    const url = `https://pkmqkhcplryghnhstjpn.supabase.co/auth/v1/signup`;
    const data = await supaRequest(url, 'post', headers, { email, password });
    await putDefaultPhoto();
    return data;
  }


export async function loginSupabase(email, password) {
    const url = `https://pkmqkhcplryghnhstjpn.supabase.co/auth/v1/token?grant_type=password`;
    const data = await supaRequest(url, 'post', headers, { email, password });
    return data;
}


export function knowLogin(){
  console.log(localStorage.getItem('idPartidaActual'))
  if(localStorage.getItem('idPartidaActual') === null){
    return "disabled";
  }
  return "";
}

export function knowDisabled(){
  if(localStorage.getItem('idPartidaActual') === null){
    return "false";
  }
  return "true";
}

export async function logoutSupabase(token){
  const url = `https://pkmqkhcplryghnhstjpn.supabase.co/auth/v1/logout`;
  const headersAux = { ...headers, Authorization: `Bearer ${token}` };
  const data = await supaRequest(url, 'post', headersAux, {});
  return data;
}

export async function putDefaultPhoto(){
  /* try {
    const defaultPhotoUrl = `https://pkmqkhcplryghnhstjpn.supabase.co/storage/v1/avatars/usuarioSinFoto.jpg`;

    const { data, error } = await supabase
      .from('profiles')
      .update({ avatar_url : defaultPhotoUrl })
      .eq('id', localStorage.getItem("uid"));

    if (error) {
      throw new Error(`Error al asignar la imagen por defecto al usuario: ${error.message}`);
    }

    console.log('Imagen por defecto asignada al usuario con éxito:', data);
  } catch (error) {
    console.error(error.message);
  } */
}

export async function userInfo(fullName, username, uid){
  console.log("Funcion UserInfo: "+uid)
  console.log(fullName)
  console.log(username)
  const url = `https://pkmqkhcplryghnhstjpn.supabase.co/rest/v1/profiles?id=eq.${uid}`;
    const headersAux = {
      ...headers,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: 'return=representation',
    };
    const response = await supaRequest(url, 'PATCH', headersAux, {"username" : `${username}`,  "full_name" : `${fullName}`});
    return response;
}


export async function fileRequest(url,body,token){
  const headersFile = {
      "apiKey": SUPABASE_KEY,
      "Authorization" :`Bearer ${token}`,
      "x-upsert": true  // Necessari per a sobreescriure
  }; 
  let response = await fetch(`https://pkmqkhcplryghnhstjpn.supabase.co${url}`,{
      method: 'POST',
      headers: headersFile,
      body
  });
  if(response.status >=200 && response.status <=300){
      if(response.headers.get("content-type")){
          let datos = await response.json(); // Retorna un json amb la ruta relativa. 
          datos.urlAvatar = `https://pkmqkhcplryghnhstjpn.supabase.co/{url}`; // El que 
          return datos;
      }
      return {};
  }
  else{
      return Promise.reject(await response.json());
  }
}

export async function updateData(URI,token,data){
  let url = `https://pkmqkhcplryghnhstjpn.supabase.co/rest/v1/${URI}`;
  let headersAux = {...headers, 
      "Authorization" :"Bearer "+token,
      "Prefer" : "return=representation"
  };
  let response = await supaRequest(url,'PATCH',headersAux,data);
  return response;
}