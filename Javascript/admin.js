
// Api
var api_users ='http://localhost:3000/users';
var api_gop_y ='http://localhost:3000/gop_y';
var api_gio_hang ='http://localhost:3000/gio_hang';
var api_uu_dai ='http://localhost:3000/product_uu_dai';
var api_mon_moi ='http://localhost:3000/product_mon_moi';
var api_trang_mieng ='http://localhost:3000/product_trang_mieng';

                        // biến
//đăng nhập -  đăng ký
var app = document.querySelector('#app');
var dang_nhap = document.querySelector('#dang_nhap');
var users =  document.querySelector('#users');
var dong_dang_nhap = document.querySelector('#dong_dang_nhap');
var dk = document.querySelector('#dk');
var dn = document.querySelector('#dn');
var form_dang_nhap = document.querySelector('#form_dang_nhap');
var form_dang_ky = document.querySelector('#form_dang_nhap');
var name_tai_khoan_dang_nhap = document.querySelector('#name_tai_khoan_dang_nhap');
var menu_name_tai_khoan_dang_nhap = document.querySelector('#menu_name_tai_khoan_dang_nhap');
//control
var hien_thi_them_tim_kiem = document.querySelector('.hien_thi_them-tim-kiem');
var hien_thi_them_uu_dai = document.querySelector('.hien_thi_them-uu-dai');
var hien_thi_them_mon_moi = document.querySelector('.hien_thi_them-mon-moi');
var hien_thi_them_trang_mieng = document.querySelector('.hien_thi_them-trang-mieng');
var tim_kiem = document.querySelector('#tim_kiem');
var uu_dai = document.querySelector('#uu_dai');
var mon_moi = document.querySelector('#mon_moi');
var trang_mieng = document.querySelector('#trang_mieng');
var tai_khoan = document.querySelector('#tai_khoan');
var hien_thi_tai_khoan = document.querySelector('.hien_thi_them-tai-khoan')
var usersData = {}
function start(){
    control();
    getApi(api_uu_dai,renderdata_uu_dai);
    handleCreateForm_uu_Dai();
    getApi(api_mon_moi,renderdata_mon_moi);
    handleCreateForm_mon_moi();
    getApi(api_trang_mieng,renderdata_trang_mieng);
    handleCreateForm_trang_mieng();
    getApi(api_gop_y,renderData_tin_nhan);
    handleCreateform_gop_y();
    handleCreateform_dang_ky();
    handleCreateform_dang_nhap();
    getApi(api_users,function(user){
        usersData.users = user;
        renderdata_tai_khoan(user);
        //console.log(usersData);
    })
}
start();


// phần control 
function control(){
    hien_thi_san_pham(hien_thi_them_tim_kiem,tim_kiem);
    hien_thi_san_pham(hien_thi_them_uu_dai,uu_dai);
    hien_thi_san_pham(hien_thi_them_mon_moi,mon_moi);
    hien_thi_san_pham(hien_thi_them_trang_mieng,trang_mieng);
    hien_thi_san_pham(hien_thi_tai_khoan,tai_khoan);
    function hien_thi_san_pham(a,b){
        var trangThai = false;
            a.onclick = function(){
            if(!trangThai){
            b.style.height ='auto';
            b.style.overflow = 'visible';
            trangThai = true;
            }else{
            b.style.height ='1000px';
            b.style.overflow = 'hidden';
            trangThai = false;
            }
        }
        }
                                // exit search 
    var exit_tim_kiem = document.querySelector('#exit_tim_kiem');
        exit_tim_kiem.onclick =function(){
            tim_kiem.classList.add("hide");
        }
                                // giỏ hàng
        var exitButton = document.getElementById("exit_gio_hang");
        var formGioHang = document.getElementById("form_gio_hang");
        exitButton.addEventListener("click", function() {
        formGioHang.style.display = "none"; 
        });
                                    //tai - khoan
        var app = document.querySelector('#app');
        var users =  document.querySelector('#users');
        dang_nhap.onclick = function(event){
        app.classList.add("hide");
        users.classList.remove("hide");

        dong_dang_nhap.onclick = function(event){
            event.preventDefault();
            app.classList.remove("hide");
            users.classList.add("hide");
            }
            dang_nhap.onclick = function(event){
            event.preventDefault();
            app.classList.add("hide");
            users.classList.remove("hide");
            }
            dk.onclick= function(event){
                event.preventDefault();
                var formDangNhap = document.getElementById("form_dang_nhap");
                var formDangKy = document.getElementById("form_dang_ky");
                formDangNhap.classList.add("hide");
                formDangKy.classList.remove("hide");
            }
            
            dn.onclick = function(event) {
                event.preventDefault();
                var formDangNhap = document.getElementById("form_dang_nhap");
                var formDangKy = document.getElementById("form_dang_ky");
                
                formDangNhap.classList.remove("hide");
                formDangKy.classList.add("hide");
            }
            
    }
}

