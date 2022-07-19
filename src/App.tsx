import { useEffect, useState } from 'react'
import { GetAllChampions, GetChampionFull } from './core/leagueAPI/requestDragonAPI'
import SpellDiv from './components/SpellDiv'

var spellDiv_list: Array<any> = []
var champion_list: Array<any> = []

function App() {
  const [champion, setChampion] = useState<any>("")
  const [spellList, setSpellList] = useState([])

  useEffect(() => {
    GetAllChampions().then(res => {
      champion_list = res

      const values = Object.values(champion_list)
      const randomValue = values[parseInt(Math.random() * values.length + "")]

      GetChampionFull(randomValue.name).then(champion => {
        setChampion(champion)

        champion.spells?.map(spell => {
          spellDiv_list.push(<SpellDiv args={spell} />)

          setSpellList(spellDiv_list as any)
        })
      })
    })
  }, [])

  console.log(champion)

  return (
    <div style={{ backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.image?.full.replace(".png", "")}_0.jpg)` }}
      className={`bg-no-repeat
                bg-cover`}>

      <div className='flex flex-col bg-black/[.8] m-auto lg:h-screen'>
        <div className='flex flex-col'>
          <img className='w-20 h-20 mx-auto mt-5' src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/champion/${champion.image?.full}`} alt={champion.name} />
          <span className='text-white mx-auto text-5xl font-bold m-auto mb-2'>{champion.name}</span>
          <span className='text-white mx-auto text-3xl font-bold m-auto'>{champion.title}</span>
          <span className='text-gray-400 mx-auto text-3xl font-bold mt-3'>{champion.tags?.join(" | ").toLocaleUpperCase()}</span>
        </div>

        <div className='flex sm:flex-col lg:flex-row mt-5'>
          <div className='flex m-auto gap-5 my-5'>
            {spellList}
          </div>
          <span className='text-white w-1/2 text-2xl font-bold sm:m-auto text-justify'>{champion.blurb}</span>
        </div>

        <button className='rounded bg-tranparent h-16 w-44 m-auto mt-10 border-lime-500 border-2 text-lime-500 hover:bg-lime-500 hover:text-white'
          onClick={() => {
            const values = Object.values(champion_list)
            const randomValue = values[parseInt(Math.random() * values.length + "")]
            spellDiv_list = []

            GetChampionFull(randomValue.name).then(champion => {
              setChampion(champion)

              champion.spells?.map(spell => {
                spellDiv_list.push(<SpellDiv args={spell} />)

                setSpellList(spellDiv_list as any)
              })
            })
          }}>Random champion</button>
      </div>
    </div>
  )
}

export default App
