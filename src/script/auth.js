

// Listen for auth status changes
auth.onAuthStateChanged(user => {
  
  if (user) {
    db.collection("users").doc(user.uid).onSnapshot(doc => {
      setupUI(user);
    });
  } 
  else {
    setupUI();
  }

  });

// signup
const signupForm = document.querySelector('#signup-form');
const notisignup = document.querySelector('.noti-signup');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const cfpassword = signupForm['signup-cfpassword'].value;
  const first_name = signupForm['signup-first-name'].value;
  const last_name = signupForm['signup-last-name'].value;


  // info not empty
  if(email == "" || password == "" || cfpassword == ""||first_name == ""||last_name == "")
  {
    notisignup.innerHTML ="Thông tin không được để trống.";
  }
  // password = cfpassword
  else
  {
    if(password != cfpassword)
  {
    notisignup.innerHTML ="Mật khẩu không trùng khớp.";
  }
  
  else
  {

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      return db.collection("users").doc(cred.user.uid).set({
        
        first_name: signupForm['signup-first-name'].value,
        last_name: signupForm['signup-last-name'].value,
        email: signupForm['signup-email'].value,
        country: '',
        province: '',
        district: '',
        address: '',
        phone:'',
        photoURL: 'https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
      });
    }).then(() => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      notisignup.innerHTML ="Đăng ký thành công.";
    }).catch(err => {
      notisignup.innerHTML ="Email đã được sử dụng.";
      
    });
  }
}
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
  })
}
);

//login
const loginForm = document.querySelector('#login-form');
const notilogin = document.querySelector('.noti-login');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  }).catch(err => {
    notilogin.innerHTML ="Email hoặc mật khẩu không đúng.";
    
  });
}
);

