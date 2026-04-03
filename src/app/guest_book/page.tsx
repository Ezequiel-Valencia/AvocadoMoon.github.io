'use client';

/**
 * Guest Book page — equivalent to src/routes/guest_book/+page.svelte
 * Digital geocache with submission form and paginated entry list.
 * The Svelte writable store (freshSetOfSubmissions) is replaced with a callback prop.
 */

import React, { useState, useEffect, useRef } from 'react';
import Menu from '@/components/common/Menu';
import {
  GeoCacheApi,
  Configuration,
  ResponseError,
  type GeoCacheSubmission,
} from '@/backend-api';
import styles from './GuestBook.module.scss';

// ---- Input sub-component (input.svelte) ----

interface InputProps {
  onSubmitted: () => void;
}

function Input({ onSubmitted }: InputProps) {
  const [addSecret, setAddSecret] = useState(false);
  const [addLocation, setAddLocation] = useState(false);
  const [grabbingLocation, setGrabbingLocation] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [username, setUsername] = useState('');
  const latRef = useRef<number | undefined>(undefined);
  const lonRef = useRef<number | undefined>(undefined);

  const geo = new GeoCacheApi();

  async function handleGuestSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = (document.querySelector<HTMLInputElement>('#username')?.value) ?? '';
    const note = (document.querySelector<HTMLTextAreaElement>('#note')?.value) ?? '';
    const secret = (document.querySelector<HTMLInputElement>('#secret')?.value) ?? '';
    const locationName = (document.querySelector<HTMLInputElement>('#location-name')?.value) ?? '';
    const latVal = document.querySelector<HTMLInputElement>('#latitude')?.value;
    const lonVal = document.querySelector<HTMLInputElement>('#longitude')?.value;
    if (latVal) latRef.current = parseFloat(latVal);
    if (lonVal) lonRef.current = parseFloat(lonVal);

    const submission: GeoCacheSubmission = {
      name,
      note,
      secret,
      longitude: lonRef.current,
      latitude: latRef.current,
      locationName,
    };

    try {
      await geo.sendSubmission({ geoCacheSubmission: submission });
      setAddSecret(false);
      setSubmittedMessage(true);
      setUsername(name);
      onSubmitted();
    } catch (err: any) {
      if (err instanceof ResponseError) {
        window.alert('Error attempting to submit message: ' + (await err.response.text()));
      }
      console.error(err);
    }
  }

  function usersLocation() {
    if (navigator.geolocation) {
      setGrabbingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGrabbingLocation(false);
          latRef.current = pos.coords.latitude;
          lonRef.current = pos.coords.longitude;
        },
        () => setGrabbingLocation(false)
      );
    }
  }

  if (submittedMessage) {
    return (
      <section>
        <br />
        <div>
          <h2>Message Saved in GeoCache</h2>
          <p>Thank you for your entry {username}.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <form className={styles['input-form']} onSubmit={handleGuestSubmission}>
        <label>
          Your Geocache Entry
          <br />
          <br />
          <input
            required
            minLength={3}
            placeholder="Your Name"
            name="username"
            type="text"
            id="username"
          />
          <br />
          <br />
          <textarea
            required
            minLength={3}
            maxLength={250}
            placeholder="Your message (max 250 characters)."
            style={{ borderRadius: '6px', width: '30vw' }}
            name="note"
            id="note"
          />
          <br />
          <br />
          {addLocation && (
            <>
              {grabbingLocation ? (
                <>
                  <p>Grabbing Your Location</p>
                  <div className={styles.loader} />
                </>
              ) : (
                <div
                  style={{ width: '30vw', textAlign: 'center', margin: 'auto', display: 'inline' }}
                >
                  <input
                    maxLength={50}
                    minLength={3}
                    required
                    style={{ width: '30vw' }}
                    placeholder="Location Name"
                    name="location-name"
                    type="text"
                    id="location-name"
                  />
                  <br />
                  <div style={{ width: '30vw', display: 'inline-block' }}>
                    <input
                      required
                      placeholder="Latitude"
                      name="latitude"
                      type="number"
                      step="any"
                      id="latitude"
                      defaultValue={latRef.current ?? ''}
                    />
                    <input
                      required
                      placeholder="Longitude"
                      name="longitude"
                      type="number"
                      step="any"
                      id="longitude"
                      defaultValue={lonRef.current ?? ''}
                    />
                    <button onClick={usersLocation} type="button" style={{ fontSize: 'small' }}>
                      <i className="fas fa-map-marker-alt" />
                    </button>
                  </div>
                </div>
              )}
              <br />
              <br />
            </>
          )}
          {addSecret && (
            <>
              <textarea
                maxLength={50}
                minLength={3}
                placeholder="Secret message (max 50 characters)."
                style={{ borderRadius: '6px', width: '30vw' }}
                name="secret"
                id="secret"
              />
              <br />
              <br />
            </>
          )}
          <div
            style={{ width: '30vw', textAlign: 'center', margin: 'auto' }}
            className="flex items-center"
          >
            <button type="button" onClick={() => setAddSecret((v) => !v)}>
              {addSecret ? 'Remove' : 'Add'} Secret?
            </button>
            <button
              style={{ marginLeft: '20px' }}
              type="button"
              onClick={() => setAddLocation((v) => !v)}
            >
              {addLocation ? 'Remove' : 'Add'} Location?
            </button>
          </div>
          <br />
          <button type="submit">Submit Message</button>
        </label>
      </form>
    </section>
  );
}

