import Tabela from "./components/tabela/tabela"
import Order from "./components/order/order"
import { useEffect, useState } from 'react'
import './App.css'

const App = () => {

  const [ orderUpdated, setOrder ] = useState([])
  let [ nomeRemover, setNome ] = useState("")
  let [ startAgain, setStartAgain ] = useState(1)
  const [ enviarExcluidos, setExcluir ] = useState([])

  useEffect(() => {
    let app = document.querySelector(".App")

    if ( startAgain == 0 ) {
      setOrder([])
      app.classList.remove("modal")
      document.body.style.overflow = "scroll";
    } else {
      app.classList.add("modal")
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    }
  }, [startAgain])

  useEffect(() => {
    if ( nomeRemover != "" ) {
      console.log(nomeRemover)
    }
  }, [nomeRemover])

  return (
    <div className="App">
      <Tabela 
        className="tabela" 
        enviarDados={setOrder} 
        nomeAremover={nomeRemover} 
        start={startAgain}
        enviarDadosExcluir={enviarExcluidos}>
      </Tabela>
      <Order 
        className="Order" 
        dados={orderUpdated} 
        nomeExcluido={setNome} 
        start={setStartAgain}
        enviarDadosPexcluir={setExcluir}>
      </Order>
    </div>
  )
}

export default App
