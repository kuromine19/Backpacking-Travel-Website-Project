
import { db } from '../firebaseConfig.js'

//Các hàm và khai báo dùng chung giữa các màn hình
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '7eb597ab48mshbc1ea92466277a5p13e795jsn964983eb7b12',
		'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
	}
};

window.unavailableFeature = function unavailableFeatures() {
    alert('Chức năng chưa phát triển!')
}


//Chuyển chữ có dấu thành không dấu(src: https://gist.github.com/hu2di/e80d99051529dbaa7252922baafd40e3)
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}


function getStars(rating) {

    // Round to nearest half
    rating = Math.round(rating * 2) / 2;
    let output = [];
    
    // Append all the filled whole stars
    for (var i = rating; i >= 1; i--)
        output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');
    
    // If there is a half a star, append it
    if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
    
    // Fill the empty stars
    for (let i = (5 - rating); i >= 1; i--)
        output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
    
    return output.join('');

}


window.showInfoPlace = function showInfoPlace(location_id)
{
    localStorage.setItem('location_id', location_id)
    window.open('../page/xem-dia-diem.html')
}

window.openAccountPage = function openAccountPage()
{
    window.location.assign('../page/account.html')
}


if (document.URL.includes("index.html") || document.URL.includes("book_flights_index.html"))
{
    // Slider
    const slider = document.querySelector("#slider");
    const nextBtn = document.querySelector(".next-btn");
    const prevBtn = document.querySelector(".prev-btn");
    const slides = document.querySelectorAll(".slide");
    const slideIcons = document.querySelectorAll(".slide-icon");
    const numberOfSlides = slides.length;
    var slideNumber = 0;


    //image slider next button
    nextBtn.addEventListener("click", () => {
        slides.forEach((slide) => {
        slide.classList.remove("active");
        });
        slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
        });

        slideNumber++;

        if(slideNumber > (numberOfSlides - 1)){
        slideNumber = 0;
        }

        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
    });

    //image slider previous button
    prevBtn.addEventListener("click", () => {
        slides.forEach((slide) => {
        slide.classList.remove("active");
        });
        slideIcons.forEach((slideIcon) => {
        slideIcon.classList.remove("active");
        });

        slideNumber--;

        if(slideNumber < 0){
        slideNumber = numberOfSlides - 1;
        }

        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
    });

    //image slider autoplay
    var playSlider;

    var repeater = () => {
        playSlider = setInterval(function(){
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });
        slideIcons.forEach((slideIcon) => {
            slideIcon.classList.remove("active");
        });

        slideNumber++;

        if(slideNumber > (numberOfSlides - 1)){
            slideNumber = 0;
        }

        slides[slideNumber].classList.add("active");
        slideIcons[slideNumber].classList.add("active");
        }, 2000);
    }
    repeater();

    //stop the image slider autoplay on mouseover
    slider.addEventListener("mouseover", () => {
        clearInterval(playSlider);
    });

    //start the image slider autoplay again on mouseout
    slider.addEventListener("mouseout", () => {
        repeater();
    });
}


//Các xử lý trong màn hình index(home)
if (document.URL.includes("index.html"))
{
    // Tabs


    window.openTab = function openTab(evt, cityName) {
        var tabActive = document.querySelector(".tablinks.tabActive");
        var tabActiveContent = document.querySelector(".tabcontent.tabActive");
        tabActive.classList.remove("tabActive");
        tabActiveContent.classList.remove("tabActive");
        document.getElementById(cityName).classList.add("tabActive");
        evt.currentTarget.classList.add("tabActive");
    }



    window.Search = function Search(e) {
        
        if (e.target.className == "fas fa-search") {
            var searchKey = document.querySelector(".searchAndLogin input");
        }
        if (e.target.className == "Btn") {
            var searchKey = document.querySelector("#Place input");
        }
        localStorage.setItem("searchPlace", searchKey.value);
        window.open('../page/ket-qua-tim-kiem.html')
    }

    window.findFlight = function FindFlight() {
        localStorage.setItem("location_from",document.getElementById('f_location_from').value)
        localStorage.setItem("location_to",document.getElementById('f_location_to').value)
        localStorage.setItem("date_from",document.getElementById('f_date_from').value)
        localStorage.setItem("date_to",document.getElementById('f_date_to').value)
        window.open('../page/book_flights_index.html')
    }


}


