
// Api
var api_gop_y ='http://localhost:3000/gop_y';
var api_gio_hang ='http://localhost:3000/gio_hang';
var api_uu_dai ='http://localhost:3000/product_uu_dai';
var api_mon_moi ='http://localhost:3000/product_mon_moi';
var api_trang_mieng ='http://localhost:3000/product_trang_mieng';

                    // biến
//control
var hien_thi_them_tim_kiem = document.querySelector('.hien_thi_them-tim-kiem');
var hien_thi_them_uu_dai = document.querySelector('.hien_thi_them-uu-dai');
var hien_thi_them_mon_moi = document.querySelector('.hien_thi_them-mon-moi');
var hien_thi_them_trang_mieng = document.querySelector('.hien_thi_them-trang-mieng');
var tim_kiem = document.querySelector('#tim_kiem');
var uu_dai = document.querySelector('#uu_dai');
var mon_moi = document.querySelector('#mon_moi');
var trang_mieng = document.querySelector('#trang_mieng');
var dang_xuat = document.querySelector('#dang_xuat');
// biến all

var gio_hang_Data={}
var usersData = {}
var gop_y_data ={};
var productData = {
uu_dai:[],
mon_moi:[],
trang_mieng:[]
};
function start(){
    control();
    allData();
    searchdataNamePrice();
}
start();

