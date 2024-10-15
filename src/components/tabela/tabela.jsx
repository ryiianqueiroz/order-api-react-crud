/* eslint-disable react/prop-types */
import AddToCart from "/assets/images/icon-add-to-cart.svg";
import { useEffect, useState } from 'react';
import './tabela.css';
import axios from "axios";

const Tabela = ({ enviarDados, nomeAremover, enviarDadosExcluir }) => {
  const [dados, setDados] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [ enviarExcluidos, setExcluir ] = useState([])

  useEffect(() => {
    setExcluir(enviarDadosExcluir)
    console.log(enviarExcluidos)
  }, [enviarDadosExcluir, enviarExcluidos])

  useEffect(() => {
    if (nomeAremover) {
      console.log("Nome a remover: ", nomeAremover);

      updatedCart(nomeAremover, nomeAremover)
  
      setPedidos((prevPedidos) => {
        const pedidosAtualizados = prevPedidos.filter(pedido => pedido.name !== nomeAremover);
        
        console.log("Pedidos atualizados: ", pedidosAtualizados);
  
        pedidosAtualizados.forEach(pedido => updatedCart(pedido.name));
  
        // Atualizar os pedidos no componente App
        enviarDados(pedidosAtualizados);
  
        return pedidosAtualizados;
      });
    }
  }, [nomeAremover, enviarDados]);

  useEffect(() => {
    enviarExcluidos.map((pedido) => {
      updatedCart(pedido.name, pedido.name)
    })

    setPedidos([])
  }, [enviarExcluidos])
  

  const updatedCart = ( name, id = "") => {
      let idButton = document.getElementById(`${name} Button`);
      let idDiv = document.getElementById(`${name} Div`);
      let addToCart = document.getElementById(`${name} addToCart`);

      if (idButton && idDiv && addToCart) {
          if (name !== id) {
              idButton.classList.add("NoButton");
              idDiv.classList.remove("NoDiv");
              idDiv.classList.add("addDiv");
              addToCart.classList.add("orangered");
          } else {
              idButton.classList.remove("NoButton");
              idDiv.classList.add("NoDiv");
              idDiv.classList.remove("addDiv");
              addToCart.classList.remove("orangered");
          }
      } else {
          console.error(`Elemento(s) não encontrado(s) para o ID: ${id}`);
      }
  };

  const handler = (comida, price, mobile) => {
    const object = {
      name: comida,
      quantity: 1,
      price: price,
      image: {
        mobile: `${mobile}`
      }
    };
    
    const pedidosAtualizados = [...pedidos, object];
    setPedidos(pedidosAtualizados);
    enviarDados(pedidosAtualizados); // Atualizar corretamente o array de pedidos
    console.log(pedidos)
  };

  const decrement = (name) => {
    let id = pedidos.findIndex((pedido) => pedido.name === name);
    const pedidosAtualizados = [...pedidos];

    if (pedidosAtualizados[id].quantity > 1) {
      pedidosAtualizados[id].quantity -= 1;
    }

    setPedidos(pedidosAtualizados);
    enviarDados(pedidosAtualizados);
  };

  const increment = (name) => {
    let id = pedidos.findIndex((pedido) => pedido.name === name);
    const pedidosAtualizados = [...pedidos];

    pedidosAtualizados[id].quantity += 1;

    setPedidos(pedidosAtualizados);
    enviarDados(pedidosAtualizados);
  };

  useEffect(() => {
    axios.get("https://order-api-pi.vercel.app/api")
      .then((result) => {
        setDados(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="tabela">
      <h1>Desserts</h1>

      <div className='Desserts'>
        {dados.map((element) => (
          <div key={element.name} className='dessert'>
            <img src={element.image.mobile} className="img-tabela" alt="#" />

            <div className="add-to-cart" id={`${element.name} addToCart`}>
              <button id={`${element.name} Button`} onClick={() => { handler(element.name, element.price, element.image.mobile); updatedCart(element.name) }}>
                <img src={AddToCart} alt="addtocart" /> Add to Cart
              </button>
              <div id={`${element.name} Div`} className="NoDiv">
                <div className="icon-quantity" onClick={() => decrement(element.name)}>
                  <p>-</p>
                </div>
                <p>{pedidos.find((pedido) => pedido.name === element.name)?.quantity || 0}</p>
                <div className="icon-quantity" onClick={() => increment(element.name)}>
                  <p>+</p>
                </div>
              </div>
            </div>

            <div className="tag">
              <p className="p-category">{element.category}</p>
              <p className="p-name">{element.name}</p>
              <p className="p-price">${element.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabela;
