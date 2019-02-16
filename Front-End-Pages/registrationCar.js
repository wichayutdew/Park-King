function readURL(input) {
       if (input.files && input.files[0]) {
           var reader = new FileReader();

           reader.onload = function (e) {
               $('#blah')
                   .attr('src', e.target.result);
           };

           reader.readAsDataURL(input.files[0]);
       }
   }

document.getElementById("regisCarProfileBtn").addEventListener("click", function() {
  window.location = 'userInfo.html';
});

document.getElementById("regisCarReserveBtn").addEventListener("click", function() {
  window.location = 'reserve.html';
});

document.getElementById("regisCarQRBtn").addEventListener("click", function() {
  window.location = 'showQR.html';
});

document.getElementById("regisCarStatusBtn").addEventListener("click", function() {
  window.location = 'status.html';
});

document.getElementById("regisCarHomeBtn").addEventListener("click", function() {
  window.location = 'home.html';
});
