export default function SpellDiv(args: any) {
  var spell = args.args
  return (
    <div className='flex flex-col h-fit'>
        <img className='mx-auto' src={`https://ddragon.leagueoflegends.com/cdn/12.13.1/img/spell/${spell.image.full}`} alt={spell.name} />
        <span className='text-white mx-auto font-bold text-center w-24'>{spell.name}</span>
    </div>
  )
}
