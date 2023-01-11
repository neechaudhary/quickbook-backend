
 window.addEventListener('load', () => {
    get_journal();

 });

 function add_jrnl(){
    const jrnl_date = document.getElementById("jrnl_date").value;
    const jrnl_from = document.getElementById("jrnl_from").value;
    const jrnl_to = document.getElementById("jrnl_to").value;
    const jrnl_lf = document.getElementById("jrnl_lf").value;
    const jrnl_debit = document.getElementById("jrnl_debit").value;
    const jrnl_credit = document.getElementById("jrnl_credit").value;
    const jrnl_narration = document.getElementById("jrnl_narration").value;
    console.log(jrnl_date);

    axios.post('http://localhost:3000/api/journal', {
        date: jrnl_date,
        from: jrnl_from,
        to: jrnl_to,
        debit: jrnl_debit,
        credit: jrnl_credit,
        narration: jrnl_narration
 }).then(function (response) {
        console.log(response);
        const jrnl_date = document.getElementById("jrnl_date").value;
    const jrnl_from = document.getElementById("jrnl_from").value;
    const jrnl_to = document.getElementById("jrnl_to").value;
    const jrnl_lf = document.getElementById("jrnl_lf").value;
    const jrnl_debit = document.getElementById("jrnl_debit").value;
    const jrnl_credit = document.getElementById("jrnl_credit").value;
    const jrnl_narration = document.getElementById("jrnl_narration").value;
    
    if(jrnl_date== '' || 
    jrnl_from=='' ||
    jrnl_to== ''||
    jrnl_credit== ''||
    jrnl_debit=='' ||
    jrnl_narration== '')
    
    {
        alert ("please fill all the fields")
    }
    else{
        alert("customer has been added successfully")
    }
        get_journal();
    }).catch(function (error) { 
        console.log(error)
    })
 }



function get_journal(){
    axios.get('http://localhost:3000/api/journal')
    .then(function(response){
        // console.log(response);
        var journal_head=`  <thead class="jrnl_heading">
        <tr>
            <th style="width: 19%;">Date</th>
            <th style="width: 36%;">Particular</th>
            <th style="width: 7%;">L.F</th>
            <th style="width: 19%;">Debit</th>
            <th style="width: 19%;">Credit</th>
        </tr>

    </thead>`;
        response.data.journals.forEach(function(data){
                // console.log(data);
                journal_head+= `
                <tr class="jrnl_debit_input" id="${data._id}" >
                <td><input style="width: 100%; text-align: center;" type="text" name="" id="" placeholder="Date" value="${data.date}" readonly /></td>
                <td><input style="width: 100%;" type="text" name="" id="" placeholder="From" value="${data.from}" readonly/></td>
                <td><input style="width: 100%;" type="text" name="" id="" readonly></td>
                <td><input style="width: 100%; text-align:center;" type="number" name="" id="" placeholder="Debit" value="${data.debit}" readonly></td>
                <td><input style="width: 100%;" type="text" name="" id="" disabled readonly></td>
            </tr>

            <tr class="jrnl_debit_input" >
                <td><input style="width: 100%;" type="text" name="" id="" disabled readonly></td>
                <td><input style="width: 100%;" type="text" name="" id="" placeholder="To" value="${data.to}" readonly></td>
                <td><input style="width: 100%;" type="text" name="" id="" readonly></td>
                <td><input style="width: 100%;" type="number" name="" id="" disabled readonly></td>
                <td><input style="width: 100%; text-align:center;" type="text" name="" id=""  placeholder="Credit" value="${data.credit}" readonly></td>
            </tr>
            <tr class="narration">
                <td colspan="5"><input style="width: 100%;" type="text" placeholder="Narration:" value="${data.narration}" readonly></td>
            </tr>
             `
        })
        var journal_body = document.getElementById("journal_body");
        // console.log(journal_head);
        journal_body.innerHTML = journal_head;
        }).catch(function(error){
            console.log(error)
    });
}

//add journal entry
function show_journal_entry(){
if (document.getElementById("add_journal_entry").style.display = "block")
  {
    document.getElementById("create_jrnl_btn").innerText = "Close";
    document.getElementById("create_jrnl_btn").style.backgroundColor = "red";
  }
     
}

//close show journal entry
 const close_show_jrnl = document.getElementById("close_show_jrnl");
 close_show_jrnl.addEventListener('click', () => {
    document.getElementById("add_journal_entry").style.display = "none";
    document.getElementById("create_jrnl_btn").innerText = "Create";
    document.getElementById("create_jrnl_btn").style.backgroundColor = "#01B775";
 });