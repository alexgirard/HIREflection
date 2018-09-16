import React from 'react';
import { ResponsiveBar } from '@nivo/bar'

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.
//{this.props.file}

class Charts extends React.Component {
  render(){
    const data = null;/*require('/data.JSON');*/
    return (
      <div id="chart" className="container">
        <ResponsiveBar
            data={
            [
              {
                "Group2": "Communication",
                "1": 78,
                "1Color": "hsl(226, 70%, 50%)"
              },
              {
                "Group2": "Java",
                "2": 42,
                "2Color": "hsl(169, 70%, 50%)"
              },
              {
                "Group2": "Experience",
                "3": 62,
                "2Color": "hsl(294, 70%, 50%)"
              },
              {
                "Group2": "C",
                "4": 21,
                "4Color": "hsl(16, 70%, 50%)"
              },
              {
                "Group2": "Mentored",
                "5": 63,
                "5Color": "hsl(107, 70%, 50%)"
              }
            ]}
            keys={[
                "1",
                "2",
                "3",
                "4",
                "5"
            ]}
            indexBy="Group2"
            margin={{
                "top": 50,
                "right": 130,
                "bottom": 50,
                "left": 60
            }}
            padding={0}
            innerPadding={0}
            colors="blues"
            colorBy="id"
            defs={[
                {
                    "id": "dots",
                    "type": "patternDots",
                    "background": "inherit",
                    "color": "#38bcb2",
                    "size": 4,
                    "padding": 1,
                    "stagger": true
                },
                {
                    "id": "lines",
                    "type": "patternLines",
                    "background": "inherit",
                    "color": "#eed312",
                    "rotation": -45,
                    "lineWidth": 6,
                    "spacing": 10
                }
            ]}
            fill={[
                {
                    "match": {
                        "id": "1"
                    },
                    "id": "dots"
                },
                {
                    "match": {
                        "id": "2"
                    },
                    "id": "lines"
                }
            ]}
            borderColor="inherit:darker(1.6)"
            axisBottom={{
                "orient": "bottom",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "Group2",
                "legendPosition": "middle",
                "legendOffset": 36
            }}
            axisLeft={{
                "orient": "left",
                "tickSize": 5,
                "tickPadding": 5,
                "tickRotation": 0,
                "legend": "Word Frequency",
                "legendPosition": "middle",
                "legendOffset": -40
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor="inherit:darker(1.6)"
            animate={true}
            motionStiffness={90}
            isInteractive={false}
            motionDamping={15}
            legends={[]}
          />
      </div>
    );
  }
}

export default Charts;
