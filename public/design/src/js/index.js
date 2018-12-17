import './../css/index.css';

import $ from "jquery";

console.log('index.js test');
let $uploadImageForm = $('#form-image-upload');

$uploadImageForm.on('submit', event => {
  event.preventDefault();
  const file = $('#image_file').get(0).files[0];
  const formData = new FormData();
  formData.append('file', file);
  
  // $.ajax({
  //   url: '/api/upload-image/',
  //   type: 'post',
  //   data: formData,
  //   contentType: false,
  //   processData: false
  // })
  // .always(data => {
  //   debugger;
  // });

  fetch('/api/image-upload/', {
    method: 'post',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    $('.page-home_content_img').attr('src', data.image);
  }); 
});