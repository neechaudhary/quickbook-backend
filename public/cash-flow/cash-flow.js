
 window.addEventListener('load', () => {
    get_cash_flow();

 });

function get_cash_flow(){
    axios.get('http://localhost:3000/api/cash_flow')
    .then(function(response){
        console.log(response);
        var cash_flow_header= ' <div class="cf_row"><div>Opening Cash Balance</div>';
    
    response.data.forEach(element => {
            // console.log(element);
            cash_flow_header +=`
            <div>${element.cash_balance.opening_balance}</div>
            
            `
        });
        cash_flow_header += '</div>';
        var get_cash_flow_id= document.getElementById('cf_row');
        get_cash_flow_id.innerHTML = cash_flow_header ;
    }).catch(function(error){
        console.log(error);
    });
}