// all data 
function allData(){
getApi(api_gop_y,function(gop_y){
    gop_y_data.gop_y = gop_y;
    renderData_tin_nhan(gop_y)
    handlCreateform_gop_y(gop_y);
     //console.log(gop_y_data);
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
getApi(api_gio_hang, function(gio_hang) {
  gio_hang_Data.gioHang = gio_hang;
  renderdata_gio_hang(gio_hang);
  handleTotal_gio_hang(gio_hang);
  //console.log(gio_hang_Data);
});
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
                                //đăng xuất
    dang_xuat.onclick =function(){
        localStorage.removeItem('user_name');
        localStorage.removeItem('user_passwored');
        window.open('../Giao_Dien/index.html')
        window.close();
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

// function handlCreateform_gop_y() {
//     var gop_y_gui_btn = document.querySelector('#gop_y-gui-btn');  
//     gop_y_gui_btn.onclick = function(event) {
//         event.preventDefault(); 
//         var name_gop_y = document.querySelector('input[name="name_gop_y"]').value;
//         var noi_dung_gop_y = document.querySelector('input[name="noi_dung_gop_y"]').value;
//         if (name_gop_y === '' || noi_dung_gop_y === '') {
//         alert('Vui lòng điền đầy đủ thông tin để chúng tôi liên hệ!');
//         } else {
//             var ten_dang_nhap_gop_y = document.querySelector('.ten_dang_nhap_gop_y').textContent;
//             var formData = {
//                 ten_tai_khoan: ten_dang_nhap_gop_y,
//                 ten_gop_y: name_gop_y,
//                 noi_dung: noi_dung_gop_y
//             };
//             addDataa_gop_y(formData);
//         }
//     };
// }
function handlCreateform_gop_y(datas) {
    var gop_y_gui_btn = document.querySelector('#gop_y-gui-btn');  
    gop_y_gui_btn.onclick = function(event) {
        event.preventDefault(); 
        var name_gop_y = document.querySelector('input[name="name_gop_y"]').value;
        var noi_dung_gop_y = document.querySelector('input[name="noi_dung_gop_y"]').value;
        if (name_gop_y === '' || noi_dung_gop_y === '') {
        alert('Vui lòng điền đầy đủ thông tin để chúng tôi liên hệ!');
        } else {
            var ArrayData = datas;
            var storedUsername = localStorage.getItem('user_name');
            var check = ArrayData.find(function(data){
                return data.ten_tai_khoan === storedUsername;
            });
            if(check){
                alert('Bạn đã hết số lần góp ý!');
            }
            else{
                var formData = {
                    ten_tai_khoan: storedUsername,
                    ten_gop_y: name_gop_y,
                    noi_dung: noi_dung_gop_y
                };
                addDataa_gop_y(formData);
            }
        }
    };
}
function renderData_tin_nhan(data) {
    var tin_nhan_data = document.querySelector('#tin_nhan_data');
    var htmls = data.map(function(data, index) {
        var id = index + 1; 
        return `
        <li class="item" id="item-${id}">
            <h3 class="name_thong_bao">Người gửi: ${data.ten_gop_y}</h3>
            <p class="noi_dung_thong_bao">Nội dung: ${data.noi_dung}</p>
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

                                // product
// giỏ hàng
function addGioHang(data, callback) {
    var options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(api_gio_hang, options)
        .then(function(response) {
        return response.json();
        })
        .then(callback);
}
function handleDeleteData(id){
  var options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(api_gio_hang +'/'+id, options)
    .then(function(response) {
      return response.json();
    })
    .then(function(){
      var data_item = document.querySelector('.item_gio_hang_'+id);
      if(data_item){
        data_item.readmove();
      }
    });
}
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
            <button class="them_gio_hang_uu_dai " onclick="">THÊM</button>
        </li>
        `;
    });
    product_items.innerHTML = htmls.join('');
    var addButtons = document.querySelectorAll('.them_gio_hang_uu_dai');
    addButtons.forEach(function(button) {
        button.addEventListener('click', addGioHang_uu_dai);
    });
}
//giỏ hàng ưu đãi
function addGioHang_uu_dai(event) {
    event.preventDefault();
    var item_uu_dai_image = this.parentElement.querySelector('.item_uu_dai_image').getAttribute('src');
    var item_uu_dai_name = this.parentElement.querySelector('.item_uu_dai_name').textContent;
    var item_uu_dai_price = this.parentElement.querySelector('.item_uu_dai_price').textContent;
    var item_uu_dai_chi_tiet = this.parentElement.querySelector('.item_uu_dai_chi_tiet').textContent;
    var storedUsername = localStorage.getItem('user_name');
    var formData = {
    ten_tai_khoan: storedUsername,
    image: item_uu_dai_image,
    name: item_uu_dai_name,
    price: item_uu_dai_price,
    chi_tiet: item_uu_dai_chi_tiet
    };
    addGioHang(formData);
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
        <button id=" " class=" them_gio_hang_mon_moi ">THÊM</button>
        </li>
        `;
    });
    product_items.innerHTML = htmls.join('');
    var addButtons = document.querySelectorAll('.them_gio_hang_mon_moi');
    addButtons.forEach(function(button) {
        button.addEventListener('click', addGioHang_mon_moi);
    });
}
// giỏ hàng món mới
function addGioHang_mon_moi(event) {
    event.preventDefault();
    var item_mon_moi_image = this.parentElement.querySelector('.item_mon_moi_image').getAttribute('src');
    var item_mon_moi_name = this.parentElement.querySelector('.item_mon_moi_name').textContent;
    var item_mon_moi_price = this.parentElement.querySelector('.item_mon_moi_price').textContent;
    var item_mon_moi_chi_tiet = this.parentElement.querySelector('.item_mon_moi_chi_tiet').textContent;
    var storedUsername = localStorage.getItem('user_name');
    var formData = {
    ten_tai_khoan: storedUsername,
    image: item_mon_moi_image,
    name: item_mon_moi_name,
    price: item_mon_moi_price,
    chi_tiet: item_mon_moi_chi_tiet
    };
    addGioHang(formData);
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
            <button id="" class="them_gio_hang_trang_mieng  ">THÊM</button>
        </li>
        `;
    });
    product_items.innerHTML = htmls.join('');
    var addButtons = document.querySelectorAll('.them_gio_hang_trang_mieng');
    addButtons.forEach(function(button) {
        button.addEventListener('click', addGioHang_trang_mieng);
    });
}
// giỏ hàng món tráng miệng
function addGioHang_trang_mieng(event) {
    event.preventDefault();
    var item_trang_mieng_image = this.parentElement.querySelector('.item_trang_mieng_image').getAttribute('src');
    var item_trang_mieng_name = this.parentElement.querySelector('.item_trang_mieng_name').textContent;
    var item_trang_mieng_price = this.parentElement.querySelector('.item_trang_mieng_price').textContent;
    var item_trang_mieng_chi_tiet = this.parentElement.querySelector('.item_trang_mieng_chi_tiet').textContent;
    var storedUsername = localStorage.getItem('user_name');
    var formData = {
        ten_tai_khoan: storedUsername,
        image: item_trang_mieng_image,
        name: item_trang_mieng_name,
        price: item_trang_mieng_price,
        chi_tiet: item_trang_mieng_chi_tiet
};
addGioHang(formData);
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
                <button id="" class="them_gio_hang_tim_kiem">THÊM</button>
            </li>
            `;
        });
        data_tim_kiem.innerHTML = htmls.join('');
        var addButtons = document.querySelectorAll('.them_gio_hang_tim_kiem');
        addButtons.forEach(function(button) {
            button.addEventListener('click', addGioHang_tim_kiem);
        });
        } else {
        alert('Không tìm thấy sản phẩm');
        //console.log(ArrayData);
        } 
    }
    }
} 

function addGioHang_tim_kiem() {
    var item_tim_kiem_image = this.parentElement.querySelector('.item_tim_kiem_image').getAttribute('src');
    var item_tim_kiem_name = this.parentElement.querySelector('.item_tim_kiem_name').textContent;
    var item_tim_kiem_price = this.parentElement.querySelector('.item_tim_kiem_price').textContent;
    var item_tim_kiem_chi_tiet = this.parentElement.querySelector('.item_tim_kiem_chi_tiet').textContent;
    var storedUsername = localStorage.getItem('user_name');
    var formData = {
    ten_tai_khoan: storedUsername,
    image: item_tim_kiem_image,
    name: item_tim_kiem_name,
    price: item_tim_kiem_price,
    chi_tiet: item_tim_kiem_chi_tiet
    };
    addGioHang(formData);
}

                                    // giỏ hàng
function renderdata_gio_hang(data) {
  var gio_hang_list = document.querySelector('#gio_hang_data');
  var ArrayData = data;
  var storedUsername = localStorage.getItem('user_name');
  var check = ArrayData.filter(function(data){
    return data.ten_tai_khoan === storedUsername;
  })
  if(check.length >0){
    var htmls = check.map(function(data) {
        return `
            <li class="item_gio_hang_${data.id}">
                <img class="item_gio_hang_image" src="${data.image}">
                <h3 class="item_gio_hang_name">${data.name}</h3>
                <h3 class="item_gio_hang_price">${data.price}</h3>
                <p class="item_gio_hang_chi_tiet">${data.chi_tiet}</p>
                <button id="" class="xoa_gio_hang_gio_hang" onclick = "handleDeleteData(${data.id})">XÓA</button>
            </li>
        `;
        });
        gio_hang_list.innerHTML = htmls.join('');
  }
}                                     
function handleTotal_gio_hang(data) {
    var ArrayData = data;
    var storedUsername = localStorage.getItem('user_name');
    var check = ArrayData.filter(function(data){
      return data.ten_tai_khoan === storedUsername;
    });
    if (check.length > 0) {
      var total = check.reduce(function(a, b) {
        return parseFloat(a) + parseFloat(b.price);
      }, 0);
      tinhTien(total);
      var total_gio_hang = document.querySelector('#total_gio_hang');
      total_gio_hang.innerText = total + `.VND`;
    }
  }
function tinhTien(search_btn) {
    var tienTraInput = document.getElementById("tien_tra");
    tienTraInput.addEventListener("input", function() {
      var tienTra = parseFloat(tienTraInput.value);
      var tien_thua = tienTra - search_btn;
      //console.log(tien_thua)
      if(tien_thua >= 0){
        var da_thanh_toan = document.querySelector('#da_thanh_toan');

        da_thanh_toan.innerHTML = `Bạn đã thanh toán! ` +` số tiền còn lại là `+ tien_thua;
        
        var deleteButtons = document.querySelectorAll('.xoa_gio_hang_gio_hang');
         

        var chua_thanh_toan = document.querySelector('#chua_thanh_toan');
        chua_thanh_toan.style.display = "none";
      }
      else{
        var chua_thanh_toan = document.querySelector('#chua_thanh_toan');
        chua_thanh_toan.innerHTML = `Bạn chưa thanh toán! Vui lòng thanh toán đơn hàng.`;
      }
    });
  }