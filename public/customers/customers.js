

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
     