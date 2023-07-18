

// * -------------------(log out)------------------
function logOut() {
    outData("userLogin")
}

const orderHistory = getDataFromLocal("orderHistory")


//todo ----------------------(render board)----------------
function renderOrderAdmind(key){
    const render = document.querySelector("tbody");
    let xhtml ="";
    let count = 0;
    key.forEach((item, id,) => {
        const deliveredClass = item.isActive === "delivered" ? "hidden" : "";
        const cancelClass = item.isActive === "cancelled" ? "hidden" : "";
        const cartNames = item.cart.map((cart) => cart.name).join(" , ");
        count++;
        xhtml +=`
        <tr >
              <td>${count}</td>
              <td>${item.date}</td>
              <td>${item.code}</td>
              <td>${item.email}</td>
              <td>${cartNames}</td>
              <td>${item.totalProduct}</td>
              <td>${(item.total).toLocaleString()} VND</td>
              <td>${item.isActive}</td>
              <td>
                <button class="done ${deliveredClass}" onclick="activeOrder(${id},'delivered')" 
                style="background-color: ${item.isActive === 'delivered' ? '#33FF33' : ''}; 
                display: ${item.isActive === 'cancelled' ? 'none' : 'inline-block'}"; 
                >delivered</button>

                <button class="cancel ${cancelClass}" onclick="activeOrder(${id},'cancel')" 
                style="background-color: ${item.isActive === 'cancelled' ? '#FF0000' : ''};
                display: ${item.isActive === 'delivered' ? 'none' : 'inline-block'}"; 
                >cancel</button>
              </td>
        </tr>
        `
    });
    render.innerHTML = xhtml;
}
renderOrderAdmind(orderHistory);



function activeOrder(id, action){

    const findID = orderHistory.find(value => value.id === id);
    console.log(findID);

    if (findID && action === "delivered") {
       findID.isActive = "delivered";
      
    } else if (findID && action === "cancel"){
        findID.isActive = "cancelled";
       
    } else {
        return;
    }

    setDataToLocal("orderHistory", orderHistory)
    renderOrderAdmind(orderHistory)
}

