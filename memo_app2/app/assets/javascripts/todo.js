$(function() {
  function buildHTML(todo) {
    var html = $('<li class="todo">').append(todo.content);
    return html;
  }

  $('.js-form').on('submit', function(e) {
    // フォームの送信が行われた時に関数実行
    e.preventDefault();
    // イベントを止めて同期通信をしないようにする(eはイベントオブジェクト)
    var textField = $('.js-form__text-field');
    // textFieldを取得し、textFieldという変数に代入
    var todo = textField.val();
    // textFieldの値を取得し、todoという変数に代入
    $.ajax({
      // ajax通信行う
      type: 'POST',
      // HTTP通信の種類を記述する。GETとPOSTの２種類
      url: '/todos.json',
      // リクエストを送信する先のURLを記述する
      // POST /todos(.:format) todos#create
      data: {
        // サーバーに送信する値を記述する
        // これがparametersになる
        todo: {
          content: todo
          // このtodoはtextField.val();で取得したtodo
        }
      },
      dataType: 'json'
      // サーバーから返されるデータの型を指定する
      //jsonを指定
    })
    .done(function(data) {
      // ajax通信に成功したら関数実行、引数にdata
      //function(data)となっていますが、非同期通信に成功した時の即時関数の第一引数には、サーバから返されたデータが入っています。この場合のサーバから返ってくるデータというのは、非同期通信によって作成したTodoにあたります
      var html = buildHTML(data);
      // buildHTML関数実行し(引数にdata持ってく)、変数htmlに代入
      $('.todos').append(html);
      // ulタグ(クラス名todos)に変数htmlを付け足す
      textField.val('');
      // textfieldを空欄に戻す
    })
    .fail(function() {
      alert('error');
    });
  });
});
