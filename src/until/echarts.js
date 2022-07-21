import * as echarts from 'echarts/core';
import {
	BarChart,
	LineChart,
} from 'echarts/charts';
import {
	TooltipComponent,
	GridComponent,
	DatasetComponent,
	TransformComponent,
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
	GridComponent,
	DatasetComponent,
	TransformComponent,
	LabelLayout,
	UniversalTransition,
	SVGRenderer,
	LineChart,
	BarChart,
]);

export default echarts
