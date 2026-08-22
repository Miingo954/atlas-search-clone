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
  const submit = (event) => { event.preventDefault(); setSearched(Boolean(query.trim())); };
  return <main className={dark ? 'app dark' : 'app'}>
    <header><a className="brand" href="#top">atlas<span>.</span></a><nav><button onClick={() => setDark(!dark)}>{dark ? 'Light' : 'Dark'} mode</button><button>Sign in</button></nav></header>
    <section className="search-area" id="top"><p className="eyebrow">DISCOVER THE WEB, QUIETLY</p><h1>Find the good stuff.</h1><form onSubmit={submit}><input value={query} onChange={e => setQuery(e.target.value)} aria-label="Search" placeholder="Search Atlas"/><button type="submit">Search</button></form><div className="chips"><button>Everything</button><button>Images</button><button>News</button><button>Videos</button></div></section>
    {searched && <section className="results"><p className="result-count">About 24,000 results for <strong>“{query}”</strong></p>{stories.map(([title, site, description]) => <article key={title}><p className="site">{site}</p><h2>{title}</h2><p>{description}</p><div><span>8 min read</span><span>Save</span><span>Share</span></div></article>)}</section>}
    <footer><span>© 2026 Atlas Search</span><span>Privacy · Terms · Feedback</span></footer>
  </main>;
}
createRoot(document.getElementById('root')).render(<App/>);
