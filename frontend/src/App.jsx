import './App.css';

export function App() {
  return (
    <main className="login-page">
      <svg className="icons" aria-hidden="true">
        <symbol id="home" viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v11H3Zm5 11v-7h8v7" /></symbol>
        <symbol id="globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></symbol>
        <symbol id="mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></symbol>
        <symbol id="lock" viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" /></symbol>
        <symbol id="eye" viewBox="0 0 24 24"><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></symbol>
        <symbol id="people" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 14a5 5 0 0 1 6 4v2" /></symbol>
        <symbol id="filter" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" /><circle cx="9" cy="6" r="2" /><circle cx="15" cy="12" r="2" /><circle cx="11" cy="18" r="2" /></symbol>
        <symbol id="bolt" viewBox="0 0 24 24"><path d="m13 2-8 12h6l-1 8 9-13h-6Z" /></symbol>
      </svg>

      <nav className="topbar">
        <a className="brand" href="/" aria-label="L9aDar home"><svg><use href="#home" /></svg><b>L9aDar</b></a>
        <button className="language" type="button"><svg><use href="#globe" /></svg> En <span>⌄</span></button>
      </nav>

      <div className="content">
        <section className="story">
          <header>
            <h1>Share your home<br />with the right<br /><em>roommates.</em></h1>
            <p>Already found a place? Find 1–2 reliable<br />roommates based on your criteria.</p>
          </header>

          <img className="room" src="/images/room-illustration-green.png" alt="Illustration of a calm shared student bedroom" />

          <div className="benefits">
            <div><span><svg><use href="#people" /></svg></span><b>Find roommates</b></div>
            <div><span><svg><use href="#filter" /></svg></span><b>Filter by criteria</b></div>
            <div><span><svg><use href="#bolt" /></svg></span><b>Share the rent</b></div>
          </div>
        </section>

        <section className="login-panel">
          <form method="post" action="/api/auth/login">
            <header className="form-heading">
              <h2>Welcome to L9aDar</h2>
              <p>Log in to continue</p>
            </header>

            <button className="google" type="button"><span>G</span> Continue with Google</button>
            <p className="divider"><span>or</span></p>

            <label className="field">
              <svg><use href="#mail" /></svg>
              <input type="email" name="email" placeholder="Email" aria-label="Email" autoComplete="email" required />
            </label>
            <label className="field">
              <svg><use href="#lock" /></svg>
              <input type="password" name="password" placeholder="Password" aria-label="Password" autoComplete="current-password" minLength="8" required />
              <svg><use href="#eye" /></svg>
            </label>

            <button className="submit" type="submit">Log in</button>
            <a className="forgot" href="/forgot-password">Forgot your password?</a>
            <p className="signup">Don't have an account? <a href="/signup">Create an account</a></p>
          </form>
        </section>
      </div>
    </main>
  );
}
