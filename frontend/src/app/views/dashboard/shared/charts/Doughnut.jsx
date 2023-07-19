import React, {useEffect, useState} from 'react';
import {useTheme} from '@mui/material';
import ReactEcharts from 'echarts-for-react';
import server from "../../../../../axios/axios";

const DoughnutChart = ({height, color = [], userId, statsEndpoint}) => {
    const theme = useTheme();
    const [doughnutData, setDoughnutData] = useState([]);


    useEffect(() => {
        const fetchDoughnutData = async () => {
            try {
                const response = await server.get(`/users/${userId}/stats/${statsEndpoint}`);
                const statsData = response.data;
                setDoughnutData(statsData.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchDoughnutData();
    }, [statsEndpoint, userId]);

    useEffect(() => {
        console.log(doughnutData);
    }, [doughnutData]);

    if (Object.keys(doughnutData).length === 0) {
        return <div>Loading...</div>;
    }

    const option = {
        legend: {
            show: true,
            itemGap: 20,
            icon: 'circle',
            bottom: 0,
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto'
            }
        },
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {d}%'
        },
        xAxis: [
            {
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
        ],

        series: [
            {
                name: 'Your Taken Quizzes',
                type: 'pie',
                radius: ['45%', '72.55%'],
                center: ['50%', '50%'],
                avoidLabelOverlap: false,
                hoverOffset: 5,
                stillShowZeroSum: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        textStyle: {
                            color: theme.palette.text.secondary,
                            fontSize: 13,
                            fontFamily: 'roboto'
                        },
                        formatter: '{a}'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'normal',
                            color: "rgba(15, 21, 77, 1)"
                        },
                        formatter: '{b} \n{d}%'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: doughnutData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return (
        <ReactEcharts
            style={{height: height}}
            option={{
                ...option,
                color: [...color]
            }}
        />
    );
};

export default DoughnutChart;
