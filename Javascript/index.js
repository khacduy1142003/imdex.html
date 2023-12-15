
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

// biến all
var usersData = {}
// var gop_y_data ={};
var productData = {
    uu_dai:[],
    mon_moi:[],
    trang_mieng:[]
};
function start(){
    control();
    allData();
    handlCreateform_dang_ky();
    handleCreateform_dang_nhap();
    searchdataNamePrice();
}
start();

// all data 
function allData(){
    getApi(api_users,function(user){
        usersData.users = user;
        //console.log(usersData);
    })
    getApi(api_uu_dai,function(uu_dai){
        productData.uu_dai = uu_dai;
        renderData_uu_dai(uu_dai);
    })
    getApi(api_mon_moi,function(mon_moi){
        productData.mon_moi = mon_moi;
        renderdata_mon_moi(mon_moi);
    })
    getApi(api_trang_mieng,function(trang_mieng){
        productData.trang_mieng = trang_mieng;
        renderdata_trang_mieng(trang_mieng);
    })
}

// phần contron 
function control(){
    hien_thi_san_pham(hien_thi_them_tim_kiem,tim_kiem);
    hien_thi_san_pham(hien_thi_them_uu_dai,uu_dai);
    hien_thi_san_pham(hien_thi_them_mon_moi,mon_moi);
    hien_thi_san_pham(hien_thi_them_trang_mieng,trang_mieng);
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
function handlCreateform_dang_ky() {
    var users_dang_ky = document.querySelector('#users_dang_ky');
    users_dang_ky.onclick = function(event) {
    event.preventDefault();
    var dang_ky_name = document.querySelector('input[name="dang_ky_name"]').value;
    var dang_ky_password = document.querySelector('input[name="dang_ky_password"]').value;
    var dang_ky_email = document.querySelector('input[name="dang_ky_email"]').value;
    
    //console.log(dang_ky_email);
    if(dang_ky_name ===''||dang_ky_password ===''||dang_ky_email ===''){
      alert("Bạn còn để trống dữ liệu!")
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
          chuc_vu:0
        }
        AddDataApi_dang_ky(formData)
      }
    }
  };
}
function handleCreateform_dang_nhap() {
  var uses_dang_nhap = document.querySelector('#users_dang_nhap');
  uses_dang_nhap.onclick = function() {
    var username = document.querySelector('input[name="username"]').value;
    var users_password = document.querySelector('input[name="users_password"]').value;

    if (username === '' || users_password === '') {
      alert('Vui lòng nhập đủ thông tin để đăng nhập!');
    } else {
      var ArrayData = Object.values(usersData.users);

      var check_dang_nhap = ArrayData.find(function(data) {
        return data.name === username && data.mat_khau === users_password;
      });
      if (check_dang_nhap) {
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_password');
        // Lưu vào localStorage
        localStorage.setItem('user_name', username);
        localStorage.setItem('user_password', users_password);
        alert('Đăng nhập thành công');

        if (check_dang_nhap.chuc_vu != 0) {
          window.open('../Giao_Dien/admin.html');
        } else {
          window.open('../Giao_Dien/account.html');
        }
        window.close();
      } else {
        alert('Sai tên đăng nhập hoặc mật khẩu!');
      }
    }
  }
}
                                  // product
// ưu đãi 
function renderData_uu_dai(data) {
    var product_items = document.querySelector('#data_uu_dai');
    var htmls = data.map(function(data) {
      return `
        <li class="item_uu_dai_${data.id}">
          <img class="item_uu_dai_image" src="${data.image}">
          <h3 class="item_uu_dai_name">${data.name}</h3>
          <h3 class="item_uu_dai_price">${data.price}</h3>
          <p class="item_uu_dai_chi_tiet">${data.chi_tiet}</p>
          <button class="them_gio_hang_uu_dai  open_btn" onclick="">THÊM</button>
        </li>
      `;
    });
    product_items.innerHTML = htmls.join('');
  }
  // món mới
function renderdata_mon_moi(data) {
    var product_items = document.querySelector('#data_mon_moi');
    var htmls = data.map(function(data) {
      return `
        <li class="item_mon_moi_${data.id}">
        <img class="item_mon_moi_image" src="${data.image}">
        <h3 class="item_mon_moi_name">${data.name}</h3>
        <h3 class="item_mon_moi_price">${data.price}</h3>
        <p class="item_mon_moi_chi_tiet">${data.chi_tiet}</p>
        </li>
      `;
    });
    product_items.innerHTML = htmls.join('');
  }
// món tráng miệng
function renderdata_trang_mieng(data) {
    var product_items = document.querySelector('#data_trang_mieng');
    var htmls = data.map(function(data) {
      return `
        <li class="item_trang_mieng_${data.id}">
            <img class="item_trang_mieng_image" src="${data.image}">
            <h3 class="item_trang_mieng_name">${data.name}</h3>
            <h3 class="item_trang_mieng_price">${data.price}</h3>
            <p class="item_trang_mieng_chi_tiet">${data.chi_tiet}</p>
        </li>
      `;
    });
    product_items.innerHTML = htmls.join('');
  }
                    // chức năng tìm kiếm
// làm phẳng mảnng
function flattenArray(array) {
      return array.reduce(function(acc, curr) {
      return acc.concat(curr);
}, []);
}
// search price and name
function searchdataNamePrice() {
  var tim_kiem = document.getElementById("search_btn");
  tim_kiem.onclick = function(event) {
    event.preventDefault();
    var search_text = document.querySelector('input[name="search_text"]').value;
    if (search_text === '') {
      alert('Vui lòng nhập tên sản phẩm hoặc giá để tìm kiếm sản phẩm');
    } else {
      var ArrayData = flattenArray(Object.values(productData));
      var check_tim_kiem = ArrayData.filter(function(data) {
        if (data.name && data.price) {
          return (
            data.name.toLowerCase() === search_text.toLowerCase() ||
            (typeof data.price === 'number' && data.price.toString() === search_text)
          );
        }
      });
      if (check_tim_kiem.length > 0) {
        document.getElementById("tim_kiem").classList.remove("hide");
        var data_tim_kiem = document.getElementById("data_tim_kiem");
        var htmls = check_tim_kiem.map(function(data) {
          return `
                <li class="item_tim_kiem_${data.id}">
                <img class="item_tim_kiem_image" src="${data.image}">
                <h3 class="item_tim_kiem_name">${data.name}</h3>
                <h3 class="item_tim_kiem_price">${data.price}</h3>
                <p class="item_tim_kiem_chi_tiet">${data.chi_tiet}</p>
          </li>
          `;
        });
        data_tim_kiem.innerHTML = htmls.join('');
      } else {
        alert('Không tìm thấy sản phẩm');
        console.log(ArrayData);
      } 
    }
  }
} 
