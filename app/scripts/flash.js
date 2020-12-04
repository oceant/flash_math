"use strict";

$(function () {
  var total = 20;
  var item = 5;
  var answer = 0; //itemの個数の数字が入ったtotalの配列

  var Rary = []; //itemの個数の配列 

  var Tary = [];
  $('#startButton, #replayButton').on('click', function () {
    countdown();
    return false;
  });

  function countdown() {
    $('#startButtonArea, #replayButtonArea').hide();
    setNumbers();
    $('#count').css('visibility', 'hidden').removeClass('answer').addClass('countdown');
    var counter = 3;
    var timer = setInterval(function () {
      $('#count').css('visibility', 'visible');
      $('#countNumber').text(counter);
      counter--;

      if (counter < 0) {
        clearInterval(timer);
        startFlash();
      }
    }, 1000);
  }

  function startFlash() {
    var counter = 0;
    $('#count').css('visibility', 'hidden').removeClass('countdown');
    var timer = setInterval(function () {
      $('#count').css('visibility', 'hidden');
      setTimeout(function () {
        $('#count').css('visibility', 'visible');
      }, 100);
      $('#countNumber').text(Tary[counter]);
      counter++;

      if (counter === item) {
        clearInterval(timer);
        setTimeout(function () {
          $('#answerButtonArea').show();
        }, 100);
      }
    }, 1000);
  }

  $('#answerButton').on('click', function () {
    showAnswerFlash();
  });

  function showAnswerFlash() {
    $('#count').addClass('answer');
    $('#countNumber').text(answer);
    $('#answerButtonArea').hide();
    $('#replayButtonArea').show();
  }

  function setNumbers() {
    answer = Math.floor(Math.random() * (total - item)) + item; //itemの個数分、0が用意された配列をつくる。
    //今回は配列にitemの数4つ分、0が入った配列を準備。

    for (var i = 0; i < item; i++) {
      Tary[i] = 0;
    } //0からitemの個数が乱数で入ったtotalの数分の配列をつくる
    //今回は0、1、2、3のいずれかの数が入ったtotalの数20個分の配列をつくる


    for (var i = 0; i < answer; i++) {
      Rary[i] = Math.floor(Math.random() * item);
    } //配列Raryに入ったitemの数字を確認し、該当する数字をTaryの配列に代入する


    for (var i = 0; i < answer; i++) {
      //itemの配列の数の分繰り返し、該当する数字があれば配列の数字に1を加える
      for (var j = 0; j < item; j++) {
        if (Rary[i] == j) {
          Tary[j]++;
        }
      }
    }
  }
});
//# sourceMappingURL=flash.js.map
