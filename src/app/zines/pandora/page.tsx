'use client';

import React from 'react';
import DisplayZine from '../DisplayZine';
import { zines } from '../zine';

export default function PandoraZinePage() {
  return <DisplayZine zine={zines.pandora} />;
}
