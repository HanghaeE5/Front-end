import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../../recoil/store';

ChartJS.register(ArcElement, Tooltip, Legend);
interface exptype {
  exp: number;
}
function ExpBar(props: exptype) {
  const { exp } = props;

  const data = {
    labels: [],
    datasets: [
      {
        data: [exp, 100 - exp],
        backgroundColor: ['#FFB905', '#ffffff'],
        borderWidth: 0,
        cutout: 135,
        rotation: 210,
        circumference: 300,
        borderRadius: 20,
      },
    ],
  };
  return <Doughnut data={data} />;
}
export default ExpBar;
