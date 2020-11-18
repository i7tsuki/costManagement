export default function ({ store, redirect  }) {
  //ログインしていない場合ログイン画面へ強制遷移
  if(store.state.user.mail === null) { 
    return redirect('/login');
  } else {
    return;
  }
}