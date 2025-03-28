'use client'

import dynamic from 'next/dynamic';

export const BarChart = dynamic(() => import('@/components/charts/bar-chart'), { ssr: false })