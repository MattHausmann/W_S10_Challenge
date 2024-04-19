import axios from 'axios';
import React, {useState} from 'react'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

let postUrl = 'http://localhost:9009/api/pizza/order'

export default function PizzaForm() {
  const [fullName, setFullName] = useState(initialFormState.fullName);
  const [size, setSize] = useState(initialFormState.size);
  const [toppings, setToppings] = useState([]);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [message, setMessage] = useState('');

  function handleChangeFullName (event) {
    setFullName(event.target.value);
  }

  function handleChangeSize(event) {
    setSize(event.target.value);
  }

  function handleChangeToppings() {
    let newToppingsList = [];
    const toppingsInput = document.getElementById('toppingsInput').querySelectorAll('label');
    for(let i = 0; i < toppingsInput.length; i++) {
      let t = toppingsInput[i].querySelector('input');
      if(t.checked) {
        newToppingsList.push(t.name);
      }
    }

    setToppings(newToppingsList);
  }

  function submitOrder(event) {
    event.preventDefault();
    let orderObj = {
      fullName: fullName,
      size: size,
      toppings: toppings
    };
    axios
      .post(postUrl, orderObj)
      .then((res) => {
        setSuccess(true);
        setFailure(false);
        setMessage(res.data.message);
      })
      .catch((err) => {
        setSuccess(false);
        setFailure(true);
        setMessage(err.response.data.message)
      });
  }

  return (
    <form>
      <h2>Pizza Form</h2>
      {success && <div className='pending'>{message}</div>}
      {failure && <div className='failure'>Order failed: {message}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={handleChangeFullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={handleChangeSize}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group" onChange={handleChangeToppings} id="toppingsInput">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" />
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" />
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" onClick={submitOrder}/>
    </form>
  )
}
