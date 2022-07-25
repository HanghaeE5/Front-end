import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, ChartArea, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement);
interface exptype {
  exp: number;
  ismine: boolean;
}

function myCreateGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const gradient = ctx.createConicGradient(2.07, 156, 156);

  gradient.addColorStop(0, '#FFFCAD');
  gradient.addColorStop(0.3, '#FFEE56');
  gradient.addColorStop(0.6, '#FFD953');
  gradient.addColorStop(1, '#FFB905');

  return gradient;
}

function friendCreateGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const gradient = ctx.createConicGradient(2.07, 156, 156);

  gradient.addColorStop(0, '#e0f5d9');

  gradient.addColorStop(1, '#86b63c');

  return gradient;
}

function ExpBar(props: exptype) {
  const { exp, ismine } = props;

  const chartRef = useRef<any>(null);
  const [chartData, setChartData] = useState<ChartData<'doughnut'>>({
    datasets: [],
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }
    const data = {
      labels: [],
      datasets: [
        {
          data: [exp, 100 - exp],
          backgroundColor: [
            ismine ? myCreateGradient(chart.ctx, chart.chartArea) : friendCreateGradient(chart.ctx, chart.chartArea),
            '#ffffff',
          ],
          borderWidth: 0,
          cutout: 140,
          rotation: 215,
          circumference: 290,
          borderRadius: 20,
        },
      ],
    };

    setChartData(data);
  }, [exp]);

  return <Doughnut ref={chartRef} data={chartData} />;
}

export default ExpBar;
