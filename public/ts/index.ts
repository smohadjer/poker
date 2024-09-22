import enableSpaMode from './lib/enableSpaMode.js';
import fetchData from './lib/fetchData.js';
import { setHandlebars } from './lib/utils.js';
import { store } from './lib/store.js';

const init = async() => {
    const defaultView = 'ranking'
    const urlParams = new URLSearchParams(window.location.search);
    const payload = {
        view: urlParams.get('view') || defaultView,
        season_id: urlParams.get('season_id') || undefined,
        tournament_id: urlParams.get('tournament_id') || undefined,
        player_id: urlParams.get('player_id') || undefined,
    }

    store.setState({ payload });
    await setHandlebars();
    enableSpaMode();
    fetchData();
};

init();