// ---- Entries sub-component (entries.svelte) ----

interface EntriesProps {
  refreshTrigger: number;
}

function Entries({ refreshTrigger }: EntriesProps) {
  const [showBlueLight, setShowBlueLight] = useState(false);
  const [entries, setEntries] = useState<GeoCacheSubmission[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [canAccessServer, setCanAccessServer] = useState(true);
  const interBubbleRef = useRef<HTMLDivElement>(null);

  const geoApi = new GeoCacheApi(
    new Configuration({ basePath: 'https://d29w5rfwyyex3t.cloudfront.net' })
  );

  async function getEntries(page: number) {
    try {
      const result = await geoApi.getSubmission({ pageNumber: page });
      setEntries(result);
    } catch {
      setCanAccessServer(false);
    }
  }

  useEffect(() => {
    getEntries(pageNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, refreshTrigger]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!interBubbleRef.current) return;
      const x = event.clientX - 200 / 2;
      const y = event.clientY - 200 / 2;
      interBubbleRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  function updateClipPath(event: React.MouseEvent<HTMLDivElement>) {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    container.style.setProperty('--x', `${x}px`);
    container.style.setProperty('--y', `${y}px`);
  }

  if (!canAccessServer) {
    return <h1>Server seems to be down.</h1>;
  }

  return (
    <section className={styles['entries-section']}>
      <hr style={{ width: '80vw', marginTop: '10vh' }} />
      <h1 style={{ textAlign: 'center' }}>Entries</h1>
      <div style={{ margin: 'auto', textAlign: 'center' }}>
        <button onClick={() => setShowBlueLight((v) => !v)} style={{ textAlign: 'center', margin: 'auto' }}>
          Turn Blacklight {showBlueLight ? 'Off' : 'On'}?
        </button>
      </div>
      <div
        ref={interBubbleRef}
        className={styles.interactive}
        style={{ opacity: showBlueLight ? 0.7 : 0 }}
      />
      {entries.map((entry, i) => (
        <div key={i} className={styles.entry} onMouseMove={updateClipPath}>
          <div className={`${styles['entry-text']} ${showBlueLight ? styles.blacklight : ''}`}>
            <span style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>{entry.name}</p>
              <p style={{ textAlign: 'right', paddingRight: '1vw' }}>{entry.date}</p>
            </span>
            {entry.latitude !== undefined && (
              <div>
                <p style={{ display: 'inline', textAlign: 'left', margin: 'auto' }}>Location: </p>
                <a
                  style={{ display: 'inline', textAlign: 'left', paddingRight: '0px' }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps?q=${entry.latitude},${entry.longitude}`}
                >
                  <p
                    style={{
                      marginTop: '0px',
                      marginBottom: '40px',
                      paddingLeft: '0px',
                      display: 'inline',
                      textAlign: 'left',
                    }}
                  >
                    {entry.locationName}
                  </p>
                </a>
              </div>
            )}
            <hr style={{ width: '95%' }} />
            <p>{entry.note}</p>
          </div>
          <div
            className={`${styles['hidden-content']} ${showBlueLight ? styles.blacklight : ''}`}
          >
            <div>
              <p style={{ color: 'white' }}>{entry.secret}</p>
            </div>
          </div>
        </div>
      ))}
      <br />
      <div style={{ display: 'inline' }}>
        {pageNumber !== 0 && (
          <button onClick={() => setPageNumber((p) => p - 1)}>&#60;</button>
        )}
        <p style={{ display: 'inline', paddingLeft: '1vw', paddingRight: '1vw' }}>
          {pageNumber + 1}
        </p>
        {entries.length === 10 && (
          <button onClick={() => setPageNumber((p) => p + 1)}>&#62;</button>
        )}
      </div>
    </section>
  );
}

// ---- Page ----

export default function GuestBookPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <section id="main-body" className={styles['main-body']}>
      <Menu
        songName="Cry Me a River - Yuiko Eto"
        songPath="https://files.catbox.moe/mi55xm.mp3"
        songVolumeLevel={0.2}
      />
      <section id="focus">
        <div style={{ paddingTop: '2vh' }} />
        <div
          style={{
            height: 'fit-content',
            width: 'fit-content',
            padding: '3%',
            marginTop: '5vh',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderWidth: '2px',
            borderColor: 'black',
            borderRadius: '6px',
            borderStyle: 'solid',
          }}
        >
          <h1>Ezequiel&apos;s Digital Geocache</h1>
          <p>Please leave a message and be respectful</p>
        </div>
        <Input onSubmitted={() => setRefreshTrigger((n) => n + 1)} />
        <Entries refreshTrigger={refreshTrigger} />
      </section>
    </section>
  );
}
