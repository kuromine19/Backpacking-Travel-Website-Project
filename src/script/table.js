
function booking(){

    var row = bookBtn.parent();
    var book_content=document.getElementById('carrier-book')
    cnt.innerHTML=row.code_name
    book_content.appendChild(cnt)
// Outputs the answer


}

function addNoneToTable(){
    var tbody=document.getElementById('data-flights');
    let trow=document.createElement("tr");
    let td=document.createElement('div')
    td.innerHTML='Không tồn tại chuyến bay'
    td.id='none-flight'
    trow.appendChild(td)
    tbody.appendChild(trow)
}


function addItemToTable(name,code_name,f_time_from,
                        f_date_from,f_time_to,f_date_to,
                        f_price,fees,total_price,from,to,type){
    
    var tbody=document.getElementById('data-flights');
    
    let trow=document.createElement("tr");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    let td4=document.createElement("td");
    let td5=document.createElement("td");
    let td6=document.createElement("td");
    let td7=document.createElement("td");
    let td8=document.createElement("td");
    let td9=document.createElement("td");
    let td10=document.createElement("td");
    const td11=document.createElement("button");
    // let td12=document.createElement("td");
    td11.type = "button";
    td11.onclick = function(){
        document.getElementById('book-detail').style='display:block'
        document.getElementById('carrier-book').innerHTML= this.parentElement.childNodes[0].innerHTML;
        document.getElementById('code-carrier').innerHTML= this.parentElement.childNodes[1].innerHTML;
        document.getElementById('from-elm').innerHTML= this.parentElement.childNodes[7].innerHTML;
        document.getElementById('time-from-elm').innerHTML= this.parentElement.childNodes[2].innerHTML;
        document.getElementById('time-to-elm').innerHTML= this.parentElement.childNodes[3].innerHTML;
        
        document.getElementById('to-elm').innerHTML= this.parentElement.childNodes[8].innerHTML;
        var price=this.parentElement.childNodes[6].innerHTML
        document.getElementById('confirm').onclick=function(){
            document.getElementById('total-price-elm').innerHTML=parseFloat(price)*
                                                                (document.getElementById('adult-ticket').value+
                                                                0.5*document.getElementById('children-ticket').value);
            document.getElementById('total').style='display:flex'
            document.getElementById('payment').style='display:flex'
            // document.getElementById('payment').click();
                
            }
            
        

    };

    // document.getElementById('total-price-elm').innerHTML= this.parentElement.childNodes[6].value*
    //                                                             document.getElementById('adult-ticket').value;
    td11.class="bookBtn";
              
    td1.innerHTML=name;
    td2.innerHTML=code_name;
    td3.innerHTML=f_time_from+' '+f_date_from;
    td4.innerHTML=f_time_to+' '+f_date_to;
    td5.innerHTML=f_price;
    td6.innerHTML=fees;
    td7.innerHTML=total_price;
    td7.value=total_price;
    td8.innerHTML=from;
    td9.innerHTML=to;
    td10.innerHTML=type;
    td11.innerHTML= "Đặt ngay"
    

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    trow.appendChild(td8);
    trow.appendChild(td9);
    trow.appendChild(td10);
    trow.appendChild(td11);

    tbody.appendChild(trow);

}

const search = document.querySelector(".searchBtn");


search.addEventListener("click", () => {
    

    var table=document.getElementById("flight-detail")
    while(table.rows.length > 0) {
        table.deleteRow(0);
    }
    var thead=document.getElementById('name-column-table');
    
    let trow=document.createElement("tr");
    let th1=document.createElement("th");
    let th2=document.createElement("th");
    let th3=document.createElement("th");
    let th4=document.createElement("th");
    let th5=document.createElement("th");
    let th6=document.createElement("th");
    let th7=document.createElement("th");
    let th8=document.createElement("th");
    let th9=document.createElement("th");
    let th10=document.createElement("th");
    let th11=document.createElement("th");
    // let td12=document.createElement("td");

    th1.innerHTML='Hãng';
    th2.innerHTML='Mã';
    th3.innerHTML='Thời gian khởi hành';
    th4.innerHTML='Thời gian đến';
    th5.innerHTML='Thuế';
    th6.innerHTML='Giá vé';
    th7.innerHTML='Thành tiền';
    th8.innerHTML='Từ';
    th9.innerHTML='Đến';
    th10.innerHTML='Ghế';
    th11.innerHTML='Đặt vé';

    trow.appendChild(th1);
    trow.appendChild(th2);
    trow.appendChild(th3);
    trow.appendChild(th4);
    trow.appendChild(th5);
    trow.appendChild(th6);
    trow.appendChild(th7);
    trow.appendChild(th8);
    trow.appendChild(th9);
    trow.appendChild(th10);
    trow.appendChild(th11);

    thead.appendChild(trow);



    var location_from = document.getElementById('f_location_from').value;
    var location_to=document.getElementById('f_location_to').value;
    var date_from=document.getElementById('f_date_from').value
    // var date_to=document.getElementById('f_date_to').value
    var newdate_from = date_from.split("-").reverse().join("/")
    // var newdate_to = date_to.split("-").reverse().join("/")
    var check=0
    fetch("../dataset/flights.json")
    .then(function(response){
        return response.json();
    })
    .then(function(flights){
        var i=0

        if(flights.length===0){
            let trow_none=document.createElement('tr')
            trow_none.innerHTML='Empty'
            thead.appendChild(trow_none)
        }
        else {for(let flight of flights){
        if(flight.from.toUpperCase()==location_from.toUpperCase()&&
            flight.to.toUpperCase()==location_to.toUpperCase()&&
            newdate_from==flight.f_date_from){
            i+=1
            check=1
            document.getElementById('none-flight').style='display:none'

            addItemToTable(flight.code_name,flight.code,flight.f_date_from,
                        flight.f_time_from,flight.f_date_to,flight.f_time_to,
                        flight.f_price,flight.fees,flight.total_price,
                        flight.from,flight.to,flight.type)
        }
        document.getElementById('flight-title').style='display:block'
        document.getElementById('total').style='display:none'
        document.getElementById('payment').style='display:none'
        document.getElementById('body').style='height:20rem'
        if(i==20)break

        

    }
    }
    
    })
    if(check==0){
        addNoneToTable()
        document.getElementById('none-flight').style='display:inline-block'
        // document.getElementById('data-flights').style='display:none'

    }
    
    
});

window.onload = function(){
    if (localStorage.getItem("location_from"))
        document.getElementById('f_location_from').value = localStorage.getItem("location_from")
    if (localStorage.getItem("location_to"))
        document.getElementById('f_location_to').value = localStorage.getItem("location_to")
    if (localStorage.getItem("date_from"))
        document.getElementById('f_date_from').value = localStorage.getItem("date_from")
    if (localStorage.getItem("date_to"))
        document.getElementById('f_date_to').value = localStorage.getItem("date_to")
    if (localStorage.getItem("location_from") && localStorage.getItem("location_to") && localStorage.getItem("date_from"))
        document.querySelector(".searchBtn").click()
}