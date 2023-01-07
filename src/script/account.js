const profile = document.querySelector('.profile');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');


const setupUI = (user) => {
  if (user) {
    localStorage.setItem('isLogin', 'true')
    localStorage.setItem('user',`${user.uid}`)
    // account info
    db.collection("users").doc(user.uid).get().then(doc => {
      localStorage.setItem('user_avatar', doc.data().photoURL)
      localStorage.setItem('user_email', doc.data().email)
      var html=`
      <div id="containter">
        <div class="photo">
          <img src=${doc.data().photoURL} alt="avatar">
        </div>
        <div class="info">
          <div class="item">
            <label for="name">Họ và Tên</label>
            <h5 id = "name">${doc.data().last_name} ${doc.data().first_name}</h5>
          </div>
          <div class="item">
            <label for="email">Email</label>
            <h5 id = "email">${doc.data().email}</h5>
          </div>`;
      if(doc.data().phone=="")
      {
        html +=
          `<div class="item">
          <label for="phone-num">Số điện thoại</label>
          <h5>Bạn chưa cập nhật số điện thoại</h5>
        </div>`;
      }
      else
      {
       html+=
        `<div class="item">
          <label for="phone-num">Số điện thoại</label>
          <h5>${doc.data().phone}</h5>
        </div>`;
      }
    var temp="";
    temp=doc.data().address != "" ? doc.data().address + ", ": "";
    temp+=doc.data().district != "" ?  doc.data().district + ", " : "";
    temp+=doc.data().province != "" ? doc.data().province +", " : "";
    temp+=doc.data().country != "" ? doc.data().country : "";
    if (temp=="")
    {
      html+=
        `<div class="item">
        <label for="address">Địa chỉ</label>
        <h5>Bạn chưa cập nhật địa chỉ</h5>
      </div>`;
    }
    else
    {
      html+=
        `<div class="item">
        <label for="address">Địa chỉ</label>
        <h5>${temp}</h5>
      </div>`;
    };
    html+=`</div>`;
    
  profile.innerHTML = html;
  });

    // update password
  const change_psw = document.querySelector('#psw-form');
  change_psw.addEventListener('submit', (e) => {
  e.preventDefault();
  user.updatePassword(change_psw['new-password'].value).then(()=> {
    const modal = document.querySelector('#modal-psw');
    M.Modal.getInstance(modal).close();
    change_psw.reset();
  }).catch(err => {
    console.log(err);
  });
  });


    // update account info
    const profileForm = document.querySelector('#profile-form');
    
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const temp = auth.currentUser;
      console.log(temp);
      db.collection('users').doc(user.uid).update({
        first_name: profileForm['profile-first-name'].value,
        last_name: profileForm['profile-last-name'].value,
        phone: profileForm['profile-phone'].value,
        photoURL: profileForm['profile-photoURL'].value,
        address: profileForm['profile-address'].value,
        district: profileForm['profile-district'].value,
        province: profileForm['profile-province'].value,
        country: profileForm['profile-country'].value,    
      }).then(() => {
        // close the create modal & reset form
        const modal = document.querySelector('#modal-account');
        M.Modal.getInstance(modal).close();
        createForm.reset();
      })
      .catch(err => {
        console.log("update error");
      }
      );
    });


    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }
  else {
    localStorage.setItem('isLogin', 'false')
    localStorage.setItem('user', '')
    localStorage.setItem('user_email', null)
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).open();
    // hide account info
    //accountDetails.innerHTML = '';
    profile.innerHTML = '<h5 class="center-align">Bạn chưa đăng nhập</h5>';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});


