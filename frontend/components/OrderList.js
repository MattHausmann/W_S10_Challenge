import axios from 'axios';
import React, {useState} from 'react'

let getUrl = 'http://localhost:9009/api/pizza/history';





export default function OrderList() {

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  axios
    .get(getUrl)
   .then((res) => {setOrders(res.data);})
    .catch((err) => console.log(err));


  function setSizeFilter(event) {
    setFilter(event.target.textContent);
  }

  
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.filter((order) => filter === 'All' || order.size == filter).map((order) => {
            return (
              <li key={order.id}>
                <div>
                  {order.customer} ordered a size {order.size} with {order.toppings?order.toppings.length:"no"} topping{order.toppings?order.toppings.length==1?"":"s":"s"}
                </div>
              </li>
          )})        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === filter ? ' active' : ''}`
            return <button onClick={setSizeFilter}
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}
              </button>
          })
        }
      </div>
    </div>
  )
}
