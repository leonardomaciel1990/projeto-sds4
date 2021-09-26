import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/request';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {


    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {
        axios.get(BASE_URL + '/sales/amount-by-seller')
            .then(response => {
                const data = response.data as SaleSum[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.sum);
                setChartData({ labels: myLabels, series: mySeries });
            });
    }, []);

    // Forma errada   
    //let chartData : ChartData = {labels:[], series:[]};

    // Forma errada. Por ser requisições assíncronas  a variável chartData mesmo sendo carregada
    // aqui dentro o componente não é renderizado. (Ciclo de vida do react) é necessário usar o useStates
    /*     axios.get(BASE_URL+'/sales/amount-by-seller')
            .then( response => {
                const data = response.data as SaleSum[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.sum);
    
                // Forma errada sem useState
                //chartData = {labels:myLabels, series:mySeries};
                //console.log(chartData);
    
                setChartData({labels:myLabels, series:mySeries});
            }); */

    /*     const mockData = {
            series: [477138, 499928, 444867, 220426, 473088],
            labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
        } */

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;