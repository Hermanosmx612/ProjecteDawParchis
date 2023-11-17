import { manejarClickBoton } from "../handleEvents.js";
import { GameStatus } from "../model/gameStatus.js";
import { GameView } from "../model/GameView.js";
import { createTable } from "../initiation.js";
import { putTokens } from "../initiation.js";
import { createGameState } from "../services/http.js";

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrbXFraGNwbHJ5Z2huaHN0anBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjYzMDgsImV4cCI6MjAxNDg0MjMwOH0.hEB-v6NUkWsWW0V26PFR31H0tuI4EiiMucYOc-1cj0U'

export function tablero(){
    const divLogin = document.createElement('div');




    divLogin.innerHTML = `<table border="1px">
  
  <tr>
    <td class="amarillo amarilloCasa" colspan="7" rowspan="7" id="home">
      <img id="" alt="" srcset="">
      <img id="" alt="" srcset="">
      <br>
      <img src="" alt="" srcset="">
      <img src="" alt="" srcset=""></td>
    <td colspan="2" id="1">1</td>
    <td colspan="2" id="68">68</td>
    <td colspan="2" id="67">67</td>
    <td class="verde verdeCasa" colspan="7" rowspan="7" id="home">
      <img src="" alt="" srcset="">
      <img src="" alt="" srcset="">
      <br>
      <img src="" alt="" srcset="">
      <img src="" alt="" srcset="">
    </td>
  </tr>
  <tr>
    <td colspan="2" id="2">2</td>
    <td class="amarillo" colspan="2"></td>
    <td colspan="2" id="66">66</td>
  </tr>
  <tr>
    <td colspan="2" id="3">3</td>
    <td class="amarillo" colspan="2">-</td>
    <td colspan="2" id="65">65</td>
  </tr>
  <tr>
    <td colspan="2" id="4">4</td>
    <td class="amarillo" colspan="2">-</td>
    <td colspan="2" id="64">64</td>
  </tr>
  <tr>
    <td class="amarillo" colspan="2" id="5">5</td>
    <td class="amarillo" colspan="2">-</td>
    <td colspan="2" id="63">63</td>
  </tr>
  <tr>
    <td colspan="2" id="6">6</td>
    <td class="amarillo" colspan="2">-</td>
    <td colspan="2" id="62">62</td>
  </tr>
  <tr>
    <td colspan="2" id="7">7</td>
    <td class="amarillo" colspan="2">-</td>
    <td colspan="2" id="61">61</td>
  </tr>
  <tr>
    <td rowspan="2" id="16">16</td>
    <td rowspan="2" id="15">15</td>
    <td rowspan="2" id="14">14</td>
    <td rowspan="2" id="13">13</td>
    <td rowspan="2" id="12">12</td>
    <td rowspan="2" id="11">11</td>
    <td rowspan="2" id="10">10</td>
    <td id="vacio"></td>
    <td id="8">8</td>
    <td>-</td>
    <td>-</td>
    <td id="60">60</td>
    <td id="vacio"></td>
    <td rowspan="2" id="58">58</td>
    <td rowspan="2" id="57">57</td>
    <td class="verde" rowspan="2" id="56">56</td>
    <td rowspan="2" id="55">55</td>
    <td rowspan="2" id="54">54</td>
    <td rowspan="2" id="53">53</td>
    <td rowspan="2" id="52">52</td>
  </tr>
  <tr>
    <td id="9">9</td>
    <td colspan="4" rowspan="4"><button id="buttonThrow">Tirar el dado</button>
    <img id="cubeImage" alt="">
    </td>
    <td id="59">59</td>
  </tr>
  <tr>
    <td rowspan="2" id="17">17</td>
    <td class="azul" rowspan="2">|</td>
    <td class="azul" rowspan="2">|</td>
    <td class="azul" rowspan="2">|</td>
    <td class="azul" rowspan="2">|</td>
    <td class="azul" rowspan="2">|</td>
    <td class="azul" rowspan="2">|</td>
    <td>|</td>
    <td>|</td>
    <td class="verde" rowspan="2">|</td>
    <td class="verde" rowspan="2">|</td>
    <td class="verde" rowspan="2">|</td>
    <td class="verde" rowspan="2">|</td>
    <td class="verde" rowspan="2">|</td>
    <td class="verde" rowspan="2">|</td>
    <td rowspan="2" id="51">51</td>
  </tr>
  <tr>
    <td>|</td>
    <td>|</td>
  </tr>
  <tr>
    <td rowspan="2" id="18">18</td>
    <td rowspan="2" id="19">19</td>
    <td rowspan="2" id="20">20</td>
    <td rowspan="2" id="21">21</td>
    <td class="azul" rowspan="2" id="22">22</td>
    <td rowspan="2" id="23">23</td>
    <td rowspan="2" id="24">24</td>
    <td id="25">25</td>
    <td id="43">43</td>
    <td rowspan="2" id="44">44</td>
    <td rowspan="2" id="45">45</td>
    <td rowspan="2" id="46">46</td>
    <td rowspan="2" id="47">47</td>
    <td rowspan="2" id="48">48</td>
    <td rowspan="2" id="49">49</td>
    <td rowspan="2" id="50">50</td>
  </tr>
  <tr>
    <td id="vacio"></td>
    <td id="26">26</td>
    <td>-</td>
    <td>-</td>
    <td id="42">42</td>
    <td id="vacio"></td>
  </tr>
  <tr>
    <td class="azulCasa azul" colspan="7" rowspan="7" id="home">
      <img id="" alt="" srcset="">
      <img id="" alt="" srcset="">
      <br>
      <img id="" alt="" srcset="">
      <img id="" alt="" srcset="">
    </td>
    <td colspan="2" id="27">27</td>
    <td class="rojo" colspan="2">-</td>
    <td colspan="2" id="41">41</td>
    <td class="rojo rojoCasa" colspan="7" rowspan="7" id="home">
      <img id="" alt="" srcset="">
      <img id="" alt="" srcset="">
      <br>
      <img id="" alt="" srcset="">
      <img id="" alt="" srcset="">
    </td>
  </tr>
  <tr>
    <td colspan="2" id="28">28</td>
    <td class="rojo" colspan="2">-</td>
    <td colspan="2" id="40">40</td>
  </tr>
  <tr>
    <td colspan="2" id="29">29</td>
    <td class="rojo" colspan="2">-</td>
    <td class="rojo" id="39" colspan="2">39   </td>
  </tr>
  <tr>
    <td colspan="2" id="30">30</td>
    <td class="rojo" colspan="2">-</td>
    <td colspan="2" id="38">38</td>
  </tr>
  <tr>
    <td colspan="2" id="31">31</td>
    <td class="rojo" colspan="2">-</td>
    <td colspan="2" id="37">37</td>
  </tr>
  <tr>
    <td colspan="2" id="32">32</td>
    <td class="rojo" colspan="2">-</td>
    <td colspan="2" id="36">36</td>
  </tr>
  <tr>
    <td colspan="2" id="33">33</td>
    <td colspan="2" id="34">34</td>
    <td colspan="2" id="35">35</td>
  </tr>

</table>
<button id="prueba">Recorrer array</button>`



let game = new GameStatus();
game.tablero = createTable();
let gameView = new GameView(game);
createGameState(SUPABASE_KEY, game)

divLogin.querySelector("#buttonThrow").addEventListener("click", () => {
      manejarClickBoton(game,gameView);
}); 


return divLogin;





}






