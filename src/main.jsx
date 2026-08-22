import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import './styles.css';

const stories = [
  ['Travelers are trading itineraries for slow weekends', 'atlasjournal.com', 'A new kind of getaway is gaining momentum: fewer reservations, more room to wander.'],
  ['The outer banks guide: beaches, bites, and hidden coves', 'coastlineweekly.com', 'Everything to save before planning a sun-soaked escape on the Carolina coast.'],
  ['How to design a calmer digital workspace', 'designnotes.co', 'Five small layout decisions that make a large difference in daily focus.'],
];

function App() {
  const [query, setQuery] = useState('outer banks');
  const [dark, setDark] = useState(false);
  const [searched, setSearched] = useState(true);
  const [results, setResults] = useState(stories);
  const [status, setStatus] = useState('Curated starter results');
  const submit = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    const key = import.meta.env.VITE_GOOGLE_SEARCH_API_KEY;
    const engine = import.meta.env.VITE_GOOGLE_SEARCH_ENGINE_ID;
    if (!key || !engine) { setStatus('Add Google Search API credentials for live results'); return; }
    setStatus('Searching Google…');
    try {
      const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${key}&cx=${engine}&q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults((data.items || []).map(item => [item.title, item.displayLink, item.snippet]));
      setStatus(`Live Google Custom Search results · ${data.searchInformation?.formattedTotalResults || ''}`);
    } catch { setStatus('Google Search is unavailable right now.'); }
  };
  return <main className={dark ? 'app dark' : 'app'}>
    <header><a className="brand" href="#top">atlas<span>.</span></a><nav><button onClick={() => setDark(!dark)}>{dark ? 'Light' : 'Dark'} mode</button><button>Sign in</button></nav></header>
    <section className="search-area" id="top"><p className="eyebrow">DISCOVER THE WEB, QUIETLY</p><h1>Find the good stuff.</h1><form onSubmit={submit}><input value={query} onChange={e => setQuery(e.target.value)} aria-label="Search" placeholder="Search Atlas"/><button type="submit">Search</button></form><div className="chips"><button>Everything</button><button>Images</button><button>News</button><button>Videos</button></div></section>
    {searched && <section className="results"><p className="result-count">{status} for <strong>“{query}”</strong></p>{results.map(([title, site, description]) => <article key={title}><p className="site">{site}</p><h2>{title}</h2><p>{description}</p><div><span>8 min read</span><span>Save</span><span>Share</span></div></article>)}</section>}
    <footer><span>© 2026 Atlas Search</span><span>Privacy · Terms · Feedback</span></footer>
  </main>;
}
createRoot(document.getElementById('root')).render(<App/>);
