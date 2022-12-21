import * as echarts from 'echarts/core';
import {
	BarChart,
	LineChart,
	PieChart
} from 'echarts/charts';
import {
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	LegendComponent,
} from 'echarts/components';
import {
	LabelLayout,
	UniversalTransition
} from 'echarts/features';
import {
	SVGRenderer
} from 'echarts/renderers';
echarts.use([
	TooltipComponent,
	LegendComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
	LabelLayout,
	UniversalTransition,
	SVGRenderer,
	LineChart,
	BarChart,
	PieChart,
]);

export default echarts
