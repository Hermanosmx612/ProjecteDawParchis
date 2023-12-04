import { updateProfile } from "../services/users.js";

export function profileForm(){
    const divLogin = document.createElement('div');
    divLogin.classList.add('formulari_centrat');
    divLogin.innerHTML = `<form action="action_page.php" id="formProfile" style="border: 1px solid #ccc">
<div class="container">
  <h1>Profile</h1>
  
  <hr />

  <label for="email"><b>Email</b></label>
  <input
    id="signupemail"
    type="text"
    placeholder="Enter Email"
    name="email"
    required
    readonly
    value="${localStorage.getItem('email')}"
  />

  <label for="psw"><b>Password</b></label>
  <input
    type="password"
    id="signuppassword"
    placeholder="Enter Password"
    name="psw"
    required
  />

  <label for="psw-repeat"><b>Repeat Password</b></label>
  <input
    type="password"
    placeholder="Repeat Password"
    name="psw-repeat"
    required
  />
  <button type="button" class="signupbtn login" id="chgpass">Change Password</button>
  <br>
  <label for="username"><b>Username</b></label>
  <input
    type="text"
    placeholder="user name"
    name="username"
    id = "username"
    value = ""
  />

  <label for="fullname"><b>Full Name</b></label>
  <input
    type="text"
    placeholder="fullname"
    name="full_name"
    value = ""
  />

<div>
  <img class="avatar_profile" style="max-width: 200px" id="avatar_prev" src=""/>
</div>
  <label for="avatar"><b>Avatar</b></label>
  <input
    type="file"
    id="avatar"
    name="avatar"
  />





  <div class="clearfix">

    <button type="button" class="signupbtn login" id="update">Update Profile</button>
  </div>
</div>
</form>`;

divLogin.querySelector('#update').addEventListener('click', async () => {
  const formData = new FormData(divLogin.querySelector('#formProfile'));
  const {
    username, full_name, website, avatar,
  } = Object.fromEntries(formData);
  console.log({
    username, full_name, avatar,
  });

  const dataUpdate = await updateProfile({username, full_name, avatar,});

  window.location.hash = "#/game"
});

function encodeImageFileAsURL(element) {
  const file = element.files[0];
  if (file) {
    divLogin.querySelector('#avatar_prev').src = URL.createObjectURL(file);
  }
}

divLogin.querySelector('#avatar').addEventListener('change', function () { encodeImageFileAsURL(this); });


return divLogin;
}









