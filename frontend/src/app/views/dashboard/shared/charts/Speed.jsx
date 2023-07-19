import React from 'react';
import ReactEcharts from 'echarts-for-react';


const Speed = ({ height, color = [], speed}) => {

    const option = {
        tooltip: {
            formatter: '{b} : {c} minutes'
        },
        series: [
            {
                name: 'Quiz',
                type: 'gauge',
                progress: {
                    show: true
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value}'
                },
                data: [
                    {
                        value: speed,
                        name: 'TIME TAKEN'
                    }
                ]
            }
        ]
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

export default Speed;
