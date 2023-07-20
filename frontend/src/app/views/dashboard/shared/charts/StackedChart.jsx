import React, {useState, useEffect} from 'react';
import ReactEcharts from 'echarts-for-react';
import server from '../../../../../axios/axios';

const StackedChart = ({userId, statsEndpoint, height, color}) => {
        const [themeData, setThemeData] = useState([]);
        const [legend, setLegend] = useState([]);
        const [dates, setDates] = useState([]);

        useEffect(() => {
            const fetchThemeStatsData = async () => {
                try {
                    const response = await server.get(`/users/${userId}/stats/${statsEndpoint}`);
                    const statsData = response.data;
                    setLegend(statsData.legend);
                    setDates(statsData.dates);
                    setThemeData(statsData.data);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchThemeStatsData();
        }, [statsEndpoint, userId]);

        useEffect(() => {
            console.log(themeData);
            console.log(legend);
            console.log(dates);
        }, [themeData, legend, dates]);

        if (Object.keys(themeData).length === 0) {
            return <div>Loading...</div>;
        }

    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: legend
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                data: dates
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: legend.map((item, index) => ({
            name: item,
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series',
            },
            data: themeData[index],
        })),
    };

        return (
            <ReactEcharts
                style={{ height: height }}
                option={{
                    ...option,
                    color: [...color],
                }}
            />
        );
};

export default StackedChart;
