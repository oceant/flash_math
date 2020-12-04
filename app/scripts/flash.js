"use strict";

$(function () {
  var maxNumber = 20;
  var minNumber = 5;
  var counts = 5;
  var time = 10;
  var speed;
  var answer;
  getSettings(); //countsの個数の数字が入ったmaxNumberの配列

  var Rary = []; //countsの個数の配列 

  var Tary = [];

  function saveSettings() {
    localStorage.setItem('maxNumber', $('#maxNumber').val());
    localStorage.setItem('minNumber', $('#minNumber').val());
    localStorage.setItem('counts', $('#counts').val());
    localStorage.setItem('time', $('#time').val());
  }

  function getSettings() {
    maxNumber = parseInt(localStorage.getItem('maxNumber'));
    minNumber = parseInt(localStorage.getItem('minNumber'));
    counts = parseInt(localStorage.getItem('counts'));
    time = parseInt(localStorage.getItem('time'));
    $('#maxNumber').val(maxNumber);
    $('#minNumber').val(minNumber);
    $('#counts').val(counts);
    $('#time').val(time);
    speed = time * 1000 / counts;
  }

  $('#startButton').on('click', function () {
    saveSettings();
    getSettings();
    $('#settings').hide();
    countdown();
    return false;
  });
  $('#replayButton').on('click', function () {
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

      if (counter === counts) {
        clearInterval(timer);
        setTimeout(function () {
          $('#answerButtonArea').show();
        }, 100);
      }
    }, speed);
  }

  $('#answerButton').on('click', function () {
    showAnswerFlash();
  });
  $('#resetButton').on('click', function () {
    $('#countNumber').text('');
    $('#settings').show();
    $('#startButtonArea').show();
    $('#replayButtonArea').hide();
  });

  function showAnswerFlash() {
    $('#count').addClass('answer');
    $('#countNumber').text(answer);
    $('#answerButtonArea').hide();
    $('#replayButtonArea').show();
  }

  function setNumbers() {
    answer = Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber; //countsの個数分、0が用意された配列をつくる。
    //今回は配列にcountsの数4つ分、0が入った配列を準備。

    for (var i = 0; i < counts; i++) {
      Tary[i] = 0;
    } //0からcountsの個数が乱数で入ったmaxNumberの数分の配列をつくる
    //今回は0、1、2、3のいずれかの数が入ったmaxNumberの数20個分の配列をつくる


    for (var i = 0; i < answer; i++) {
      Rary[i] = Math.floor(Math.random() * counts);
    } //配列Raryに入ったcountsの数字を確認し、該当する数字をTaryの配列に代入する


    for (var i = 0; i < answer; i++) {
      //countsの配列の数の分繰り返し、該当する数字があれば配列の数字に1を加える
      for (var j = 0; j < counts; j++) {
        if (Rary[i] == j) {
          Tary[j]++;
        }
      }
    }
  }
});
//# sourceMappingURL=flash.js.map
