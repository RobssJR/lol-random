export default function SpellDiv(args: any) {
  var spell = args.args
  return (
    <div className='w-25 h-fit'>
        <img className='mx-auto' src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/spell/${spell.image.full}`} alt={spell.name} />
        <span className='text-white mx-auto text-1xl font-bold'>{spell.name}</span>
    </div>
  )
}
