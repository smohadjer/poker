import {
    getPlayers,
    getTournaments,
    getSeasonName
} from '../lib/utils';
import { Player } from '../types';
import { store } from '../lib/store';

type TemplateData = {
    players: Player[];
    seasonName? : string;
    season_id? : string;
    seasons: any;
    event_id: string | null;
}

export default (params: URLSearchParams) => {
    const state = store.getState();
    const season_id = params.get('season_id') ?? undefined;
    const tournaments = getTournaments(state.tournaments, season_id!);
    const tournamentsNormalized = tournaments.filter((tournament) => tournament.status === 'done')

    const data: TemplateData = {
        players: getPlayers(tournamentsNormalized),
        seasonName:  getSeasonName(season_id!, state.seasons),
        seasons: state.seasons,
        event_id: params.get('event_id'),
    }

    if (season_id) {
        data.season_id = season_id
    }

    return data;
};
