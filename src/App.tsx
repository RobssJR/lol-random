import { useEffect, useState } from 'react'
import { GetAllChampions, GetChampionFull } from './core/leagueAPI/requestDragonAPI'

var champion_list: Array<any> = []

function App() {
  const [champion, setChampion] = useState<any>("")

  const randomChampion = () =>{
    const values = Object.values(champion_list)
    const randomValue = values[parseInt(Math.random() * values.length + "")]

    GetChampionFull(randomValue?.name).then(champion => {
      setChampion(champion)
    })
  }

  useEffect(() => {
    GetAllChampions().then(res => {
      champion_list = res
      randomChampion()

    })
  }, [])

  return (
    <div style={{ backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.image?.full.replace(".png", "")}_0.jpg)` }}
      className={`bg-no-repeat
                bg-cover
                transition-all
                `}>

      <div className='flex flex-col bg-black/[.8] m-auto h-screen'>
        <div className='flex flex-col'>
          <img className='w-20 h-20 mx-auto mt-5' src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${champion.image?.full}`} alt={champion.name} />
          <span className='text-white mx-auto text-5xl font-bold m-auto mb-2'>{champion.name}</span>
          <span className='text-white mx-auto font-bold m-auto text-2xl lg:text-3xl'>{champion.title}</span>
          <span className='text-gray-400 mx-auto text-3xl font-bold mt-3'>{champion.tags?.join(" | ").toLocaleUpperCase()}</span>
        </div>

        <button className='rounded bg-tranparent h-16 w-44 m-auto mt-10 border-lime-500 border-2 text-lime-500 transition-colors hover:bg-lime-500 hover:text-white'
          onClick={randomChampion}>Random champion</button>
      </div>
    </div>
  )
}

export default App
