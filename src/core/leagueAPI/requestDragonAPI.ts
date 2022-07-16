import { IChampion } from '../interfaces/IChampion';
import { IChampionFull } from '../interfaces/IChampionFull';

export async function GetAllChampions() {
    var data = await fetch('https://ddragon.leagueoflegends.com/cdn/9.20.1/data/en_US/champion.json')
    .then(response => response.json())
    let champions: IChampion[] = JSON.parse(JSON.stringify(data["data"]))

    return champions
}

export async function GetChampionFull(chamionId: string) {
    var data = await fetch(`https://ddragon.leagueoflegends.com/cdn/12.13.1/data/en_US/champion/${chamionId}.json`)
    .then(response => response.json())
    let champion: IChampionFull = JSON.parse(JSON.stringify(data["data"][chamionId]))

    return champion
}