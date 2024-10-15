/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Empty from "/assets/images/illustration-empty-cart.svg";
import IconRemove from "/assets/images/icon-remove-item.svg";
import CarbonNeutral from "/assets/images/icon-carbon-neutral.svg";
import Confirmacao from "../confirmacao/confirmacao.jsx"
import './order.css';

const Order = ({ dados, nomeExcluido, start, enviarDadosPexcluir }) => {
  const [pedido, setPedido] = useState([]);
  let [orderTotal, setOrderTotal] = useState(0);
  let [confirmou, setConfirmou] = useState();
  let [ startAgain, setStartAgain ] = useState()

  const removeItem = (name) => {
    let id = pedido.findIndex((pedido) => pedido.name === name);
    if (id !== -1) {
      console.log(name)
      const pedidosAtualizados = [...pedido];
      pedidosAtualizados.splice(id, 1);

      setPedido(pedidosAtualizados);
      nomeExcluido(name); // Enviar diretamente o nome do item removido
    }
  };

  useEffect(() => {
    if ( confirmou === false ) {
      enviarDadosPexcluir(pedido)
    }
  }, [confirmou])

  useEffect(() => {
    setPedido(dados);
  }, [dados]);

  useEffect(() => {
    const total = pedido.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setOrderTotal(total);
  }, [pedido]);

  useEffect(() => {
    if ( startAgain == 0 && confirmou == false ) {
      setPedido([])
    }
  }, [confirmou, startAgain])

  useEffect(() => {
    start(confirmou ? 1 : 0);
  }, [confirmou, start]);
  

  return (
    <div>
      <div className='Order'>
        <h2>Your Cart ({pedido.length})</h2>

        <div className="cart">
          {pedido.length > 0 ? (
            <>
              {pedido.map((order, index) => (
                <div key={index}>
                  <div className='cart-div'>
                    <div className="order-price">
                      <p id='order-price-p'>{order.name}</p>
                      <div className='flex-price'>
                        <p className='flex-price-p1'>{order.quantity}x</p>
                        <p className='flex-price-p2'>@ ${order.price}</p>
                        <p className='flex-price-p3'>@ ${(order.quantity) * (order.price)}</p>
                      </div>
                    </div>
                    <div className="icon-remove" onClick={() => removeItem(order.name)}>
                      <img src={IconRemove} alt="remove" />
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
              <div className="order-total">
                <p>Order Total</p>
                <h3>${orderTotal}</h3>
              </div>

              <div className="btn-carbon">
                <img src={CarbonNeutral} alt="#" />
                <p>This is a <span>carbon-neutral</span> from delivery</p>
              </div>

              <button onClick={() => {setConfirmou(true); setStartAgain(1)}}>Confirm Order</button>
            </>
          ) : (
            <>
              <img src={Empty} alt="empty-cart" />
              <p>Your added items will appear here</p>
            </>
          )}
        </div>
      </div>

      { confirmou ? (
        <Confirmacao confirmado={pedido} start={setStartAgain} confirmou={setConfirmou}/>
      ) : (
        <></>
      ) }
    </div>
  );
};

export default Order;
