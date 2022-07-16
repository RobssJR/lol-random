import { useEffect, useState } from 'react'
import { IChampionFull } from './core/interfaces/IChampionFull'
import { GetAllChampions, GetChampionFull } from './core/leagueAPI/requestDragonAPI'
import SpellDiv from './components/SpellDiv'

function App() {
  const [champion, setChampion] = useState<IChampionFull>("")
  const [spellList, setSpellList] = useState([])
  var spellDiv_list: JSX.Element[] = []

  useEffect(() => {
    GetAllChampions().then(element => {
      const values = Object.values(element)
      const randomValue = values[parseInt(Math.random() * values.length)]

      GetChampionFull(randomValue.name).then(champion => {
        setChampion(champion)

        champion.spells?.map(spell => {
          spellDiv_list.push(<SpellDiv args={spell} />)

          setSpellList(spellDiv_list)
        })
      })
    }
    )
  }, [])

  console.log(champion)

  return (
    <div style={{ backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.image?.full.replace(".png", "")}_0.jpg)` }}
      className={`bg-no-repeat
                bg-cover
                w-screen 
                h-screen
                flex`}>

      <div className='flex flex-col p-auto bg-black/[.8] w-full h-full m-auto rounded'>
        <img className='w-20 h-20 mx-auto mt-5' src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${champion.image?.full}`} alt={champion.name} />
        <span className='text-white mx-auto text-5xl font-bold'>{champion.name} - {champion.title}</span>
        <span className='text-gray-400 mx-auto mt-5 text-3xl font-bold'>{champion.tags?.join(" | ").toLocaleUpperCase()}</span>
        <div className='flex flex-row mx-5 mt-10 place-content-between'>
          {spellList}
          <span className='text-white w-1/2 text-2xl font-bold'>{champion.blurb}</span>
        </div>
        <button className=' rounded bg-tranparent h-16 w-44 my-auto ml-5 border-lime-500 border-2 text-lime-500 hover:bg-lime-500 hover:text-white'
          onClick={() => {
            GetAllChampions().then(element => {
              const values = Object.values(element)
              const randomValue = values[parseInt(Math.random() * values.length)]

              GetChampionFull(randomValue.name).then(champion => {
                setChampion(champion)

                champion.spells?.map(spell => {
                  
                  spellDiv_list.push(<SpellDiv args={spell} />)

                  setSpellList(spellDiv_list)
                })
              })
            })
          }
          }>Random champion</button>
      </div>
    </div>
  )
}

export default App
