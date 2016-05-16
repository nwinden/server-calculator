$(function() {

console.log('Hey Buckaroo!');

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

$('.button').on('click', checkButton);

});

var value = '';
var operationData = { num1: 0,
                      num2: 0,
                      urlID:'',
                      first:0,
                      equalPressed:false};

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

function addToScreen(number) {
  var display = $('.current');

  if (operationData.equalPressed == 1) {
    clear();
  }

  value += number;

  if (value === '.') {
    value = '0.'
  }

  if (countDots(value) == 2) {
    value = value.substring(0, value.length-1);
  }

  display.text(value);

}

function operand(type) {

  if (value == '') {
    operationData.num1 = 0;
  } else {
    operationData.num1 = value;
  }

  if(operationData.first < 1){
    operationData.urlID = type;
  }

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

function equals() {


  if (value == '') {
    operationData.num1 = 0;
  } else {
    operationData.num1 = value;
  }

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

function clearEntry() {
 $('.current').text('0');
 value = '';
}

function turnNeg() {

  if (value[0] ==  '-') {
    value = value.substring(1,value.length);
  } else {
    value = '-' + value;
  }
  $('.current').text(value);

}

function countDots(val) {
  var counter = 0;
  for (var i = 0; i < val.length; i++) {
    if (val[i] == '.') {
      counter++;
    }
  }
  return counter;
}
