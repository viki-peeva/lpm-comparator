import { ReportData } from "@/types/Report";
import { ResponsiveHeatMap } from '@nivo/heatmap'

const heatmapTheme = {
    fontFamily: 'Inter, sans-serif', // Match the font family used in ShadCN/Tailwind CSS
    fontSize: 12,
    textColor: '#334155', // Adjust text color to match your site's design (e.g., Tailwind's slate-700)
    axis: {
      domain: {
        line: {
          stroke: '#cbd5e1', // Tailwind's slate-300
          strokeWidth: 1,
        },
      },
      ticks: {
        line: {
          stroke: '#cbd5e1', // Tailwind's slate-300
          strokeWidth: 1,
        },
        text: {
          fontSize: 12,
          fill: '#334155', // Tailwind's slate-700
        },
      },
      legend: {
        text: {
          fontSize: 14,
          fill: '#334155', // Tailwind's slate-700
        },
      },
    },
    legends: {
      text: {
        fontSize: 12,
        fill: '#334155', // Tailwind's slate-700
      },
    },
    labels: {
      text: {
        fontSize: 12,
        fill: '#ffffff', // White labels on heatmap cells
      },
    },
    tooltip: {
      container: {
        background: '#ffffff',
        color: '#334155', // Tailwind's slate-700
        fontSize: 12,
        fontFamily: 'Inter, sans-serif',
      },
    },
    // Add more theme customizations if needed
  }
  
  // Updated HeatMap component
  const MyResponsiveHeatMap = ({ data }: { data: any }) => (
    <ResponsiveHeatMap
      data={data}
      margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
      valueFormat=">-.2s"
      theme={heatmapTheme} // Apply the custom theme here
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendOffset: 46,
        truncateTickAt: 0,
      }}
      axisRight={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 70,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: -72,
        truncateTickAt: 0,
      }}
      colors={{
        type: 'diverging',
        scheme: 'red_yellow_blue',
        divergeAt: 0.5,
        minValue: -100000,
        maxValue: 100000,
      }}
      emptyColor="#e2e8f0" // Tailwind's slate-100 for empty cells
      legends={[
        {
          anchor: 'bottom',
          translateX: 0,
          translateY: 30,
          length: 400,
          thickness: 8,
          direction: 'row',
          tickPosition: 'after',
          tickSize: 3,
          tickSpacing: 4,
          tickOverlap: false,
          tickFormat: '>-.2s',
          title: 'Value →',
          titleAlign: 'start',
          titleOffset: 4,
        },
      ]}
    />
  )

export default function Similarity({report}: {report: ReportData}) {

    const data = [
        {
          "id": "Japan",
          "data": [
            {
              "x": "Train",
              "y": -63803
            },
            {
              "x": "Subway",
              "y": 55301
            },
            {
              "x": "Bus",
              "y": -79670
            },
            {
              "x": "Car",
              "y": -15162
            },
            {
              "x": "Boat",
              "y": -70770
            },
            {
              "x": "Moto",
              "y": -30463
            },
            {
              "x": "Moped",
              "y": 17287
            },
            {
              "x": "Bicycle",
              "y": 37197
            },
            {
              "x": "Others",
              "y": 70071
            }
          ]
        },
        {
          "id": "France",
          "data": [
            {
              "x": "Train",
              "y": 56556
            },
            {
              "x": "Subway",
              "y": 68133
            },
            {
              "x": "Bus",
              "y": 79489
            },
            {
              "x": "Car",
              "y": -67847
            },
            {
              "x": "Boat",
              "y": -56541
            },
            {
              "x": "Moto",
              "y": 33511
            },
            {
              "x": "Moped",
              "y": -93436
            },
            {
              "x": "Bicycle",
              "y": 82418
            },
            {
              "x": "Others",
              "y": -44158
            }
          ]
        },
        {
          "id": "US",
          "data": [
            {
              "x": "Train",
              "y": 30236
            },
            {
              "x": "Subway",
              "y": 93803
            },
            {
              "x": "Bus",
              "y": 12881
            },
            {
              "x": "Car",
              "y": -90214
            },
            {
              "x": "Boat",
              "y": 98948
            },
            {
              "x": "Moto",
              "y": 52649
            },
            {
              "x": "Moped",
              "y": 23439
            },
            {
              "x": "Bicycle",
              "y": 98709
            },
            {
              "x": "Others",
              "y": -5527
            }
          ]
        },
        {
          "id": "Germany",
          "data": [
            {
              "x": "Train",
              "y": 7982
            },
            {
              "x": "Subway",
              "y": -56154
            },
            {
              "x": "Bus",
              "y": 70271
            },
            {
              "x": "Car",
              "y": 32067
            },
            {
              "x": "Boat",
              "y": 54641
            },
            {
              "x": "Moto",
              "y": 14676
            },
            {
              "x": "Moped",
              "y": 24966
            },
            {
              "x": "Bicycle",
              "y": 79109
            },
            {
              "x": "Others",
              "y": -17205
            }
          ]
        },
        {
          "id": "Norway",
          "data": [
            {
              "x": "Train",
              "y": -3666
            },
            {
              "x": "Subway",
              "y": -78384
            },
            {
              "x": "Bus",
              "y": 71293
            },
            {
              "x": "Car",
              "y": -73360
            },
            {
              "x": "Boat",
              "y": 1753
            },
            {
              "x": "Moto",
              "y": 59756
            },
            {
              "x": "Moped",
              "y": -45715
            },
            {
              "x": "Bicycle",
              "y": 4877
            },
            {
              "x": "Others",
              "y": 44892
            }
          ]
        },
        {
          "id": "Iceland",
          "data": [
            {
              "x": "Train",
              "y": 10102
            },
            {
              "x": "Subway",
              "y": 2205
            },
            {
              "x": "Bus",
              "y": -17667
            },
            {
              "x": "Car",
              "y": 10455
            },
            {
              "x": "Boat",
              "y": -65303
            },
            {
              "x": "Moto",
              "y": -62333
            },
            {
              "x": "Moped",
              "y": 1430
            },
            {
              "x": "Bicycle",
              "y": 75747
            },
            {
              "x": "Others",
              "y": 22934
            }
          ]
        },
        {
          "id": "UK",
          "data": [
            {
              "x": "Train",
              "y": -12662
            },
            {
              "x": "Subway",
              "y": 92484
            },
            {
              "x": "Bus",
              "y": -10404
            },
            {
              "x": "Car",
              "y": -35958
            },
            {
              "x": "Boat",
              "y": -17266
            },
            {
              "x": "Moto",
              "y": 18547
            },
            {
              "x": "Moped",
              "y": 15597
            },
            {
              "x": "Bicycle",
              "y": -5232
            },
            {
              "x": "Others",
              "y": -28105
            }
          ]
        },
        {
          "id": "Vietnam",
          "data": [
            {
              "x": "Train",
              "y": -727
            },
            {
              "x": "Subway",
              "y": -29096
            },
            {
              "x": "Bus",
              "y": -88578
            },
            {
              "x": "Car",
              "y": -11356
            },
            {
              "x": "Boat",
              "y": -98649
            },
            {
              "x": "Moto",
              "y": 51778
            },
            {
              "x": "Moped",
              "y": -19697
            },
            {
              "x": "Bicycle",
              "y": 62755
            },
            {
              "x": "Others",
              "y": -70612
            }
          ]
        }
      ]

    return (
        <div style={{ height: 500 }}>
            <MyResponsiveHeatMap data={data}/>
        </div>
    );

}