//Các xử lý trong màn hình ket-qua-tim-kiem
if (document.URL.includes('ket-qua-tim-kiem'))
{
    function renderSearchResults(data, searchKeyValue, searchVietnamese){
        var codeRender = []
        var placeArray = []
        for (var i in data.data) {
            var place = {
                name: "",
                address: "",
                img: "",
                location_id: "",
                description: "",
                rating: "",
                num_reviews: "",
                keyword: "",
                type: ""
            }
            place.keyword = searchKeyValue
            var location = ""
            if (data.data[i].result_object.address != undefined) {
                location = data.data[i].result_object.address
            }
            else
            {
                for (var j in data.data[i].result_object.ancestors)
                {
                    location += `${data.data[i].result_object.ancestors[j].name}`
                    if (j<data.data[i].result_object.ancestors.length - 1)
                    location += `, `
                }
                
            }
            place.address = location
            if (i==0){
                document.querySelector(".searchResult").innerHTML += `
                <h1 style='padding: 2rem; border-bottom: 1px solid #D3D3D3'>Kết quả tìm kiếm hàng đầu cho '${searchKeyValue}'</h1>
                `
            }
            place.type = data.data[i].result_type
            place.name = data.data[i].result_object.name
            place.location_id = data.data[i].result_object.location_id
            if (place.type == 'geos')
            {
                place.description = data.data[i].result_object.geo_description
            }
            else
            {
                place.description = data.data[i].result_object.description
            }
            
            if (data.data[i].result_object.photo != undefined)
            {
                if (data.data[i].result_object.photo.images.large.url!=null)
                {
                    place.img = data.data[i].result_object.photo.images.large.url
                    if (data.data[i].result_type != 'geos')
                    {
                        var code = 
                        `<div class="boxResult" id="${data.data[i].result_object.location_id}">
                            <img src="${data.data[i].result_object.photo.images.large.url}" alt="">
                            <div class="colume">
                                <h3 onclick='viewPlace(${data.data[i].result_object.location_id})'>${data.data[i].result_object.name}</h3>
                                <div class='stars' style='font-size: 2rem; display: flex; align-items: center; margin: 1.5rem 0;'>
                                    ${getStars(Number(data.data[i].result_object.rating))}
                                    <span>${data.data[i].result_object.num_reviews} lượt đánh giá<span>
                                </div>
                                <p>${location}<p>
                            </div>
                        </div>`
                        document.querySelector(".searchResult").innerHTML += code
                        place.rating = data.data[i].result_object.rating
                        place.num_reviews = data.data[i].result_object.num_reviews
                        codeRender.push(code)
                    }
                    else
                    {
                        var code =
                        `<div class="boxResult" id="${data.data[i].result_object.location_id}">
                            <img src="${data.data[i].result_object.photo.images.large.url}" alt="">
                            <div class="colume">
                                <h3 onclick='viewPlace(${data.data[i].result_object.location_id})'>${data.data[i].result_object.name}</h3>
                                <p>${location}<p>
                            </div>
                        </div>`
                        document.querySelector(".searchResult").innerHTML += code
                        codeRender.push(code)
                    }
                    placeArray.push(place)
                    
                }
            }
            
        }
        if (placeArray.length > 0)
        {
            localStorage.setItem(`${place.keyword}`,JSON.stringify(placeArray))
        }
        localStorage.setItem('codeSearchResult', JSON.stringify(codeRender))
    }
    
    
    var count = 0
    window.onload = function() {
        document.querySelector(".searchResult").innerHTML = 
        `<div class="spinner-box" style="height: 40rem; display: flex; align-items: center; justify-content: center">
            <div class="pulse-container">  
            <div class="pulse-bubble pulse-bubble-1"></div>
            <div class="pulse-bubble pulse-bubble-2"></div>
            <div class="pulse-bubble pulse-bubble-3"></div>
            </div>
        </div>`
        document.querySelector('html').style.backgroundColor = '#D3D3D3'
        document.title = `Kết quả tìm kiếm: ${localStorage.getItem("searchPlace")}`
        
        if (count > 0)
        {
            document.querySelector(".searchResult").innerHTML = ""
            document.querySelector(".searchResult").innerHTML += 
            `<h1 style='padding: 2rem; border-bottom: 1px solid #D3D3D3'>Kết quả tìm kiếm hàng đầu cho '${localStorage.getItem("searchPlace")}'</h1>`
            var code = JSON.parse(localStorage.getItem("codeSearchResult"))
            for (var i in code) {
                document.querySelector(".searchResult").innerHTML += code[i]
            }
        }
        else if (count == 0)
        {      
            var searchKeyValue = removeVietnameseTones(localStorage.getItem("searchPlace"))
            searchKeyValue = searchKeyValue.toLowerCase()
            
            var searchVietnamese = (localStorage.getItem("searchPlace")).replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ")
            searchVietnamese = searchVietnamese.trim();
            searchVietnamese = searchVietnamese.replace(/ + /g," ");
            if (searchKeyValue == " " || searchKeyValue == "") {
                document.querySelector(".searchResult").innerHTML = `
                <div style='width:100%; height: 40rem; display:flex; align-items:center; justify-content:center'>
                    <h1 style='font-size:6rem;'>Không tìm thấy!</h1>
                </div>
                `
            }
            else
            {
                var placeArray = JSON.parse(localStorage.getItem(`${searchKeyValue}`))
                if (placeArray)
                {
                    var codeRender = []
                    var countPlace = 0
                    for (var i in placeArray)
                    {
                        if (countPlace == 0)
                        {
                            document.querySelector(".searchResult").innerHTML = ""
                            countPlace += 1
                        }
                        if (i==0){
                            document.querySelector(".searchResult").innerHTML += `
                            <h1 style='padding: 2rem; border-bottom: 1px solid #D3D3D3'>Kết quả tìm kiếm hàng đầu cho '${searchVietnamese}'</h1>
                            `
                        }
                        if (placeArray[i].type != 'geos')
                        {
                            var code = 
                            `<div class="boxResult" id="${placeArray[i].location_id}">
                                <img src="${placeArray[i].img}" alt="">
                                <div class="colume">
                                    <h3 onclick='viewPlace(${placeArray[i].location_id})'>${placeArray[i].name}</h3>
                                    <div class='stars' style='font-size: 2rem; display: flex; align-items: center; margin: 1.5rem 0;'>
                                        ${getStars(Number(placeArray[i].rating))}
                                        <span>${placeArray[i].num_reviews} lượt đánh giá<span>
                                    </div>
                                    <p>${placeArray[i].address}<p>
                                </div>
                            </div>`
                            document.querySelector(".searchResult").innerHTML += code
                            codeRender.push(code)
                        }
                        else
                        {
                            var code =
                            `<div class="boxResult" id="${placeArray[i].location_id}">
                                <img src="${placeArray[i].img}" alt="">
                                <div class="colume">
                                    <h3 onclick='viewPlace(${placeArray[i].location_id})'>${placeArray[i].name}</h3>
                                    <p>${placeArray[i].address}<p>
                                </div>
                            </div>`
                            document.querySelector(".searchResult").innerHTML += code
                            codeRender.push(code)
                        }
                    }
                    if (codeRender.length > 0) {
                        localStorage.setItem('codeSearchResult', JSON.stringify(codeRender))
                    }
                }
                else
                {
                    fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${searchKeyValue}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=vi`, options)
                    .then(response => response.json())
                    .then(response => {
                        var data = response;
                        document.querySelector(".searchResult").innerHTML = ""
                        if (data!=undefined) {
                            renderSearchResults(data,searchKeyValue,searchVietnamese)
                        }
                        if (response.data.length == 0) {
                            document.querySelector(".searchResult").innerHTML += `
                            <div style='width:100%; height: 40rem; display:flex; align-items:center; justify-content:center'>
                                <h1 style='font-size:6rem;'>Không tìm thấy!</h1>
                            </div>
                            `
                        }
                        count += 1
                    })
                    .catch(err => console.error(err))
                } 
            }
            
                
            
        }
    }

    window.onclose = function () {
        localStorage.removeItem('codeSearchResult')
        localStorage.removeItem('searchPlace')
    }
    window.Search = function Search(e) {
        
        if (e.target.className == "fas fa-search") {
            var searchKey = document.querySelector(".searchAndLogin input");
        }
        if (e.target.className == "Btn") {
            var searchKey = document.querySelector(".searchPlace input");
        }
        document.title = `Kết quả tìm kiếm: ${searchKey.value}`
        var searchKeyValue = removeVietnameseTones(searchKey.value)
        searchKeyValue = searchKeyValue.toLowerCase()

        var searchVietnamese = (searchKey.value).replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ")
        searchVietnamese = searchVietnamese.trim();
        searchVietnamese = searchVietnamese.replace(/ + /g," ");
        localStorage.setItem("searchPlace", searchKeyValue);
        document.querySelector(".searchResult").innerHTML = ""
        document.querySelector(".searchResult").innerHTML = `<div class="spinner-box" style="height: 40rem; display: flex; align-items: center; justify-content: center">
            <div class="pulse-container">  
            <div class="pulse-bubble pulse-bubble-1"></div>
            <div class="pulse-bubble pulse-bubble-2"></div>
            <div class="pulse-bubble pulse-bubble-3"></div>
            </div>
        </div>`
        if (searchKeyValue == " " || searchKeyValue == "") {
            document.querySelector(".searchResult").innerHTML = `
            <div style='width:100%; height: 40rem; display:flex; align-items:center; justify-content:center'>
                <h1 style='font-size:6rem;'>Không tìm thấy!</h1>
            </div>
            `
        }
        else
        {
            var placeArray = JSON.parse(localStorage.getItem(`${searchKeyValue}`))
            if (placeArray)
            {
                var codeRender = []
                var count = 0
                for (var i in placeArray)
                {
                    if (count == 0)
                    {
                        document.querySelector(".searchResult").innerHTML = ""
                        count += 1
                    }
                    if (i==0){
                        document.querySelector(".searchResult").innerHTML += `
                        <h1 style='padding: 2rem; border-bottom: 1px solid #D3D3D3'>Kết quả tìm kiếm hàng đầu cho '${searchVietnamese}'</h1>
                        `
                    }
                    if (placeArray[i].type != 'geos')
                    {
                        var code = 
                        `<div class="boxResult" id="${placeArray[i].location_id}">
                            <img src="${placeArray[i].img}" alt="">
                            <div class="colume">
                                <h3 onclick='viewPlace(${placeArray[i].location_id})'>${placeArray[i].name}</h3>
                                <div class='stars' style='font-size: 2rem; display: flex; align-items: center; margin: 1.5rem 0;'>
                                    ${getStars(Number(placeArray[i].rating))}
                                    <span>${placeArray[i].num_reviews} lượt đánh giá<span>
                                </div>
                                <p>${placeArray[i].address}<p>
                            </div>
                        </div>`
                        document.querySelector(".searchResult").innerHTML += code
                        codeRender.push(code)
                    }
                    else
                    {
                        var code =
                        `<div class="boxResult" id="${placeArray[i].location_id}">
                            <img src="${placeArray[i].img}" alt="">
                            <div class="colume">
                                <h3 onclick='viewPlace(${placeArray[i].location_id})'>${placeArray[i].name}</h3>
                                <p>${placeArray[i].address}<p>
                            </div>
                        </div>`
                        document.querySelector(".searchResult").innerHTML += code
                        codeRender.push(code)
                    }
                }
                if (codeRender.length > 0) {
                    localStorage.setItem('codeSearchResult', JSON.stringify(codeRender))
                }
            }
            else
            {
                fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${searchKeyValue}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=vi`, options)
                .then(response => response.json())
                .then(response => {
                    var data = response;
                    document.querySelector(".searchResult").innerHTML = ""
                    if (data!=undefined) {
                        renderSearchResults(data,searchKeyValue,searchVietnamese)
                    }
                    if (response.data.length == 0) {
                        document.querySelector(".searchResult").innerHTML += `
                        <div style='width:100%; height: 40rem; display:flex; align-items:center; justify-content:center'>
                            <h1 style='font-size:6rem;'>Không tìm thấy!</h1>
                        </div>
                        `
                    }
                    
                })
                .catch(err => console.error(err))  
            }
        
        }
        
            
    }
    window.viewPlace = function viewPlace(location_id){
        window.onclose = null
        localStorage.setItem('location_id', location_id)
        window.open('/page/xem-dia-diem.html')
    }
}



