'use client';

/**
 * Tabs — equivalent to src/common/tabs.svelte
 * Generic tabbed navigation component. Dynamically imports the correct SCSS
 * per the tabSCSSFileLocation prop (mirroring the Svelte original).
 */

import React, { useEffect } from 'react';
import { importSCSSOptions } from '@/lib/globals';

interface TabsProps<T> {
  iterable: T[];
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  tabSCSSFileLocation: importSCSSOptions;
  getTabNameFunction: (item: T) => string;
  icons?: [string, string][];
}

export default function Tabs<T>({
  iterable,
  activeIndex,
  setActiveIndex,
  tabSCSSFileLocation,
  getTabNameFunction,
  icons = [],
}: TabsProps<T>) {
  const tabCSSClass = 'inline-block p-5 border-b-2 rounded-t-lg';
  const tabContainerCSSClass = 'flex flex-wrap -mb-px text-sm font-medium text-center';
  const listClass = 'flex flex-wrap -mb-px text-sm font-medium text-center';

  // Dynamically import the correct tab SCSS file — mirrors the Svelte dynamic import
  useEffect(() => {
    if (tabSCSSFileLocation === importSCSSOptions.about_me) {
      import('../../routes/about_me/tabs.scss');
    } else if (tabSCSSFileLocation === importSCSSOptions.personal_projects) {
      import('../../routes/personal_projects/tabs.scss');
    } else if (tabSCSSFileLocation === importSCSSOptions.cat_encryption) {
      import('../../routes/cat_encryption/tabs.scss');
    } else {
      import('../../routes/web_ring/tabs.scss');
    }
  }, [tabSCSSFileLocation]);

  return (
    <div
      id="tabs"
      className={tabContainerCSSClass}
      style={{ textAlign: 'center' }}
      role="tablist"
    >
      <ul
        className={listClass}
        data-tabs-toggle="#stuffs"
        style={{ margin: 'auto', textAlign: 'center', padding: '0%' }}
        role="tablist"
      >
        {iterable.map((currentObject, index) => (
          <li
            key={index}
            className="me-2"
            style={{ margin: 'auto', listStyleType: 'none' }}
            role="presentation"
          >
            <button
              onClick={() => setActiveIndex(index)}
              className={`button ${tabCSSClass} ${activeIndex === index ? 'selected_tab' : 'tab'}`}
              role="tab"
              id={getTabNameFunction(currentObject)}
            >
              {icons.length === 0 ? (
                getTabNameFunction(currentObject)
              ) : (
                <span
                  className={`icon ${icons[index]?.[0] ?? ''}`}
                  style={{ fontSize: '5vmin' }}
                >
                  {icons[index]?.[1] ?? ''}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
