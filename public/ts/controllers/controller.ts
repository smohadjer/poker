import profile from './profile';
import tournament from './tournament';
import tournaments from './tournaments';
import ranking from './ranking';
import dashboard from './dashboard';
import addTournament from './addTournament';
import editTournament from './editTournament';
import addSeason from './addSeason';
import addPlayer from './addPlayer';
import editSeason from './editSeason';
import editPlayer from './editPlayer';
import events from './events';

type Controller = {
    [key:string]: Function;
}

/* controllers provide data to views */
export const controller: Controller = {
    '/events': events,
    '/profile': profile,
    '/tournament': tournament,
    '/tournaments': tournaments,
    '/ranking': ranking,
    '/admin/home': dashboard,
    '/admin/add-tournament': addTournament,
    '/admin/edit-tournament': editTournament,
    '/admin/add-season': addSeason,
    '/admin/add-player': addPlayer,
    '/admin/edit-season': editSeason,
    '/admin/edit-player': editPlayer
};
