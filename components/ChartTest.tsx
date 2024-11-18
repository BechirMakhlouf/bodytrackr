import * as React from 'react'
import { View } from 'tamagui'
import { CartesianChart, Line, useChartPressState } from 'victory-native'
import { Circle, Text as SKText, useFont } from '@shopify/react-native-skia'
import { useDerivedValue, type SharedValue } from 'react-native-reanimated'
//@ts-ignore
import inter from '../assets/DejaVuSansMono.ttf' // Wherever your font actually lives
import { useTheme } from '@react-navigation/native'
import { useAppStore } from 'store'

//const DATA = Array.from({ length: 14 }, (_, i) => ({
//  day: i,
//  highTmp: 40 + 30 * Math.random(),
//}))

//const { userWeightLog } = useAppStore()
//const DATA = userWeightLog.map(({ weight }, i) => ({
//  day: i,
//  highTmp: weight,
//}))
//
//export function ChartTest() {
//  const font = useFont(inter, 12)
//
//  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } })
//  const { dark: isDark } = useTheme()
//  const value = useDerivedValue(() => {
//    return state.y.highTmp.value.value.toFixed(2)
//  }, [state])
//  const labelColor = isDark ? 'white' : 'black'
//  const lineColor = isDark ? 'lightgray' : 'black'
//
//  return (
//    <View style={{ width: 380, height: 300 }}>
//      <CartesianChart
//        data={DATA}
//        xKey="day"
//        yKeys={['highTmp']}
//        axisOptions={{
//          font,
//          labelColor,
//          lineColor,
//        }}
//        chartPressState={state}
//      >
//        {({ points, chartBounds }) => (
//          <>
//            <SKText
//              color={'red'}
//              font={font}
//              x={chartBounds.left + 10}
//              y={chartBounds.top + 40}
//              text={value}
//              style={'fill'}
//            />
//
//            <Line
//              curveType="natural"
//              points={points.highTmp}
//              color="lightgreen"
//              strokeWidth={3}
//            />
//            {isActive && <ToolTip x={state.x.position} y={state.y.highTmp.position} />}
//          </>
//        )}
//      </CartesianChart>
//    </View>
//  )
//}
//
//function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
//  return <Circle cx={x} cy={y} r={8} color="green" />
//}
