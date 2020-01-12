/*
|-------------------------------------------------
|
|-------------------------------------------------
*/
$(document).on('keypress', 'input[type=number][maxlength]', function (event) {
  var id = $.trim($(this).attr('id'));
  var val = $.trim($(this).val());
  var field_name = $.trim($(this).attr('data-field-name'));

  var key = event.keyCode || event.charCode;
  var charcodestring = String.fromCharCode(event.which);
  var txtVal = $(this).val();
  var maxlength = $(this).attr('maxlength');
  var regex = new RegExp('^[0-9]+$');
  // 8 = backspace 127 = Del 32 = Space
  if (key == 8 || key == 127 || key == 32) {
    return true;
  }
  // maxlength allready reached
  if (txtVal.length == maxlength) {
    event.preventDefault();
    return false;
  }
  // pressed key have to be a number
  if (!regex.test(charcodestring)) {
    $('#err_' + id).text(field_name + ' is numeric only!').show();
    event.preventDefault();
    return false;
  }
  $('#err_' + id).text('').hide();
  return true;
});

/*
|----------------------------------------------------
|Add to cart
|----------------------------------------------------
*/

$(document).on("click", "#add_to_cart", function(evt){
  evt.preventDefault();
  var product_id = $(this).attr('product');
  if(product_id != ''){
    var url_string = SITE_URL + 'home/ajax_add_to_cart';
    var data_string = {'encrypted_id': product_id};
    $(".paste-data").html('<img src="' + SITE_URL + 'assets/images/loader.gif"  class="img-fluid mx-auto"/>');
    $("#modal-form").modal('show');
    $.ajax({
      url: url_string,
      data: data_string,
      type: 'POST',
      dataType: 'HTML',
      error: function () {
          console.log('ERROR');
      },
      success: function (data) {
          if(data == 'l' || data == 'w'){
            window.location.href = SITE_URL + '/login';
          }else{
            $("#cart-item-count").html(data);
            $(".paste-data").html('<img src="' + SITE_URL + 'assets/images/success.gif" class="img-fluid mx-auto"/>');
            $(".paste-data").append('<p class="text-center text-success">Success! Item has added to cart</p>')
            $("#modal-form").modal('show');
            setTimeout(function() {$('#modal-form').modal('hide');}, 2800);
          }
      }
    })
  }
  // $(".modal-title").html('Login');
  // $(".paste-data").html(product_id);
  // $("#modal-form").modal('show');
});

/*
|--------------------------------------------
|Edit cart item
|--------------------------------------------
*/
$(document).on('change', '#item_count', function(evt){
  var no_of_items = $(this).val();
  var item_id = $(this).attr('item-id');
  if(item_id != ''){
    var url_string = SITE_URL + CONTROLLER + '/ajax_update_cart';
    var data_string = {'no_of_items': no_of_items, 'item_id': item_id};
    $.ajax({
      url: url_string,
      data: data_string,
      type: 'POST',
      dataType: 'HTML',
      error: function () {
          console.log('ERROR');
      },
      success: function (data) {
        window.location.href = SITE_URL + CONTROLLER;
      }
    })
  }
});

/*
|--------------------------------------------
|Item sort
|--------------------------------------------
*/
$(document).on("change", "#sort_item", function(evt){
  var sorting_type = $(this).val();
  window.location.href = SITE_URL + CONTROLLER + '/lists/' + sorting_type;
});

/*
|--------------------------------------------
|Products sort
|--------------------------------------------
*/
$(document).on("change", "#products_sort", function(evt){
  var sorting_type = $(this).val();
  var encrypted_id = $('#encrypted_id').val();
  window.location.href = SITE_URL + CONTROLLER + '/lists/' + encrypted_id + '/' + sorting_type;
});

/*
|----------------------------------------------
|Show Address form
|----------------------------------------------
*/
$(document).on("click", ".add_new_address", function(evt){
  var value = $(this).val();
  if(value == '0'){
    var url_string = SITE_URL + CONTROLLER + '/ajax_add_address_form';
    var data_string = {};
    $.ajax({
      url: url_string,
      data: data_string,
      type: 'POST',
      dataType: 'HTML',
      error: function () {
          console.log('ERROR');
      },
      success: function (data) {
        $('#new_address').html(data);
      }
    })
  }else{
    $('#new_address').html('');
  }
});

/*
|----------------------------------------------
|Change profile picture
|----------------------------------------------
*/

$(document).on("click", "#change_dp", function (evt) {
  evt.preventDefault();
    $("#uploads").trigger('click');
});


$(document).on("change", "#uploads", function(e){
  var file = $("#uploads").val();
  if(file !== ''){
    $("#update_dp").trigger('click');
  }
});