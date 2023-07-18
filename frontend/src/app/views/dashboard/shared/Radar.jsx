import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import server from '../../../../axios/axios';

const RadarChart = ({ height, color = [], userId, statsEndpoint }) => {
    const [genreStats, setGenreStats] = useState({});

    useEffect(() => {
        const fetchGenreStatsData = async () => {
            try {
                const response = await server.get(`/users/${userId}/stats/${statsEndpoint}`);
                const statsData = response.data;
                setGenreStats(statsData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchGenreStatsData();
    }, [statsEndpoint]);

    if (Object.keys(genreStats).length === 0) {
        return <div>Loading...</div>;
    }

    const genres = Object.keys(genreStats);
    const percentages = genres.map((genre) => {
        const percentage = genreStats[genre].percentage;
        return Number(percentage.toFixed(1));
    });

    const option = {
        tooltip: {
            confine: true,
        },
        radar: {
            indicator: genres.map((genre) => ({
                name: genre,
                max: 100,
            })),
        },
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: percentages,
                        name: 'Percentage',
                    },
                ],
            },
        ],
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

export default RadarChart;
