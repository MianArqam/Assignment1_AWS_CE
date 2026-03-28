import { useEffect, useMemo, useState } from 'react';

const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

function getBestImage(images = []) {
  if (!images.length) return '';

  const preferredRatios = ['16_9', '4_3', '3_2', '1_1'];
  const ratioWeight = {
    '16_9': 4,
    '4_3': 3,
    '3_2': 2,
    '1_1': 1,
  };

  const isGenericImage = (url = '') => url.includes('/dam/c/');

  const scored = images
    .filter((img) => Boolean(img?.url))
    .map((img) => {
      const width = Number(img.width) || 0;
      const height = Number(img.height) || 0;
      const areaScore = width * height;
      const ratioScore = ratioWeight[img.ratio] || 0;
      const genericPenalty = isGenericImage(img.url) ? -100000000 : 0;

      return {
        url: img.url,
        score: genericPenalty + ratioScore * 1000000 + areaScore,
      };
    })
    .sort((a, b) => b.score - a.score);

  const preferred = scored[0];

  return preferred?.url || images[0]?.url || '';
}

function normalizeEvent(event) {
  const image = getBestImage(event.images);
  const venue = event._embedded?.venues?.[0] || {};
  const dateInfo = event.dates?.start || {};

  return {
    id: event.id,
    title: event.name || 'Untitled Event',
    date: dateInfo.dateTime || [dateInfo.localDate, dateInfo.localTime].filter(Boolean).join(' '),
    venue: venue.name || 'TBA',
    city: venue.city?.name || 'Unknown',
    image,
    url: event.url || '',
    description: event.info || event.pleaseNote || event.promoter?.description || 'No description available.',
  };
}

function isRelevantEvent(event) {
  const title = (event.name || '').toLowerCase();
  const url = (event.url || '').toLowerCase();
  const venue = event._embedded?.venues?.[0] || {};
  const venueName = (venue.name || '').toLowerCase();

  const adKeywords = [
    'digital redirect',
    'corporate training',
    'download',
    'webinar',
    'sponsored',
    'promotion',
  ];

  const isOnlineOnly =
    title.includes('online') ||
    venueName.includes('online') ||
    venueName.includes('virtual');

  const looksLikeAd = adKeywords.some((keyword) => title.includes(keyword));
  const fromUniverse = url.includes('universe.com');
  const hasVenueName = Boolean(venue.name);

  return hasVenueName && !isOnlineOnly && !looksLikeAd && !fromUniverse;
}

export default function useEvents({ city = '', keyword = '', size = 6, countryCode = 'US' } = {}) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiKey = useMemo(
    () => import.meta.env.REACT_APP_TICKETMASTER_KEY || import.meta.env.VITE_TICKETMASTER_KEY,
    []
  );

  useEffect(() => {
    const controller = new AbortController();

    async function fetchEvents() {
      setLoading(true);
      setError('');

      if (!apiKey) {
        setEvents([]);
        setError('Missing Ticketmaster API key. Add REACT_APP_TICKETMASTER_KEY to your .env file.');
        setLoading(false);
        return;
      }

      try {
        const baseParams = {
          apikey: apiKey,
          size: String(size),
          sort: 'date,asc',
        };

        const attempts = [
          {
            ...baseParams,
            startDateTime: new Date().toISOString(),
            ...(countryCode.trim() ? { countryCode: countryCode.trim() } : {}),
            ...(city.trim() ? { city: city.trim() } : {}),
            ...(keyword.trim() ? { keyword: keyword.trim() } : {}),
          },
          {
            ...baseParams,
            ...(countryCode.trim() ? { countryCode: countryCode.trim() } : {}),
            ...(city.trim() ? { city: city.trim() } : {}),
            ...(keyword.trim() ? { keyword: keyword.trim() } : {}),
          },
          {
            ...baseParams,
            ...(countryCode.trim() ? { countryCode: countryCode.trim() } : {}),
          },
        ];

        let rawEvents = [];
        let lastError = null;

        for (const attempt of attempts) {
          const params = new URLSearchParams(attempt);

          try {
            const response = await fetch(`${BASE_URL}?${params.toString()}`, {
              signal: controller.signal,
            });

            if (!response.ok) {
              const errorBody = await response.text();
              throw new Error(`Ticketmaster request failed (${response.status}). ${errorBody}`);
            }

            const data = await response.json();
            rawEvents = data?._embedded?.events || [];
            lastError = null;
            break;
          } catch (attemptError) {
            if (attemptError.name === 'AbortError') {
              throw attemptError;
            }
            lastError = attemptError;
          }
        }

        if (lastError) {
          throw new Error('Ticketmaster is temporarily unavailable. Please try again in a moment.');
        }

        const relevantEvents = rawEvents.filter(isRelevantEvent);
        setEvents(relevantEvents.map(normalizeEvent));
      } catch (requestError) {
        if (requestError.name === 'AbortError') return;
        setEvents([]);
        setError(requestError.message || 'Unable to load events right now.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchEvents();

    return () => controller.abort();
  }, [apiKey, city, keyword, size, countryCode]);

  return { events, loading, error };
}
