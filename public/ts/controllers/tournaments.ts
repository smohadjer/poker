import { getRebuys, getTournaments, getSeasonName } from '../lib/utils';
import { State } from '../lib/definitions';

// tournaments, season_id, seasonName
export function getTournamentsData(state: State) {
    const tournaments = getTournaments(state.data!.tournaments, state.season_id);

    const optimizedData = tournaments.map((item) => {
        item.rebuys = getRebuys(item);
        item.hasBounty = item.bounties ? 'Yes' : 'No';
        return item;
    });

    const tournamentsData = {
        tournaments: optimizedData,
        season_id: state.season_id,
        seasonName: getSeasonName(state.season_id, state.data!.seasons)
    }

    return tournamentsData;
}