import { ruleTypes } from 'gifted-charts-core'
import { LineChart } from 'react-native-gifted-charts'
import { View, Text } from 'tamagui'

export function ChartTest() {
  const ptData = [
    { value: 160, date: '1 Apr 2022' },
    { value: 180, date: '2 Apr 2022' },
    { value: 190, date: '3 Apr 2022' },
    { value: 180, date: '4 Apr 2022' },
    { value: 140, date: '5 Apr 2022' },
    { value: 145, date: '6 Apr 2022' },
    { value: 160, date: '7 Apr 2022' },
    { value: 200, date: '8 Apr 2022' },

    { value: 220, date: '9 Apr 2022' },
    {
      value: 240,
      date: '10 Apr 2022',
      label: '10 Apr',
      labelTextStyle: { color: 'gray', width: 60 },
    },
    { value: 280, date: '11 Apr 2022' },
    { value: 260, date: '12 Apr 2022' },
    { value: 340, date: '13 Apr 2022' },
    { value: 385, date: '14 Apr 2022' },
    { value: 280, date: '15 Apr 2022' },
    { value: 390, date: '16 Apr 2022' },
    { value: 370, date: '17 Apr 2022' },
    { value: 285, date: '18 Apr 2022' },
    { value: 295, date: '19 Apr 2022' },
    {
      value: 300,
      date: '20 Apr 2022',
      label: '20 Apr',
      labelTextStyle: { color: 'gray', width: 60 },
    },
    { value: 280, date: '21 Apr 2022' },
    { value: 295, date: '22 Apr 2022' },
    { value: 260, date: '23 Apr 2022' },
    { value: 255, date: '24 Apr 2022' },

    { value: 190, date: '25 Apr 2022' },
    { value: 220, date: '26 Apr 2022' },
    { value: 205, date: '27 Apr 2022' },
    { value: 230, date: '28 Apr 2022' },
    { value: 210, date: '29 Apr 2022' },
    {
      value: 200,
      date: '30 Apr 2022',
      label: '30 Apr',
      labelTextStyle: { color: 'gray', width: 60 },
    },
    { value: 240, date: '1 May 2022' },
    { value: 250, date: '2 May 2022' },
    { value: 280, date: '3 May 2022' },
    { value: 250, date: '4 May 2022' },
    {
      value: 210,
      date: '5 May 2022',

      label: '31 Apr',
      labelTextStyle: { color: 'gray', width: 60 },
    },
    { value: 240, date: '1 May 2022' },
    { value: 250, date: '2 May 2022' },
    { value: 280, date: '3 May 2022' },
    { value: 250, date: '4 May 2022' },
    { value: 210, date: '5 May 2022' },
  ]
  return (
    <View>
      <LineChart
        data={ptData}
        rotateLabel
        curved
        width={350}
        hideDataPoints
        spacing={10}
        color="#13f0e0"
        thickness={2}
        startFillColor="rgba(20,40,81,0.3)"
        endFillColor="rgba(20,60,81,0.01)"
        startOpacity={0.9}
        endOpacity={0.2}
        initialSpacing={0}
        noOfSections={6}
        stepHeight={50}
        height={300}
        // maxValue={600}
        yAxisColor="white"
        yAxisThickness={0}
        rulesType={ruleTypes.SOLID}
        rulesColor="gray"
        // yAxisTextStyle={{ color: 'gray' }}
        // yAxisLabelPrefix="hello"
        yAxisTextNumberOfLines={2}
        // yAxisLabelWidth={40}
        // yAxisSide='right'
        xAxisColor="gray"
        // pointerConfig={{
        //   pointerStripHeight: 160,
        //   pointerStripColor: 'gray',
        //   pointerStripWidth: 2,
        //   pointerColor: 'gray',
        //   radius: 6,
        //   pointerLabelWidth: 100,
        //   pointerLabelHeight: 90,
        //   // activatePointersOnLongPress: true,
        //   autoAdjustPointerLabelPosition: false,
        //   // pointerLabelComponent: (items) => {
        //   //   return (
        //   //     <View>
        //   //       <Text>{items[0].date}</Text>
        //   //       <View>
        //   //         <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
        //   //           {'$' + items[0].value + '.0'}
        //   //         </Text>
        //   //       </View>
        //   //     </View>
        //   //   )
        //   // },
        // }}
      />
    </View>
  )
}
