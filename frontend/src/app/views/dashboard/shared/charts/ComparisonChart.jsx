import { useTheme } from '@mui/material';
import ReactEcharts from 'echarts-for-react';
import React, {useEffect, useState} from 'react';
import server from "../../../../../axios/axios";

const ComparisonChart = ({ height, userId, statsEndpoint, color }) => {
    const theme = useTheme();
    const [comparisonData, setComparisonData] = useState([]);

    useEffect(() => {
        const fetchComparisonData = async () => {
            try {
                const response = await server.get(`/users/${userId}/stats/${statsEndpoint}`);
                const statsData = response.data;
                setComparisonData(statsData.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchComparisonData();
    }, [statsEndpoint, userId]);

    useEffect(() => {
        console.log(comparisonData);
    }, [comparisonData]);

    if (Object.keys(comparisonData).length === 0) {
        return <div>Loading...</div>;
    }

    const option = {
        grid: { top: '10%', bottom: '10%', right: '5%' },
        legend: { show: true },
        color: color,
        barGap: 0,
        barMaxWidth: '64px',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        dataset: {
            source: comparisonData
        },
        xAxis: {
            type: 'category',
            axisLine: { show: false },
            splitLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                fontSize: 13,
                fontFamily: 'roboto',
                color: theme.palette.text.secondary
            }
        },
        yAxis: {
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: {
                lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 }
            },
            axisLabel: {
                fontSize: 13,
                fontFamily: 'roboto',
                color: theme.palette.text.secondary
            }
        },
        series: [{ type: 'bar' }, { type: 'bar' }]
    };

    return <ReactEcharts style={{ height: height }} option={{ ...option }} />;
};

export default ComparisonChart;
