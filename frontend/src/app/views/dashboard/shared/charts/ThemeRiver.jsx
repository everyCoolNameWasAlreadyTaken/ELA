import React, {useState, useEffect} from 'react';
import ReactEcharts from 'echarts-for-react';
import server from '../../../../../axios/axios';

const ThemeRiver = ({userId, statsEndpoint}) => {
        const [themeData, setThemeData] = useState([]);
        const [legend, setLegend] = useState([]);

        useEffect(() => {
            const fetchThemeStatsData = async () => {
                try {
                    const response = await server.get(`/users/${userId}/stats/${statsEndpoint}`);
                    const statsData = response.data;
                    setThemeData(statsData.data);
                    setLegend(statsData.legend);
                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchThemeStatsData();
        }, [statsEndpoint, userId]);

        useEffect(() => {
            console.log(themeData);
            console.log(legend);
        }, [themeData, legend]);

        if (Object.keys(themeData).length === 0) {
            return <div>Loading...</div>;
        }


        const option = {
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "line",
                    lineStyle: {
                        color: "rgba(0, 0, 0, 0.2)",
                        width: 1,
                        type: "solid"
                    }
                }
            },
            legend: {
                data: legend
            },
            singleAxis: {
                top: 50,
                bottom: 50,
                axisTick: {},
                axisLabel: {},
                type: "time",
                axisPointer: {
                    animation: true,
                    label: {
                        show: true
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        opacity: 0.2
                    }
                }
            },
            series: [
                {
                    type: 'themeRiver',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 20,
                            shadowColor: 'rgba(0, 0, 0, 0.8)'
                        }
                    },
                    data: [
                        themeData.map((item) => [item.time, item.value, item.name])
                    ]
                }
            ],
        };


        return (
            <ReactEcharts
                option={{
                    ...option,
                }}
                style={{height: "400px"}}
            />
        );
};

export default ThemeRiver;