// handle login
// handle Api
function getApi(api,callback) {
        fetch(api)
            .then(function(response) {
            return response.json();
            })
            .then(callback)
            .catch(function(error) {
            console.log(error);
            });
        }

// render product

// ưu đãi
function addData_uu_dai(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(api_uu_dai, options)
         .then(function(response) {
            return response.json();
         })
         .then(callback);
}
function handleDeleteData_uu_dai(id){
    var options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch(api_uu_dai +'/'+id, options)
      .then(function(response) {
        return response.json();
      })
      .then(function(){
        var data_item = document.querySelector('.item_uu_dai_'+id);
        if(data_item){
          data_item.remove();
        }
      });
  }
// function updateData_uu_dai(id, data, callback) {
//     var options = {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(data)
//     };
//     fetch(api_uu_dai + '/' + id, options)
//       .then(function(response) {
//         return response.json();
//       })
//       .then(callback);
//   }
function renderdata_uu_dai(data) {
    var product_items = document.querySelector('#data_uu_dai');
    var htmls = data.map(function(data) {
      return `
        <li class="item_uu_dai_${data.id}">
          <img class="item_uu_dai_image" src="${data.image}">
          <h3 class="item_uu_dai_name">${data.name}</h3>
          <h3 class="item_uu_dai_price">${data.price}</h3>
          <p class="item_uu_dai_chi_tiet">${data.chi_tiet}</p>
          <button class="them_uu_dai" onclick="handleDeleteData_uu_dai(${data.id})">XÓA</button>
          
        </li>
      `;
    });
    product_items.innerHTML = htmls.join('');
  }
function handleCreateForm_uu_Dai(){
    var addBtn = document.querySelector('#them_uu_dai_btn');
    addBtn.onclick = function(){
        var image = document.querySelector('input[name="them_uu_dai_image"]').value;
        var name = document.querySelector('input[name="them_uu_dai_name"]').value;
        var price = document.querySelector('input[name="them_uu_dai_price"]').value;
        var mo_ta = document.querySelector('input[name="them_uu_dai_mo_ta"]').value;
        var formData = {
            image:image,
            name:name,
            price:price,
            chi_tiet:mo_ta
        }
        addData_uu_dai(formData)
    }
}

// món mới
function addData_mon_moi(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(api_mon_moi, options)
         .then(function(response) {
            return response.json();
         })
         .then(callback);
}
function handleDeleteData_mon_moi(id){
    var options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch(api_mon_moi +'/'+id, options)
      .then(function(response) {
        return response.json();
      })
      .then(function(){
        var data_item = document.querySelector('.item_mon_moi_'+id);
        if(data_item){
          data_item.remove();
        }
      });
  }
function renderdata_mon_moi(data) {
    var product_items = document.querySelector('#data_mon_moi');
    var htmls = data.map(function(data) {
      return `
        <li class="item_mon_moi_${data.id}">
          <img class="item_mon_moi_image" src="${data.image}">
          <h3 class="item_mon_moi_name">${data.name}</h3>
          <h3 class="item_mon_moi_price">${data.price}</h3>
          <p class="item_mon_moi_chi_tiet">${data.chi_tiet}</p>
          <button class="them_mon_moi"onclick = "handleDeleteData_mon_moi(${data.id})">XÓA</button>
        </li>
      `;
    });
    product_items.innerHTML = htmls.join('');
  }
