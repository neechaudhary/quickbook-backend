// const { default: axios } = require("axios");

var login_btn = document.getElementById("login_btn");
login_btn.addEventListener('submit', (e) => PostData(e));
async function PostData(event){
  var login_email = document.getElementById("login_email").value;
  var login_password = document.getElementById("login_password").value;
    console.log(login_email); 
    console.log(login_password);
    event.preventDefault();//prevent page from reloading

   
    axios.post('https://quick.dauqu.host/api/login/login', {
        login_email: login_email,
        login_password: login_password
    }).then(function(response){
        console.log(response);
        localStorage.setItem('token', response.data.token);
        window.location.href = "/dashboard";
    }).catch(function(error){
        console.log(error);
    });
}




// function post_notice(e){
//   console.log("hello")
//   e.preventDefault(); // Prevent page from reloading
//   let title=document.getElementById('notice_title').value; // Get title
//   let date=document.getElementById('notice_date').value; // Get date
//   let content=document.getElementById('notice_content').value; // Get content

//   fetch('http://localhost:3000/api/notice_board/notice_post',
//   {method: 'POST'}, 
//   {
//     notice_title: title, // Send title
//     notice_date: date, // Send date
//     notice_body: content // Send content
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }


//javascript fetch api
// fetch('http://localhost:3000/api/notice_board/notice_post', {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('Success:', data);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

