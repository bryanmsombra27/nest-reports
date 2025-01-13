import * as Utils from '../../helpers/chart-utils';

interface DonutEntry {
  label: string;
  value: number;
}

interface DonutOptions {
  position?: 'left' | 'right' | 'bottom' | 'top';
  entries: DonutEntry[];
}

export const getDonutChart = async (options: DonutOptions): Promise<string> => {
  const { position = 'top' } = options;

  const dataGrap = {
    labels: options.entries.map((item) => item.label),
    datasets: [
      {
        label: 'Dataset 1',
        data: options.entries.map((item) => item.value),
        backgroundColor: Object.values(Utils.CHART_COLORS),
      },
    ],
  };
  const config = {
    type: 'doughnut',
    data: dataGrap,
    options: {
      legend: {
        position: position,
      },
      plugins: {
        datalabels: {
          color: 'white',
          //   text: 'Chart.js Doughnut Chart',
        },
      },
    },
  };

  return Utils.chartJsToImage(config);
};
