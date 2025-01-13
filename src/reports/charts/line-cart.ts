import * as Utils from '../../helpers/chart-utils';

export const getLineChart = async () => {
  const data = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
    datasets: [
      {
        label: 'Movimiento de inventario',
        data: Utils.numbers({ count: 6, min: -100, max: 100 }),
        borderColor: Utils.NAMED_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.NAMED_COLORS.blue, 0.5),
      },
    ],
  };

  const config = {
    type: 'line',
    data: data,
  };

  return Utils.chartJsToImage(config, {
    width: 500,
    height: 200,
  });
};
