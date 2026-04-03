'use client';

import React from 'react';
import DisplayZine from '../DisplayZine';
import { zines } from '../zine';

export default function EmotionlessZinePage() {
  return <DisplayZine zine={zines.emotionless} />;
}
