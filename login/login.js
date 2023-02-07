let email = document.querySelector("#email");
let pass = document.querySelector("#password");
let loginBtn = document.querySelector("#loginBtn");

async function getData(email, pass) {
  let respone = await fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: "cityslicka",
    }),
  });
  let data = await respone.json();
  console.log(data);

  if (data.token) {
    localStorage.setItem("token", JSON.stringify(data.token));
    window.location.replace('./shop/shop.html');
  } else {
    console.log(data.error);
  }
}
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let emailV = email.value;
  let passV = pass.value;
  getData(emailV, passV);
});
getData();

if(localStorage.getItem("token")){
  window.location.replace("./shop/shop.html")
}