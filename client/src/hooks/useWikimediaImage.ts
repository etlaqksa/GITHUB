import { useEffect, useMemo, useState } from 'react';

export type WikimediaImage = {
  imageUrl: string;
  pageUrl: string;
  creditName: string;
  licenseShort: string;
};

type State = {
  loading: boolean;
  data?: WikimediaImage;
};

function cacheKey(q: string) {
  return `wmimg:v1:${q.toLowerCase()}`;
}

/**
 * Fetches an open-license image from Wikimedia Commons for a query.
 * Caches results in localStorage to reduce network usage.
 */
export function useWikimediaImage(query: string | undefined) {
  const q = (query || '').trim();
  const [state, setState] = useState<State>({ loading: !!q });

  const key = useMemo(() => (q ? cacheKey(q) : ''), [q]);

  useEffect(() => {
    if (!q) {
      setState({ loading: false });
      return;
    }

    // try cache
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        setState({ loading: false, data: JSON.parse(cached) });
        return;
      }
    } catch {
      // ignore
    }

    let cancelled = false;
    const run = async () => {
      try {
        setState({ loading: true });

        // 1) Search for a relevant file
        const searchUrl =
          'https://commons.wikimedia.org/w/api.php' +
          '?action=query&format=json&origin=*' +
          '&list=search&srnamespace=6&srlimit=1&srsearch=' +
          encodeURIComponent(q);

        const sRes = await fetch(searchUrl);
        const sJson = await sRes.json();
        const title = sJson?.query?.search?.[0]?.title as string | undefined;

        if (!title) throw new Error('No image found');

        // 2) Fetch image info & license metadata
        const infoUrl =
          'https://commons.wikimedia.org/w/api.php' +
          '?action=query&format=json&origin=*' +
          '&prop=imageinfo&iiprop=url|extmetadata' +
          '&titles=' +
          encodeURIComponent(title);

        const iRes = await fetch(infoUrl);
        const iJson = await iRes.json();

        const pages = iJson?.query?.pages;
        const page = pages ? pages[Object.keys(pages)[0]] : undefined;
        const ii = page?.imageinfo?.[0];
        const imageUrl = ii?.url as string | undefined;

        const meta = ii?.extmetadata || {};
        const creditName =
          (meta?.Artist?.value && String(meta.Artist.value).replace(/<[^>]*>/g, '')) ||
          (meta?.Credit?.value && String(meta.Credit.value).replace(/<[^>]*>/g, '')) ||
          'Wikimedia Commons';

        const licenseShort =
          (meta?.LicenseShortName?.value && String(meta.LicenseShortName.value)) ||
          (meta?.License?.value && String(meta.License.value)) ||
          'Open license';

        const pageUrl = 'https://commons.wikimedia.org/wiki/' + encodeURIComponent(title);

        if (!imageUrl) throw new Error('No image URL');

        const data: WikimediaImage = {
          imageUrl,
          pageUrl,
          creditName,
          licenseShort,
        };

        if (cancelled) return;

        setState({ loading: false, data });

        try {
          localStorage.setItem(key, JSON.stringify(data));
        } catch {
          // ignore
        }
      } catch {
        if (cancelled) return;
        setState({ loading: false });
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [q, key]);

  return state;
}