function handleCreateForm_mon_moi(){
    var addBtn = document.querySelector('#them_mon_moi_btn');
    addBtn.onclick = function(){
        var image = document.querySelector('input[name="them_mon_moi_image"]').value;
        var name = document.querySelector('input[name="them_mon_moi_name"]').value;
        var price = document.querySelector('input[name="them_mon_moi_price"]').value;
        var mo_ta = document.querySelector('input[name="them_mon_moi_mo_ta"]').value;
        var formData = {
            image:image,
            name:name,
            price:price,
            chi_tiet:mo_ta
        }
        addData_mon_moi(formData, function(){
            
        });
    }
}
// tráng miệng
function addData_trang_mieng(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(api_trang_mieng, options)
         .then(function(response) {
            return response.json();
         })
         .then(callback);
}
function handleDeleteData_trang_mieng(id){
    var options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch(api_trang_mieng +'/'+id, options)
      .then(function(response) {
        return response.json();
      })
      .then(function(){
        var data_item = document.querySelector('.item_trang_mieng_'+id);
        if(data_item){
          data_item.remove();
        }
      });
  }
function renderdata_trang_mieng(data) {
    var product_items = document.querySelector('#data_trang_mieng');
    var htmls = data.map(function(data) {
      return `
        <li class="item_trang_mieng_${data.id}">
          <img class="item_trang_mieng_image" src="${data.image}">
          <h3 class="item_trang_mieng_name">${data.name}</h3>
          <h3 class="item_trang_mieng_price">${data.price}</h3>
          <p class="item_trang_mieng_chi_tiet">${data.chi_tiet}</p>
          <button class="them_trang_mieng"onclick = "handleDeleteData_trang_mieng(${data.id})">XÓA</button>
        </li>
      `;
    });
    product_items.innerHTML = htmls.join('');
  }
function handleCreateForm_trang_mieng(){
    var addBtn = document.querySelector('#them_trang_mieng_btn');
    addBtn.onclick = function(){
        var image = document.querySelector('input[name="them_trang_mieng_image"]').value;
        var name = document.querySelector('input[name="them_trang_mieng_name"]').value;
        var price = document.querySelector('input[name="them_trang_mieng_price"]').value;
        var mo_ta = document.querySelector('input[name="them_trang_mieng_mo_ta"]').value;
        var formData = {
            image:image,
            name:name,
            price:price,
            chi_tiet:mo_ta
        }
        addData_trang_mieng(formData, function(){
            
        });
    }
}

// góp ý
function addDataa_gop_y(data, callback) {
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    fetch(api_gop_y, options)
      .then(function(response) {
        return response.json();
      })
      .then(callback);
  }
  function handleDeleteData_gop_y(id){
    var options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    fetch(api_gop_y +'/'+id, options)
      .then(function(response) {
        return response.json();
      })
      .then(function(){
        var data_item = document.querySelector('.item_tin_nhan_'+id);
        if(data_item){
          data_item.remove();
        }
      });
  }
function handleCreateform_gop_y() {
    var gop_y_gui_btn = document.querySelector('#gop_y-gui-btn');  
    gop_y_gui_btn.onclick = function(event) {
      event.preventDefault(); 
      var name_gop_y = document.querySelector('input[name="name_gop_y"]').value;
      var noi_dung_gop_y = document.querySelector('input[name="noi_dung_gop_y"]').value;
      if (name_gop_y === '' || noi_dung_gop_y === '') {
        alert('Vui lòng điền đầy đủ thông tin để chúng tôi liên hệ!');
      } else {
            var ten_dang_nhap_gop_y = document.querySelector('.ten_dang_nhap_gop_y').textContent;
            var formData = {
              ten_tai_khoan: ten_dang_nhap_gop_y,
              ten_gop_y: name_gop_y,
              noi_dung: noi_dung_gop_y
            };
            addDataa_gop_y(formData);
      }
    };
  }
