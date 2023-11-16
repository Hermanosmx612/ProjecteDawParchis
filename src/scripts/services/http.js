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
    const response = await supaRequest(url, 'post', headersAux, data);
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
    const response = await supaRequest(url, 'PATCH', headersAux, data);
    
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

export async function supaRequest(url,method,headers, state){
    const response = await fetch(url,{
        method,
        headers,
        body: JSON.stringify({partida : state })
        
    })

    if (response.status >= 200 && response.status <= 300) { // En cas d'error en el servidor
        if (response.headers.get('content-type')) { // Si retorna un JSON
            const returnResponse = await response.json();
            return returnResponse;
        }
        return {}; // Si no contesta res no té content-type i cal retornar un objecte buit per a ser coherent en l'eixida.
      }
    
      return Promise.reject(await response.json()); // En cas de problemes en el servidor retornen un reject.
}

export function saveIdLocalStorage(id){
    localStorage.setItem('idPartidaActual', id);
}


export function getIdGame(){
    return localStorage.getItem('idPartidaActual');
}


