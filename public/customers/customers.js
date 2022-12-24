


var add_customer = document.getElementById("add_customer_btn");
add_customer.addEventListener('click', (event) => {
            // event.preventDefault();

            var cust_code= document.getElementById("cust_code");
            var cust_name= document.getElementById("cust_name").value;
            var telephone= document.getElementById("telephone").value;
            var address= document.getElementById("address").value;
            var city= document.getElementById("city").value;

            axios.post('http://localhost:3000/api/customer/', {
                cust_code: cust_code,
                cust_name: cust_name,
                telephone: telephone,
                address:address,
                city:city

            }).then(function (response) {
                console.log(response);

            }).catch(function (error) {
                console.log(error)
            })
});

     function show_add(){
        if(document.getElementById("add_customer_body").style.display == "block"){
            document.getElementById("add_customer_body").style.display = "none";
            document.getElementById("add_customer").innerText = "Add";
            
        }
        else{
            document.getElementById("add_customer_body").style.display = "block";
            document.getElementById("add_customer").style.backgroundColor = "red";
            document.getElementById("add_customer").innerText = "Close";
        }
        

        // document.getElementById("add_customer_btn").style.display = "none";
} 
     function close_add(){
        var cust_name= document.getElementById("cust_name").value;
        var telephone= document.getElementById("telephone").value;
        var address= document.getElementById("address").value;
        var city= document.getElementById("city").value;
        if(cust_name== '' || 
            telephone=='' ||
            address== ''||
            city=='')
            {
                alert ("please fill all the fields")
            }
            else{
                alert("customer has been added successfully")
        document.getElementById('add_customer_body').style.display= "none";
        document.getElementById("add_customer").innerText = "Add";
        
        document.getElementById("add_customer").style.backgroundColor = "#6ca313";
            }

            

        
}
     function get_customer(){
        axios.get('http://localhost:3000/api/customer/get-customer')
        .then(function(response){
            console.log(response);
            var store_details= `<li>
            <div class="customer_header" >
                <div>Customer code</div>
                <div>Customer Name</div>
                <div>Telephone</div>
                <div>Address</div>
                <div>City</div>
            </div>
        </li>`;
            response.data.customers.forEach(function(data)  {
                store_details += `
                <li>
                <div class="customer_details" onclick="edit_customer(this)" id="${data._id}" >
                <div  id="div_code">${data.cust_code}</div>
                <div id="div_name_${data._id}">${data.cust_name}</div>
                <div id="div_telephone_${data._id}">${data.telephone}</div>
                <div id="div_address_${data._id}">${data.address}</div>
                <div id="div_city_${data._id}">${data.city}</div>
                <span onclick="delete_customer()"><i class="fa-solid fa-trash"></i></span>
                
                <div id="_id"></div>
                </li>

               `;
            })
            var get_customer_divid= document.getElementById('get_customer_divid')
            console.log(store_details)
            get_customer_divid.innerHTML=store_details
        }).catch(function(error){
            console.log(error);
        })
}

//get record in input fields when click on edit button
function edit_customer($obj){

    var id = $obj.getAttribute('id');
    
        document.getElementById("add_customer_body").style.display = "block";
        document.getElementById("add_customer").style.backgroundColor = "red";
        document.getElementById("add_customer").innerText = "Close";

    // console.log(id);
    // var cust_code= document.getElementById("cust_code").innerHTML;
    var div_cust_name= document.getElementById("div_name_"+id).innerText;
    var div_telephone= document.getElementById("div_telephone_"+id).innerText;
    var div_address= document.getElementById("div_address_"+id).innerText;
    var div_city= document.getElementById("div_city_"+id).innerText;
    // console.log(div_cust_name);

        document.getElementById("cust_name").value= div_cust_name;
        document.getElementById("telephone").value=div_telephone;
        document.getElementById("address").value=div_address;
        document.getElementById("city").value=div_city;
        document.getElementById("_id").value=id;  // this id will be used in update function
}

//update customers in frontend
function update_customer(){
    var cust_name= document.getElementById("cust_name").value;
    var telephone= document.getElementById("telephone").value;
    var address= document.getElementById("address").value;
    var city= document.getElementById("city").value;
    let id= document.getElementById('_id').value;
    
    axios.put('http://localhost:3000/api/customer/'+id,{
        
        cust_name: cust_name,
        telephone: telephone,
        address:address,
        city:city
    }).then(function(response){
        console.log(response);
        alert("customer has been updated successfully")
        get_customer();//get cudtomer after update
    })
}

//delete a customer
function delete_customer(){
 
    //get details inside input feilds
    let id= document.getElementById('_id').value;


    axios.delete('http://localhost:3000/api/customer/'+id)
    .then(function(response){
        console.log(response);
        alert("customer has been deleted successfully")
        get_customer();//get cudtomer after update
    }).catch(function(error){
        console.log(error);
    })
   
}