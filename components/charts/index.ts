'use client'

import dynamic from 'next/dynamic';

export const Chart = dynamic(() => import('@/components/charts/chart'), { ssr: false })