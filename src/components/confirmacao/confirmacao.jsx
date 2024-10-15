/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import './confirmacao.css'
import IconConfirmed from "/assets/images/icon-order-confirmed.svg";

const Confirmacao = ({ confirmado, start, confirmou }) => {
    const [ pedidosConfirmados, setPedidosConfirmados ] = useState([])
    let [orderTotal, setOrderTotal] = useState(0);
    let [startAgain, setStartAgain] = useState(1)
    let [isConfirmou, setConfirmou] = useState(true)

    useEffect(() => {
        setPedidosConfirmados(confirmado)
    }, [confirmado])

    useEffect(() => {
        const total = pedidosConfirmados.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setOrderTotal(total);
    }, [pedidosConfirmados]);

    useEffect(() => {
        start(startAgain)
        confirmou(isConfirmou)
    })
    
    return (
        <div className="confirmacao">
            <img src={IconConfirmed} alt="#" />
            <h1>Order Confirmed</h1>
            <p className="p-we-hope">We hope you enjoy your food!</p>

            <div className="cart">
                {pedidosConfirmados.length > 0 ? (
                    <>
                        <div className="rodape">
                            {pedidosConfirmados.map((order, index) => (
                                <div key={index}>
                                    <div className="flex-cart">
                                        {order?.image?.mobile ? (
                                            <img src={order.image.mobile} alt={`Imagem para ${order.name}`} />
                                            ) : (
                                            <p>Imagem não disponível</p>
                                        )}

                                        <div className='cart-div'>
                                            <div className="order-price">
                                                <p id='order-price-p'>{order.name}</p>
                                                <div className='flex-price'>
                                                    <p className='flex-price-p1'>{order.quantity}x</p>
                                                    <p className='flex-price-p2'>@ ${order.price}</p>
                                                </div>
                                            </div>

                                            <div className='flex-price-p3'>
                                                <p>${(order.quantity) * (order.price)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                        <div className="order-total">
                            <p>Order Total</p>
                            <h3>${orderTotal}</h3>
                        </div>

                        <button onClick={() => {setStartAgain(0); setConfirmou(false)}}>Start New Order</button>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}

export default Confirmacao