//Các xử lý trong màn hình xem-dia-diem
if (document.URL.includes('xem-dia-diem'))
{
    var isLogin = localStorage.getItem('isLogin')
    
    window.onload = function() {
        document.querySelector('.loading').innerHTML = 
        `<div class="spinner-box" style="height: 40rem; display: flex; align-items: center; justify-content: center">
            <div class="pulse-container">  
            <div class="pulse-bubble pulse-bubble-1"></div>
            <div class="pulse-bubble pulse-bubble-2"></div>
            <div class="pulse-bubble pulse-bubble-3"></div>
            </div>
        </div>`

        
        
    }

    
    var location_id = localStorage.getItem('location_id')
    // When the user clicks on <span> (x), close the modal
    window.closeModal = function closeModal()  {
        document.querySelector(".myModal").style.display = "none";
        document.querySelector("header").style.zIndex = 1000;
    }
    
    // When the user clicks on the button, open the modal
    window.showModal = function showModal() {
        document.querySelector(".myModal").style.display = "block";
        document.querySelector("header").style.zIndex = 0;
    }




    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == document.querySelector(".myModal")) {
            document.querySelector(".myModal").style.display = "none";
        }
    }

    window.showAllNearPlace = function showAllNearPlace(e) {
        var hiddenBoxes = document.querySelectorAll('.hiddenBox')
        var visibleBoxes = document.querySelectorAll('.visibleBox')
        if (hiddenBoxes.length > 0) {
            e.target.innerText = 'Ẩn bớt địa điểm'
            for (var i in hiddenBoxes)
            {
                if (hiddenBoxes[i].classList != undefined)
                {
                    hiddenBoxes[i].classList.remove('hiddenBox')
                    hiddenBoxes[i].classList.add('visibleBox')
                }
                
            }
        }
        if (visibleBoxes.length > 0) {
            e.target.innerText = 'Xem tất cả địa điểm'
            for (var i in visibleBoxes)
            {
                if (visibleBoxes[i].classList != undefined)
                {
                    visibleBoxes[i].classList.remove('visibleBox')
                    visibleBoxes[i].classList.add('hiddenBox')
                }
                
            }
        }
        
    }


    window.Search = function Search(e) {
        var searchKey = document.querySelector(".searchAndLogin input")
        localStorage.setItem("searchPlace", searchKey.value)
        window.open('/page/ket-qua-tim-kiem.html')
    }

    
    
    
    function renderImg(data) {
        if (data.data[0].images != undefined && data.data[1].images != undefined && data.data[2].images != undefined && data.data[3].images != undefined)
        {
            if (data.data[0].images.original != null && data.data[1].images.original != null && data.data[2].images.original != null && data.data[3].images.original != null)
            {
                var code = `
                <div style="display: flex; align-items: center; justify-content: center;">
                    <div style="width:fit-content; height:fit-content; position: relative;">
                        <img style="width: 75rem; height: 45rem;" class="bigImg" src="${data.data[0].images.original.url}" alt="">
                        <button class="btnModal Btn" onclick="showModal()">Xem thêm ảnh</button>
                    </div>
                    <div style="margin: 0 10px; max-width: 30rem; width=fit-content; display: flex; flex-direction: column;" class="smallImgBox">
                        <img style="width: 27rem; height: 15rem; padding: .1rem;" class="smallImg" src="${data.data[1].images.original.url}" alt="">
                        <img style="width: 27rem; height: 15rem; padding: .1rem;" class="smallImg" src="${data.data[2].images.original.url}" alt="">
                        <img style="width: 27rem; height: 15rem; padding: .1rem;" class="smallImg" src="${data.data[3].images.original.url}" alt="">
                    </div>
                </div>`
            }
        }
        
        document.querySelector('.imagePlace').innerHTML += code
        for (var i = 4; i < data.data.length; i++) {
            if (data.data[i].images.original != undefined)
            {
                
                document.querySelector('.modal-body').innerHTML += `
                <img style="width: 30rem; height: 20rem;" src="${data.data[i].images.original.url}" alt="">`
                
            }
            
        }
        var imgPlaces = []
        for (var i in data.data) {
            if (data.data[i].images.original != undefined)
            {
                var imgPlace =
                {
                    STT: i,
                    location_id: location_id,
                    url: data.data[i].images.original.url
                }
                imgPlaces.push(imgPlace)
            }
            
        }
        if (imgPlaces.length > 0)
        {
            localStorage.setItem(`imgPlace_${location_id}`, JSON.stringify(imgPlaces))
        }
    }

    function renderNearPlace(data) {
        var count = 0
        var nearPlaces = []
        for (var i in data.data)
        {
            if (data.data[i].photo != undefined)
            {
                if (count < 6)
                {
                    var code = 
                    `<div class="box">
                        <img src="${data.data[i].photo.images.original.url}" alt="">
                        <div class="content">
                            <h3>${data.data[i].name}</h3>
                            <p>${data.data[i].subcategory[0].name}</p>
                            <a class="Btn" onclick="showInfoPlace(${data.data[i].location_id})">Xem địa điểm</a>
                        </div>
                    </div>`

                    document.querySelector('.box-container').innerHTML += code
                    count += 1
                }
                else
                {
                    var code = 
                    `<div class="box hiddenBox">
                        <img src="${data.data[i].photo.images.original.url}" alt="">
                        <div class="content">
                            <h3>${data.data[i].name}</h3>
                            <p>${data.data[i].subcategory[0].name}</p>
                            <a class="Btn" onclick="showInfoPlace(Number(${data.data[i].location_id}))">Xem địa điểm</a>
                        </div>
                    </div>`

                    document.querySelector('.box-container').innerHTML += code
                }
                var nearPlace =
                {
                    location_id: location_id,
                    nearPlace_id: data.data[i].location_id,
                    name: data.data[i].name,
                    url: data.data[i].photo.images.original.url,
                    category: data.data[i].subcategory[0].name
                }

                nearPlaces.push(nearPlace)
                
            }
            
        }
        if (nearPlaces.length > 0)
        {
            localStorage.setItem(`nearPlace_${location_id}`, JSON.stringify(nearPlaces))
        }
        
    
    }



    var idImgUpload = 0
    window.uploadImage = function uploadImage(event) {
        if (event.target.files && event.target.files[0])
        {
            var reader = new FileReader();
            reader.onload = function(){
                document.querySelector('.imgUpload').innerHTML += 
                `<img id="img${idImgUpload}" height=40% width=40% style="margin: 1rem;" />`
                var output = document.getElementById(`img${idImgUpload}`);
                if (output)
                {
                    output.src = reader.result;
                    
                }
                idImgUpload += 1
            }
            reader.readAsDataURL(event.target.files[0]);
            
        }
        
    }

    window.submitReview = function submitReview() {
        document.querySelector('.writeReview .noti').innerText = ""
        var review = {
            location_id: location_id,
            user_avatar: document.querySelector('.writeReview .avatar').src||null,
            user_name: localStorage.getItem('user_email')||null,
            published_date: "",
            title: document.querySelector('.writeReview .reviewTitle').value||null,
            rating: null,
            photo: []||null,
            text: document.querySelector('.writeReview .reviewContent').value||null,
        }

        //Lấy thời gian hiện tại làm ngày đăng published_date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        review.published_date = today;

        for (let i = 5; i > 0; i--) {
            if (document.querySelector(`.writeReview .rate #star${i}`).checked == true)
            {
                review.rating = i;
                break;
            }
        }
        var photos = document.querySelectorAll(`.imgUpload img`);
        if (photos)
        {
            for (var i in photos)
            {
                if (photos[i].src)
                {
                    var url = {
                        images: {
                            medium: {
                                url: photos[i].src
                            }
                        }
                        
                    }
                    review.photo.push(url)
                }
            }
        }

        if (review.user_name != null && review.title != null && review.rating != null && review.text != null)
        {
            db.collection('reviews').add(
                {
                    location_id: review.location_id,
                    user_avatar: review.user_avatar||null,
                    user_name: review.user_name,
                    published_date: review.published_date,
                    title: review.title,
                    rating: review.rating,
                    photo: review.photo || null,
                    text: review.text,
                }
            )
            document.querySelector('.writeReview').outerHTML = 
                `<div class="box-review writeReview" style="border:2px solid #000!important;">
                    <div class="row">
                        <img class= "avatar" style="width: 50px; height: 50px;" src="${review.user_avatar}">
                        <span style="margin-left: 2rem; font-size: 1.25rem;">
                            <a class="user-review" style="font-weight: bold;">${review.user_name}</a> đã viết đánh giá vào ${review.published_date}
                        </span>
                    </div>
                    <div class="row"><h1>${review.title}</h1></div>
                    <div class="row">${getStars(review.rating)}</div>
                </div>`
                if (review.photo != null)
                {
                    document.querySelector(`.writeReview`).innerHTML +=
                    `<div class="imgReview">
                    </div>`
                    for (var j in review.photo)
                    {
                        document.querySelector(`.writeReview .imgReview`).innerHTML +=
                        `<img style="margin: 0.25rem; object-fit: cover;" height=40% width=40% src="${review.photo[j].images.medium.url}"></img>`
                    }

                }
                document.querySelector(`.writeReview`).innerHTML +=
                    `<div class="row"><p class="review-text">${review.text}</p></div>`
        }
        else
        {
            document.querySelector('.writeReview .noti').innerText = "*Vui lòng điền đầy đủ các trường!"
        }
        
    }



    window.submitUpdateReview = function submitUpdateReview(docID) {
        document.querySelector('.writeReview .noti').innerText = ""
        var review = {
            location_id: location_id,
            user_avatar: document.querySelector('.writeReview .avatar').src||null,
            user_name: localStorage.getItem('user_email')||null,
            published_date: "",
            title: document.querySelector('.writeReview .reviewTitle').value||null,
            rating: null,
            photo: []||null,
            text: document.querySelector('.writeReview .reviewContent').value||null,
        }

        //Lấy thời gian hiện tại làm ngày đăng published_date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        review.published_date = today;

        for (let i = 5; i > 0; i--) {
            if (document.querySelector(`.writeReview .rate #star${i}`).checked == true)
            {
                review.rating = i;
                break;
            }
        }
        var photos = document.querySelectorAll(`.imgUpload img`);
        if (photos)
        {
            for (var i in photos)
            {
                if (photos[i].src)
                {
                    var url = {
                        images: {
                            medium: {
                                url: photos[i].src
                            }
                        }
                        
                    }
                    review.photo.push(url)
                }
            }
        }

        if (review.user_name != null && review.title != null && review.rating != null && review.text != null)
        {
            db.collection('reviews').doc(docID).update(
                {
                    location_id: review.location_id,
                    user_avatar: review.user_avatar||null,
                    user_name: review.user_name,
                    published_date: review.published_date,
                    title: review.title,
                    rating: review.rating,
                    photo: review.photo || null,
                    text: review.text,
                }
            )
            document.querySelector('.writeReview').outerHTML = 
                `<div class="box-review writeReview" style="border:2px solid #000!important;">
                    <div class="row">
                        <img class= "avatar" style="width: 50px; height: 50px;" src="${review.user_avatar}">
                        <span style="margin-left: 2rem; font-size: 1.25rem;">
                            <a class="user-review" style="font-weight: bold;">${review.user_name}</a> đã viết đánh giá vào ${review.published_date}
                        </span>
                    </div>
                    <div class="row"><h1>${review.title}</h1></div>
                    <div class="row">${getStars(review.rating)}</div>
                </div>`
                if (review.photo != null)
                {
                    document.querySelector(`.writeReview`).innerHTML +=
                    `<div class="imgReview">
                    </div>`
                    for (var j in review.photo)
                    {
                        document.querySelector(`.writeReview .imgReview`).innerHTML +=
                        `<img style="margin: 0.25rem; object-fit: cover;" height=40% width=40% src="${review.photo[j].images.medium.url}"></img>`
                    }

                }
                document.querySelector(`.writeReview`).innerHTML +=
                    `<div class="row"><p class="review-text">${review.text}</p></div>`
        }
        else
        {
            document.querySelector('.writeReview .noti').innerText = "*Vui lòng điền đầy đủ các trường!"
        }
        
    }



    function renderReviews(data) {
        
        
        for (var i in data.data) {
            var review = {
                location_id: location_id,
                user_avatar: data.data[i].user.avatar.small.url,
                user_name: data.data[i].user.username,
                published_date: data.data[i].published_date.substring(0,10),
                title: data.data[i].title,
                rating: data.data[i].rating,
                photo: data.data[i].photos || null,
                text: data.data[i].text,
            }
            document.querySelector('.reviews').innerHTML += 
            `<div class="box-review box-${i}">
                <div class="row">
                    <img class= "avatar" src="${review.user_avatar}">
                    <span style="margin-left: 2rem; font-size: 1.25rem;">
                        <a class="user-review" style="font-weight: bold;">${review.user_name}</a> đã viết đánh giá vào ${review.published_date}
                    </span>
                </div>
                <div class="row"><h1>${review.title}</h1></div>
                <div class="row">${getStars(review.rating)}</div>
            </div>`
            if (review.photo != null)
            {
                document.querySelector(`.box-${i}`).innerHTML +=
                `<div class="imgReview">
                </div>`
                for (var j in review.photo)
                {
                    if (review.photo[j] != null)
                    {
                        if (review.photo[j].images != null)
                        {
                            document.querySelector(`.box-${i} .imgReview`).innerHTML +=
                            `<img style="margin: 0.25rem; object-fit: cover;" src="${review.photo[j].images.medium.url}"></img>`
                        }
                        
                    }
                }

            }
            document.querySelector(`.box-${i}`).innerHTML +=
                `<div class="row"><p class="review-text">${review.text}</p></div>`

        }
    }

    window.updateReview = function updateReview(oldData, docID) {
        if (oldData && docID)
        {
            document.querySelector('.writeReview').innerHTML =
                `<div class="row" style="display: flex; align-items: center;">
                    <img style="width: 50px; height: 50px;" class="avatar" src="${oldData.user_avatar}">
                    <span style="margin-left: 2rem; font-size: 1.25rem; font-weight: bold;" class="username">${oldData.user_name}</span>   
                    <div class="rate">
                        <input type="radio" id="star5" name="rate" value="5"/>
                        <label for="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4"/>
                        <label for="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3"/>
                        <label for="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2"/>
                        <label for="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1"/>
                        <label for="star1" title="text">1 star</label>
                    </div>
                    
                    
                </div>
                <div class="row" style="margin: 2rem 6rem;">
                    <label style="width: 12rem; font-size: 1.6rem;">Tiêu đề</label>
                    <input class="reviewTitle" type="text" style="height: 2.5rem; width: 60rem; font-size: 1.5rem;" placeholder="Trải nghiệm của bạn như thế nào?" value="${oldData.title}">
                </div>
                
                <div class="row" style="margin: 2rem 6rem;">
                    <label style="width: 12rem; font-size: 1.6rem;">Nội dung</label>
                    <textarea class="form-control reviewContent" rows="10" style="width:60rem; font-size: 1.4rem;" id="comment">${oldData.text}</textarea>
                </div>
                <div class="row" style="margin: 2rem 6rem;">
                    <label style="width: 12rem; font-size: 1.6rem;">Chọn ảnh</label>
                    <input type='file' onchange="uploadImage(event)"/>
                </div>
                <div class="imgUpload" style="margin: 1rem 2rem; display:flex; overflow: auto; position: relative; text-align: center; align-items: center;">
                </div>
                <div class="row" style="display: flex; justify-content: center; align-items:center; height: fit-content; margin: 0;">
                    <div class="noti" style="color: red; font-size: 1.1rem;"></div>
                </div>
                <div class="row" style="display: flex; justify-content: center; align-items:center;">
                    <button class="Btn" onclick="submitUpdateReview('${docID}')">Cập nhật</button>
                </div>`
                if (oldData.photo != null)
                {
                    for (var i in oldData.photo)
                    {
                        document.querySelector(`.writeReview .imgUpload`).innerHTML +=
                        `<img style="margin: 1rem; object-fit: cover;" height=40% width=40% src="${oldData.photo[i].images.medium.url}"></img>`
                    }

                }
        }
        
    }

    function renderInfoPlace(place) {
        document.querySelector('.title').innerHTML += 
        `<div class="box-title" style = "margin: 7rem 0 1rem 0; padding: 3rem 10rem 3rem 10rem; font-size: 2rem; border-bottom: 1px solid #333;">
            <h1 style = "font-size: 3rem;">${place.name}</h1>
        </div>`
        if (place.rating != undefined && place.num_reviews != undefined)
        {
            if (place.rating != "" && place.num_reviews != "")
            {
                document.querySelector('.box-title').innerHTML +=
                `<div class="box" style="display:flex; margin-top: 1rem; align-items: center;">
                    ${getStars(place.rating)}
                    <span style="margin-left: 2rem;">${place.num_reviews} lượt đánh giá</span> 
                <div>`
            }
            
        }
        if (place.address != "" && place.address != null)
        {
            document.querySelector('.box-title').innerHTML +=
            `<h5 style="margin-top: 1rem;">${place.address}</h5>`
        }
        
        //Xử lý hiển thị ảnh của địa điểm
        var imgPlaces = JSON.parse(localStorage.getItem(`imgPlace_${place.location_id}`))
        
        if (imgPlaces)
        {
            var arr = []
            for (var i in imgPlaces) {
                if (imgPlaces[i].location_id == place.location_id)
                {
                    arr.push(imgPlaces[i])
                }
            }

            if (arr[0] != undefined && arr[1] != undefined && arr[2] != undefined && arr[3] != undefined)
            {
                var code = `
                <div style="display: flex; align-items: center; justify-content: center;">
                    <div style="width:fit-content; height:fit-content; position: relative;">
                        <img style="width: 75rem; height: 45rem;" class="bigImg" src="${arr[0].url}" alt="">
                        <button class="btnModal Btn" onclick="showModal()">Xem thêm ảnh</button>
                    </div>
                    <div style="margin: 0 10px; max-width: 30rem; width=fit-content; display: flex; flex-direction: column;" class="smallImgBox">
                        <img style="width: 30rem; height: 15rem; padding: .1rem;" class="smallImg" src="${arr[1].url}" alt="">
                        <img style="width: 30rem; height: 15rem; padding: .1rem;" class="smallImg" src="${arr[2].url}" alt="">
                        <img style="width: 30rem; height: 15rem; padding: .1rem;" class="smallImg" src="${arr[3].url}" alt="">
                    </div>
                </div>`
                document.querySelector('.imagePlace').innerHTML += code
            }
            for (var i = 4; i<arr.length; i++) {
                document.querySelector('.modal-body').innerHTML += `
                <img style="width: 30rem; height: 20rem;" src="${arr[i].url}" alt="">`
            }
        }
        else
        {
            
            fetch(`https://travel-advisor.p.rapidapi.com/photos/list?location_id=${place.location_id}&currency=VND&limit=50&lang=vi`, options)
            .then(response => response.json())
            .then(response => {
                if (response.data != undefined)
                {
                    renderImg(response)
                }
            })
            .catch(err => console.error(err));
        }
        
        //Phần giới thiệu của địa điểm
        if (place.description != null)
        {
            document.querySelector('.description').innerHTML =
            `<h1 style = "margin: 3rem 30rem 3rem 10rem; padding:2rem; font-size: 2.5rem; border-bottom: 1px solid #333">Giới thiệu</h1>
            <p style="margin: 0 30rem 1rem 10rem; font-size: 2rem; text-align: justify">${place.description}<p>
            `
        }
        
        if (place.type != undefined) {
            //Nếu địa điểm là vị trí địa lý (tỉnh thành) thì hiển thị phần địa điểm tham quan. Nếu không phải thì hiển thị các bài đánh giá
            if (place.type == "geos")
            {
                document.querySelector('.content').innerHTML +=
                `<div class="nearPlace"></div>`
                
                document.querySelector('.nearPlace').innerHTML += 
                `<div class="title" style = "margin: 3rem 30rem 3rem 10rem; padding:2rem; border-bottom: 1px solid #333; display:flex; align-items: center; justify-content: space-between;">
                    <h1 style="font-size: 2.5rem;">Các địa điểm tham quan</h1>
                    <button class = "Btn" style="font-size: 1.5rem;" onclick="showAllNearPlace(event)">Xem tất cả địa điểm</button>
                </div>  
                <div class="box-container"></div>`
                var nearPlaces = JSON.parse(localStorage.getItem(`nearPlace_${place.location_id}`))
        
                if (nearPlaces)
                {
                    var arr = []
                    for (var i in nearPlaces) {
                        if (nearPlaces[i].location_id == place.location_id)
                        {
                            arr.push(nearPlaces[i])
                        }
                    }
                    document.querySelector('.loading').innerHTML = ""
                    let count = 0
                    for (var i in arr)
                    {
                        if (arr[i].url != undefined)
                        {
                            if (count < 6)
                            {
                                var code = 
                                `<div class="box">
                                    <img src="${arr[i].url}" alt="">
                                    <div class="content">
                                        <h3>${arr[i].name}</h3>
                                        <p>${arr[i].category}</p>
                                        <a class="Btn" onclick="showInfoPlace(${arr[i].nearPlace_id})">Xem địa điểm</a>
                                    </div>
                                </div>`
    
                                document.querySelector('.box-container').innerHTML += code
                                count += 1
                            }
                            else
                            {
                                var code = 
                                `<div class="box hiddenBox">
                                    <img src="${arr[i].url}" alt="">
                                    <div class="content">
                                        <h3>${arr[i].name}</h3>
                                        <p>${arr[i].category}</p>
                                        <a class="Btn" onclick="showInfoPlace(${arr[i].nearPlace_id})">Xem địa điểm</a>
                                    </div>
                                </div>`
    
                                document.querySelector('.box-container').innerHTML += code
                            }
                            
                        }
                        
                    }
                }    
                else
                {
                    fetch(`https://travel-advisor.p.rapidapi.com/attractions/list?location_id=${place.location_id}&currency=VND&lang=vi&lunit=km&sort=recommended`, options)
                    .then(response => response.json())
                    .then(response => {
                        document.querySelector('.loading').innerHTML = ""
                        if (response.data != undefined)
                            renderNearPlace(response)
                    })
                    .catch(err => console.error(err));
                }
                    
            }
            else if (place.type != 'geos')
            {
                document.querySelector('.content').innerHTML += 
                `<div class="reviews">
                    <h1 style = "margin: 3rem 30rem 3rem 10rem; padding:2rem; font-size: 2.5rem; border-bottom: 1px solid #333">Đánh giá</h1>
                </div>`
                
                document.querySelector('.loading').innerHTML = ""
                var ratingBefore = false;
                if (localStorage.getItem('user_email') && localStorage.getItem('isLogin') == 'true')
                {
                    db.collection('reviews').where('user_name','==',`${localStorage.getItem('user_email')}`).get().then((snapshot) => {
                        snapshot.docs.forEach(doc => {
                            if (doc.data().user_name == localStorage.getItem('user_email') && doc.data().location_id == place.location_id)
                            {
                                var oldData = {
                                    user_avatar: doc.data().user_avatar,
                                    user_name: doc.data().user_name,
                                    title: doc.data().title,
                                    rating: doc.data().rating,
                                    photo: doc.data().photo,
                                    text: doc.data().text
                                }
                                ratingBefore = true
                                document.querySelector('.reviews').innerHTML += 
                                `<div class="box-review writeReview" style="border:2px solid #000!important;">
                                    <div class="row" style="justify-content: space-between; display: flex; align-items: center;">
                                        <div style="display: flex; align-items: center;">
                                            <img class= "avatar" style="width: 50px; height: 50px;" src="${doc.data().user_avatar}">
                                            <span style="margin-left: 2rem; font-size: 1.25rem;">
                                                <a class="user-review" style="font-weight: bold;">${doc.data().user_name}</a> đã viết đánh giá vào ${doc.data().published_date}
                                            </span>
                                        </div>
                                        <div>
                                            <button class="Btn" onclick='updateReview(${JSON.stringify(oldData)}, ${JSON.stringify(doc.id)})'>Chỉnh sửa</button>
                                        </div>
                                    </div>
                                    
                                    <div class="row"><h1>${doc.data().title}</h1></div>
                                    <div class="row">${getStars(doc.data().rating)}</div>
                                </div>`
                                
                                
                                if (doc.data().photo != null)
                                {
                                    document.querySelector(`.writeReview`).innerHTML +=
                                    `<div class="imgReview">
                                    </div>`
                                    for (var j in doc.data().photo)
                                    {
                                        document.querySelector(`.writeReview .imgReview`).innerHTML +=
                                        `<img style="margin: 0.25rem; object-fit: cover;" height=40% width=40% src="${doc.data().photo[j].images.medium.url}"></img>`
                                    }
            
                                }
                                document.querySelector(`.writeReview`).innerHTML +=
                                    `<div class="row"><p class="review-text">${doc.data().text}</p></div>`
                                
                            }
                            
                        })

                        if (isLogin == 'true')
                        {
                            var user_info =
                            {
                                avatar: localStorage.getItem('user_avatar')||null,
                                email: localStorage.getItem('user_email')||null
                            }

                            if (user_info.email!=null && ratingBefore == false)
                            {
                                document.querySelector('.reviews').innerHTML += 
                                `<div class="writeReview">
                                    <div class="row" style="display: flex; align-items: center;">
                                        <img style="width: 50px; height: 50px;" class="avatar" src="${user_info.avatar}">
                                        <span style="margin-left: 2rem; font-size: 1.25rem; font-weight: bold;" class="username">${user_info.email}</span>   
                                        <div class="rate">
                                            <input type="radio" id="star5" name="rate" value="5"/>
                                            <label for="star5" title="text">5 stars</label>
                                            <input type="radio" id="star4" name="rate" value="4"/>
                                            <label for="star4" title="text">4 stars</label>
                                            <input type="radio" id="star3" name="rate" value="3"/>
                                            <label for="star3" title="text">3 stars</label>
                                            <input type="radio" id="star2" name="rate" value="2"/>
                                            <label for="star2" title="text">2 stars</label>
                                            <input type="radio" id="star1" name="rate" value="1"/>
                                            <label for="star1" title="text">1 star</label>
                                        </div>
                                        
                                        
                                    </div>
                                    <div class="row" style="margin: 2rem 6rem;">
                                        <label style="width: 12rem; font-size: 1.6rem;">Tiêu đề</label>
                                        <input class="reviewTitle" type="text" style="height: 2.5rem; width: 60rem; font-size: 1.5rem;" placeholder="Trải nghiệm của bạn như thế nào?">
                                    </div>
                                    
                                    <div class="row" style="margin: 2rem 6rem;">
                                        <label style="width: 12rem; font-size: 1.6rem;">Nội dung</label>
                                        <textarea class="form-control reviewContent" rows="10" style="width:60rem; font-size: 1.4rem;" id="comment"></textarea>
                                    </div>
                                    <div class="row" style="margin: 2rem 6rem;">
                                        <label style="width: 12rem; font-size: 1.6rem;">Chọn ảnh</label>
                                        <input type='file' onchange="uploadImage(event)"/>
                                    </div>
                                    <div class="imgUpload" style="margin: 1rem 2rem; display:flex; overflow: auto; position: relative; text-align: center; align-items: center;">
                                    </div>
                                    <div class="row" style="display: flex; justify-content: center; align-items:center; height: fit-content; margin: 0;">
                                        <div class="noti" style="color: red; font-size: 1.1rem;"></div>
                                    </div>
                                    <div class="row" style="display: flex; justify-content: center; align-items:center;">
                                        <button class="Btn" onclick="submitReview()">Đăng</button>
                                    </div>
                                    
                                </div>`
                            }    
                        }


                        db.collection('reviews').where('location_id', '==', `${place.location_id}`).get().then((snapshot) => {
                            var i = 0;
                            snapshot.docs.forEach(doc => {
                                var check = false
                                if (localStorage.getItem('user_email'))
                                {
                                    if (doc.data().user_name == localStorage.getItem('user_email'))
                                        check = true
                                }
                                if (check == false)
                                {
                                    document.querySelector('.reviews').innerHTML += 
                                    `<div class="box-review boxFirebase-${i}">
                                        <div class="row">
                                            <img class= "avatar" style="width: 50px; height: 50px;" src="${doc.data().user_avatar}">
                                            <span style="margin-left: 2rem; font-size: 1.25rem;">
                                                <a class="user-review" style="font-weight: bold;">${doc.data().user_name}</a> đã viết đánh giá vào ${doc.data().published_date}
                                            </span>
                                        </div>
                                        <div class="row"><h1>${doc.data().title}</h1></div>
                                        <div class="row">${getStars(doc.data().rating)}</div>
                                    </div>`
                                    if (doc.data().photo != null)
                                    {
                                        document.querySelector(`.boxFirebase-${i}`).innerHTML +=
                                        `<div class="imgReview">
                                        </div>`
                                        for (var j in doc.data().photo)
                                        {
                                            document.querySelector(`.boxFirebase-${i} .imgReview`).innerHTML +=
                                            `<img style="margin: 0.25rem; object-fit: cover;" height=40% width=40%  src="${doc.data().photo[j].images.medium.url}"></img>`
                                        }
        
                                    }
                                    document.querySelector(`.boxFirebase-${i}`).innerHTML +=
                                        `<div class="row"><p class="review-text">${doc.data().text}</p></div>`
                                    i += 1;
                                }
                                
                            })
                        })
                        
                        fetch(`https://travel-advisor.p.rapidapi.com/reviews/list?location_id=${place.location_id}&limit=20&currency=VND&lang=vi`, options)
                        .then(response => response.json())
                        .then(response => {
                            if (response.data != undefined)
                                renderReviews(response)
                        })
                        .catch(err => console.error(err));
                        


                    })
    
                }
                else if (localStorage.getItem('isLogin') == 'false')
                {
                    document.querySelector('.reviews').innerHTML += 
                    `<div class="writeReview" style="text-align: center;">
                        <h1>
                            <a style= "text-decoration: underline;"onclick="openAccountPage()">Đăng nhập</a>
                            <span> để viết đánh giá!</span>
                        </h1>
                    </div>`
                    db.collection('reviews').where('location_id', '==', `${place.location_id}`).get().then((snapshot) => {
                        var i = 0;
                        snapshot.docs.forEach(doc => {
                            document.querySelector('.reviews').innerHTML += 
                            `<div class="box-review boxFirebase-${i}">
                                <div class="row">
                                    <img class= "avatar" style="width: 50px; height: 50px;" src="${doc.data().user_avatar}">
                                    <span style="margin-left: 2rem; font-size: 1.25rem;">
                                        <a class="user-review" style="font-weight: bold;">${doc.data().user_name}</a> đã viết đánh giá vào ${doc.data().published_date}
                                    </span>
                                </div>
                                <div class="row"><h1>${doc.data().title}</h1></div>
                                <div class="row">${getStars(doc.data().rating)}</div>
                            </div>`
                            if (doc.data().photo != null)
                            {
                                document.querySelector(`.boxFirebase-${i}`).innerHTML +=
                                `<div class="imgReview">
                                </div>`
                                for (var j in doc.data().photo)
                                {
                                    document.querySelector(`.boxFirebase-${i} .imgReview`).innerHTML +=
                                    `<img style="margin: 0.25rem; object-fit: cover;" height=40% width=40% src="${doc.data().photo[j].images.medium.url}"></img>`
                                }

                            }
                            document.querySelector(`.boxFirebase-${i}`).innerHTML +=
                                `<div class="row"><p class="review-text">${doc.data().text}</p></div>`
                            i += 1;
                            
                        })
                    })
                    
                    fetch(`https://travel-advisor.p.rapidapi.com/reviews/list?location_id=${place.location_id}&limit=20&currency=VND&lang=vi`, options)
                    .then(response => response.json())
                    .then(response => {
                        if (response.data != undefined)
                            renderReviews(response)
                    })
                    .catch(err => console.error(err));
                }
                

            }
        }
        
    }


    var place = {
        name: "",
        location_id: location_id,
        description: "",
        type: "",
        rating: "",
        num_reviews: "",
        address: ""
    }
    fetch(`https://travel-advisor.p.rapidapi.com/attractions/get-details?location_id=${place.location_id}&currency=VND&lang=vi`, options)
    .then(response => response.json())
    .then(response => {
        place.name = response.name
        if (response.rating == undefined)
            place.type = 'geos'
        if (response.rating != undefined)
        {
            place.rating = response.rating  
        }
        if (response.num_reviews != undefined)
        {
            place.num_reviews = response.num_reviews
        }
        if (response.description != "")
        {
            place.description = response.description
        }
        else
        {
            place.description = null
        }
        if (response.location_string != "")
        {
            place.address = response.location_string
        }
        if (place.name != "")
        {
            renderInfoPlace(place)
        }
    })
    .catch(err => console.error(err));
    
    
    
    
}





















