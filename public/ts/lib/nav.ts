import { getHTML } from './utils.js';
import { Season } from './definitions';

const onChange = (target, urlParams) => {
  if (target instanceof HTMLSelectElement) {
    const season_id = target.value;

    if (season_id) {
      urlParams.set('season_id', season_id);
    } else {
      urlParams.delete('season_id');
    }

    window.location.search = urlParams.toString();
  }
};

export const addNavigation = async (
  seasons: Season[],
  seasonId: string | undefined,
  urlParams: URLSearchParams
) => {
  const html: string = await getHTML('hbs/nav.hbs', {
    season_id: seasonId,
    seasons: seasons
  });

  const $nav = new DOMParser().parseFromString(html, 'text/html').body.firstChild;

  if ($nav) {
    $nav.addEventListener('change', (event) => {
      onChange(event.target, urlParams);
    });
    document.querySelector('main')?.prepend($nav);
  }
};