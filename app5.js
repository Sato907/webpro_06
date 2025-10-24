const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken2", (req, res) => {
  //let hand = req.query.hand; //出した手
  let win = Number( req.query.win )|| 0; //数字化するためのNumber
  let total = Number( req.query.total )|| 0;
  let value = Number(req.query.radio)|| 0;
  console.log( {win, total,value});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else if (num==3) cpu = 'パー';

  if(value==1) your = 'グー';
  else if(value==2) your = 'チョキ';
  else if(value==3) your = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  total +=1;

  if (num == 1 && value == 3 || num == 2 && value == 1 || num == 3 && value == 2){
    judgement = '勝ち';
    win += 1;
  }

  else if (num == 1 && value == 1 || num == 2  && value == 2 || num == 3 && value == 3){
    judgement = 'あいこ';
  }

  else {
    judgement = '負け';
  }

  

  const display = {
    your: your,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };
  res.render( 'janken2', display );//使うのはjanken2.ejs
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