function renderData_tin_nhan(data) {
    var tin_nhan_data = document.querySelector('#tin_nhan_data');
    var htmls = data.map(function(data, index) {
      var id = index + 1; 
      return `
        <li class="item_tin_nhan_${data.id}" id="item-${data.id}">
          <h3 class="name_thong_bao">Người gửi: ${data.ten_gop_y}</h3>
          <p class="noi_dung_thong_bao">Nội dung: ${data.noi_dung}</p>
          <button class="a" onclick = "handleDeleteData_gop_y(${data.id})">XÓA</button>
        </li>
      `;
    });
    htmls.sort(function(a, b) {
      var idA = parseInt(a.match(/id="item-(\d+)"/)[1]);
      var idB = parseInt(b.match(/id="item-(\d+)"/)[1]);
      return idB - idA;
    });
  
    tin_nhan_data.innerHTML = htmls.join('');
  }

function AddDataApi_dang_ky(data,callback,api) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(api_users, options)
        .then(function(response) {
            return response.json();
        })
        .then(callback);
}  
// đăng ký
function handleCreateform_dang_ky() {
var users_dang_ky = document.querySelector('#users_dang_ky');
users_dang_ky.onclick = function(event) {
 event.preventDefault();
 var dang_ky_name = document.querySelector('input[name="dang_ky_name"]').value;
 var dang_ky_password = document.querySelector('input[name="dang_ky_password"]').value;
 var dang_ky_email = document.querySelector('input[name="dang_ky_email"]').value;
 var dang_ky_chuc_vu = document.querySelector('input[name="dang_ky_chuc_vu"]').value;

 //console.log(dang_ky_email);
 if(dang_ky_name ===''||dang_ky_password ===''||dang_ky_email ===''){
   alert("Bạn còn để trống dữ liệu!");
 }
 else{
   var ArrayData = Object.values(usersData.users); 

   var check_dang_ky = ArrayData.find(function(data){
     return data.name === dang_ky_name;
   });
   if(check_dang_ky){
     alert("Tên tài khoản đã tồn tại");
   }
   else{
     var formData = {
       name:dang_ky_name,
       mat_khau:dang_ky_password,
       email:dang_ky_email,
       chuc_vu:dang_ky_chuc_vu
     }
     AddDataApi_dang_ky(formData)
   }
 }
};
}

// login
function handleCreateform_dang_nhap() {
  var uses_dang_nhap = document.querySelector('#users_dang_nhap');
  uses_dang_nhap.onclick = function(event) {
  event.preventDefault();
  var username = document.querySelector('input[name="username"]').value;
  var users_password = document.querySelector('input[name="users_password"]').value;
  var users_chuc_vu = document.querySelector('input[name="users_chuc_vu"]').value;
  if (username === '' || users_password === '') {
    alert('Vui lòng nhập đủ thông tin để đăng nhập!');
  } else {
    var ArrayData = Object.values(usersData.users);

    var check_dang_nhap = ArrayData.find(function(data) {
      return data.name === username || data.mat_khau === users_password;
    });
    if (check_dang_nhap) {
      alert('Đăng nhập thành công tài khoản người dùng')
    } else {
      alert('Đăng nhập tài khoản thất bại!');
    }
  }
  }
}

// handle user 
function renderdata_tai_khoan(data) {
  var product_items = document.querySelector('#data_tai_khoan');
  var htmls = data.map(function(data) {
    return `
      <li class="item_tai_khoan_${data.id}">
        <h3 class="item_tai_khoan_id">Id:${data.id}</h3>
        <h3 class="item_tai_khoan_name">Name:${data.mat_khau}</h3>
        <h3 class="item_tai_khoan_price">Email:${data.email}</h3>
        <p class="item_tai_khoan_chi_tiet">Chức vụ:${data.chuc_vu}</p>
        <button class="them_tai_khoan"onclick = "handleDeleteData_tai_khoan(${data.id})">XÓA</button>
      </li>
    `;
  });
  product_items.innerHTML = htmls.join('');
}
function handleDeleteData_tai_khoan(id){
  var options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(api_users +'/'+id, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(){
      var data_item = document.querySelector('.item_tai_khoan_'+id);
      if(data_item){
        data_item.remove();
      }
    });
}