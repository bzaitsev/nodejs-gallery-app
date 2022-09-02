import $ from "jquery";
import config from './config';
import './../css/index.css';

$('#image-file').on('change', event => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  event.preventDefault();

  fetch(`${config.host}${config.api.upload}`, {
    method: 'post',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    $(`<li class="Images__item"><img src="${config.host + data.image}"></li>`)
      .insertAfter($('#add-item'));
  }); 
});