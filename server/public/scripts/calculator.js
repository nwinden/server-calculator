$(function() {

//on document ready, the buttons are given data according to their function
$('.num1').data('data',1);
$('.num2').data('data',2);
$('.num3').data('data',3);
$('.num4').data('data',4);
$('.num5').data('data',5);
$('.num6').data('data',6);
$('.num7').data('data',7);
$('.num8').data('data',8);
$('.num9').data('data',9);
$('.num0').data('data',0);
$('.neg').data('data','neg');
$('.clearEntry').data('data', 'clearEntry');
$('.clear').data('data', 'clear');
$('.equals').data('data','equals')
$('.point').data('data','.');
$('.plus').data('data','add');
$('.minus').data('data','subtract');
$('.multiply').data('data','multiply');
$('.divide').data('data','divide');

//the event listener that checks which button is pressed
$('.button').on('click', checkButton);

});

//the value variable which is whats used to change whats on the dom
var value = '';

//the object that stores the calc operation information
var operationData = { num1: 0,
                      num2: 0,
                      urlID:'',
                      first:0,
                      equalPressed:false};

//this button  checks what was clicked and then routes it to the appropriate funciton
function checkButton() {

  var clicked = $(this).data('data');

  if(typeof clicked == 'number' || clicked == '.'){
    addToScreen(clicked);
  } else if (clicked == 'add' || clicked == 'subtract' || clicked == 'multiply' || clicked == 'divide') {
    operand(clicked);
  } else if (clicked == 'clearEntry') {
    clearEntry();
  } else if (clicked == 'clear') {
    clear();
  } else if (clicked == 'equals') {
    equals();
  } else if (clicked == 'neg') {
    turnNeg();
  }

}

// adds the numbers selected to the DOM
function addToScreen(number) {
  var display = $('.current');

  //if you have pressed equals and click another number it clears the field
  if (operationData.equalPressed == true) {
    clear();
  }

  value += number;

  //makes the number a decimal if the dot is the first thing selected
  if (value === '.') {
    value = '0.'
  }

  //makes sure you never get more than one decimal point
  if (countDots(value) == 2) {
    value = value.substring(0, value.length-1);
  }

  display.text(value);

}

//stores the number information and type of operand selected and does a AJAX request
function operand(type) {

  //if value is empty it automatically sets num1 to 0
  if (value == '') {
    operationData.num1 = 0;
  } else {
    operationData.num1 = value;
  }

  //if its the first time an operation is being ran, it sets the data a the start
  if(operationData.first < 1){
    operationData.urlID = type;
  }

  //displays the answer to the operation and changes relevant data to continue operations
  $.ajax({
    type:'POST',
    url:'/'+operationData.urlID,
    data:operationData,
    success: function(response) {
      $('.current').text('0');
      $('.last').text(response.answ);

      operationData.num2 = response.answ;
      operationData.first = operationData.first + 1;
      operationData.equalPressed = false;
      operationData.urlID = type;
      value='';

    }
  });
}

//finishes out the operation and displays the answer
function equals() {


  if (value == '') {
    operationData.num1 = 0;
  } else {
    operationData.num1 = value;
  }

  //displays the answer to the operation and changes relevant data to continue operations
  $.ajax({
    type:'POST',
    url:'/'+operationData.urlID,
    data:operationData,
    success: function(response) {
      $('.current').text(response.answ);
      $('.last').text('');
      operationData.num2 = response.answ;
      operationData.first = 0;
      operationData.equalPressed = true;
      value=response.answ;
    }
  });
}

//clears the data from everything and starts the operation at new
function clear() {
  $('.current').text('0');
  $('.last').text('');
  value = '';
  operationData = { num1: 0,
                    num2: 0,
                    urlID:'',
                    first:0,
                    equalPressed:false};
}

//clears the current entry
function clearEntry() {
 $('.current').text('0');
 value = '';
}

//toggles the current number from being negative
function turnNeg() {

  if (value[0] ==  '-') {
    value = value.substring(1,value.length);
  } else {
    value = '-' + value;
  }
  $('.current').text(value);

}

//counts the number of decimal points and returns that number
function countDots(val) {
  var counter = 0;
  for (var i = 0; i < val.length; i++) {
    if (val[i] == '.') {
      counter++;
    }
  }
  return counter;
}
