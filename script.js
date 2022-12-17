

if (document.URL.includes("home.html"))
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



    // Tabs


    function openTab(evt, cityName) {
        var tabActive = document.querySelector(".tablinks.tabActive");
        var tabActiveContent = document.querySelector(".tabcontent.tabActive");
        tabActive.classList.remove("tabActive");
        tabActiveContent.classList.remove("tabActive");
        document.getElementById(cityName).classList.add("tabActive");
        evt.currentTarget.classList.add("tabActive");
    }



    function Search(e) {
        
        if (e.target.className == "fas fa-search") {
            var searchKey = document.querySelector(".searchAndLogin input");
        }
        if (e.target.className == "Btn") {
            var searchKey = document.querySelector("#Place input");
        }
        if (document.querySelector('#home').style.display == 'none')
        {
            var searchKey = document.querySelector(".searchPlace input");
        }
        localStorage.setItem("searchPlace", searchKey.value);
        console.log(localStorage.getItem("searchPlace"))
        window.open('ket-qua-tim-kiem.html')
        

    }
}

if (document.URL.includes('ket-qua-tim-kiem'))
{
    window.onload = function() {
        document.title = `Kết quả tìm kiếm: ${localStorage.getItem("searchPlace")}`
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '03ef942414mshcf6dc6c26068fc8p1f8c66jsnf8ef83dc260f',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };
        var searchKeyValue = localStorage.getItem("searchPlace")
        fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${searchKeyValue}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                var data = response;
                if (data!=undefined) {                
                    var searchBar = document.querySelectorAll(".search-bar")
                    for (var i in searchBar) {
                        searchBar[i].value = searchKeyValue
                    }
                    for (i in data.data) {
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
                        
                        if (data.data[i].result_object.photo != undefined)
                        {
                            if (data.data[i].result_object.photo.images.large.url!=null)
                            {
                                document.querySelector(".searchResult").innerHTML += `
                                <div class="boxResult">
                                    <img src="${data.data[i].result_object.photo.images.large.url}" alt="">
                                    <div class="colume">
                                        <h3>${data.data[i].result_object.name}</h3>
                                        <p>${location}<p>
                                    </div>
                                </div>`
                            }
                        }
                    }
                }
                
            })
            .catch(err => console.error(err));
    }
    function Search(e) {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '03ef942414mshcf6dc6c26068fc8p1f8c66jsnf8ef83dc260f',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };
        if (e.target.className == "fas fa-search") {
            var searchKey = document.querySelector(".searchAndLogin input");
        }
        if (e.target.className == "Btn") {
            var searchKey = document.querySelector(".searchPlace input");
        }
        localStorage.setItem("searchPlace", searchKey.value);
        fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${searchKey.value}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`, options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                document.querySelector(".searchResult").innerHTML = ""
                var data = response;
                if (data!=undefined) {                
                    var searchBar = document.querySelectorAll(".search-bar")
                    for (var i in searchBar) {
                        searchBar[i].value = searchKey.value
                    }
                    for (i in data.data) {
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
                        if (data.data[i].result_object.photo != undefined)
                        {
                            if (data.data[i].result_object.photo.images.large.url!=null)
                            {
                                document.querySelector(".searchResult").innerHTML += `
                                <div class="boxResult">
                                    <img src="${data.data[i].result_object.photo.images.large.url}" alt="">
                                    <div class="colume">
                                        <h3>${data.data[i].result_object.name}</h3>
                                        <p>${location}<p>
                                    </div>
                                </div>`
                            }
                        }
                    }
                }
                
            })
            .catch(err => console.error(err));
        

    }
}




















