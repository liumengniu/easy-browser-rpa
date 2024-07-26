/**
 * @author Kevin
 * @Date: 2024-7-26
 */
import "./index.less"
import {useEffect, useState} from "react";
import { Graph, Shape } from '@antv/x6'
import { Stencil } from '@antv/x6-plugin-stencil'
import { Transform } from '@antv/x6-plugin-transform'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { History } from '@antv/x6-plugin-history'
import {Button, Space} from "antd";


function NewScript() {
	const [graph, setGraph] = useState(null)
	
	useEffect(()=>{
		initGraph()
	}, [])
	
	
	/**
	 * 初始化画布
	 */
	const initGraph = () => {
		// 初始化画布
		const graph = new Graph({
			container: document.getElementById('graph-container'),
			grid: true,
			mousewheel: {
				enabled: true,
				zoomAtMousePosition: true,
				modifiers: 'ctrl',
				minScale: 0.5,
				maxScale: 3,
			},
			connecting: {
				router: 'manhattan',
				connector: {
					name: 'rounded',
					args: {
						radius: 8,
					},
				},
				anchor: 'center',
				connectionPoint: 'anchor',
				allowBlank: false,
				snap: {
					radius: 20,
				},
				createEdge() {
					return new Shape.Edge({
						attrs: {
							line: {
								stroke: '#A2B1C3',
								strokeWidth: 2,
								targetMarker: {
									name: 'block',
									width: 12,
									height: 8,
								},
							},
						},
						zIndex: 0,
					})
				},
				validateConnection({targetMagnet}) {
					return !!targetMagnet
				},
			},
			highlighting: {
				magnetAdsorbed: {
					name: 'stroke',
					args: {
						attrs: {
							fill: '#5F95FF',
							stroke: '#5F95FF',
						},
					},
				},
			},
		})
		setGraph(graph)
		// 启用插件
		graph
			.use(
				new Transform({
					resizing: true,
					rotating: true,
				}),
			)
			.use(
				new Selection({
					rubberband: true,
					showNodeSelectionBox: true,
				}),
			)
			.use(new Snapline())
			.use(new Keyboard())
			.use(new Clipboard())
			.use(new History())
		
		// #region 初始化 stencil
		const stencil = new Stencil({
			title: '流程图',
			target: graph,
			stencilGraphWidth: 200,
			stencilGraphHeight: 180,
			collapsable: true,
			groups: [
				{
					title: '基础流程图',
					name: 'group1',
				},
			],
			layoutOptions: {
				columns: 2,
				columnWidth: 80,
				rowHeight: 55,
			},
		})
		document.getElementById('stencil')?.appendChild(stencil.container)
		// #endregion
		
		// #region 快捷键与事件
		graph.bindKey(['meta+c', 'ctrl+c'], () => {
			const cells = graph.getSelectedCells()
			if (cells.length) {
				graph.copy(cells)
			}
			return false
		})
		graph.bindKey(['meta+x', 'ctrl+x'], () => {
			const cells = graph.getSelectedCells()
			if (cells.length) {
				graph.cut(cells)
			}
			return false
		})
		graph.bindKey(['meta+v', 'ctrl+v'], () => {
			if (!graph.isClipboardEmpty()) {
				const cells = graph.paste({ offset: 32 })
				graph.cleanSelection()
				graph.select(cells)
			}
			return false
		})

		// undo redo
		graph.bindKey(['meta+z', 'ctrl+z'], () => {
			if (graph.canUndo()) {
				graph.undo()
			}
			return false
		})
		graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
			if (graph.canRedo()) {
				graph.redo()
			}
			return false
		})

		// select all
		graph.bindKey(['meta+a', 'ctrl+a'], () => {
			const nodes = graph.getNodes()
			if (nodes) {
				graph.select(nodes)
			}
		})

		// delete
		graph.bindKey('backspace', () => {
			const cells = graph.getSelectedCells()
			if (cells.length) {
				graph.removeCells(cells)
			}
		})

		// zoom
		graph.bindKey(['ctrl+1', 'meta+1'], () => {
			const zoom = graph.zoom()
			if (zoom < 1.5) {
				graph.zoom(0.1)
			}
		})
		graph.bindKey(['ctrl+2', 'meta+2'], () => {
			const zoom = graph.zoom()
			if (zoom > 0.5) {
				graph.zoom(-0.1)
			}
		})
		
		// 控制连接桩显示/隐藏
		const showPorts = (ports, show) => {
			for (let i = 0, len = ports.length; i < len; i += 1) {
				ports[i].style.visibility = show ? 'visible' : 'hidden'
			}
		}
		graph.on('node:mouseenter', () => {
			const container = document.getElementById('graph-container');
			const ports = container.querySelectorAll(
				'.x6-port-body',
			)
			showPorts(ports, true)
		})
		graph.on('node:mouseleave', () => {
			const container = document.getElementById('graph-container');
			const ports = container.querySelectorAll(
				'.x6-port-body',
			)
			showPorts(ports, false)
		})
		// #endregion
		
		// #region 初始化图形
		const ports = {
			groups: {
				top: {
					position: 'top',
					attrs: {
						circle: {
							r: 4,
							magnet: true,
							stroke: '#5F95FF',
							strokeWidth: 1,
							fill: '#fff',
							style: {
								visibility: 'hidden',
							},
						},
					},
				},
				right: {
					position: 'right',
					attrs: {
						circle: {
							r: 4,
							magnet: true,
							stroke: '#5F95FF',
							strokeWidth: 1,
							fill: '#fff',
							style: {
								visibility: 'hidden',
							},
						},
					},
				},
				bottom: {
					position: 'bottom',
					attrs: {
						circle: {
							r: 4,
							magnet: true,
							stroke: '#5F95FF',
							strokeWidth: 1,
							fill: '#fff',
							style: {
								visibility: 'hidden',
							},
						},
					},
				},
				left: {
					position: 'left',
					attrs: {
						circle: {
							r: 4,
							magnet: true,
							stroke: '#5F95FF',
							strokeWidth: 1,
							fill: '#fff',
							style: {
								visibility: 'hidden',
							},
						},
					},
				},
			},
			items: [
				{
					group: 'top',
				},
				{
					group: 'right',
				},
				{
					group: 'bottom',
				},
				{
					group: 'left',
				},
			],
		}
		
		
		Graph.registerNode(
			'custom-rect',
			{
				inherit: 'rect',
				width: 66,
				height: 36,
				attrs: {
					body: {
						strokeWidth: 1,
						stroke: '#5F95FF',
						fill: '#EFF4FF',
					},
					text: {
						fontSize: 12,
						fill: '#262626',
					},
				},
				ports: { ...ports },
			},
			true,
		)
		
		Graph.registerNode(
			'custom-polygon',
			{
				inherit: 'polygon',
				width: 66,
				height: 36,
				attrs: {
					body: {
						strokeWidth: 1,
						stroke: '#5F95FF',
						fill: '#EFF4FF',
					},
					text: {
						fontSize: 12,
						fill: '#262626',
					},
				},
				ports: {
					...ports,
					items: [
						{
							group: 'top',
						},
						{
							group: 'bottom',
						},
					],
				},
			},
			true,
		)
		
		Graph.registerNode(
			'custom-circle',
			{
				inherit: 'circle',
				width: 45,
				height: 45,
				attrs: {
					body: {
						strokeWidth: 1,
						stroke: '#5F95FF',
						fill: '#EFF4FF',
					},
					text: {
						fontSize: 12,
						fill: '#262626',
					},
				},
				ports: { ...ports },
			},
			true,
		)
		
		Graph.registerNode(
			'custom-image',
			{
				inherit: 'rect',
				width: 52,
				height: 52,
				markup: [
					{
						tagName: 'rect',
						selector: 'body',
					},
					{
						tagName: 'image',
					},
					{
						tagName: 'text',
						selector: 'label',
					},
				],
				attrs: {
					body: {
						stroke: '#5F95FF',
						fill: '#5F95FF',
					},
					image: {
						width: 26,
						height: 26,
						refX: 13,
						refY: 16,
					},
					label: {
						refX: 3,
						refY: 2,
						textAnchor: 'left',
						textVerticalAnchor: 'top',
						fontSize: 12,
						fill: '#fff',
					},
				},
				ports: { ...ports },
			},
			true,
		)
		
		const r1 = graph.createNode({
			shape: 'custom-rect',
			label: '开始',
			attrs: {
				body: {
					rx: 20,
					ry: 26,
				},
			},
		})
		const r2 = graph.createNode({
			shape: 'custom-rect',
			label: '过程',
		})
		const r3 = graph.createNode({
			shape: 'custom-rect',
			attrs: {
				body: {
					rx: 6,
					ry: 6,
				},
			},
			label: '可选过程',
		})
		const r4 = graph.createNode({
			shape: 'custom-polygon',
			attrs: {
				body: {
					refPoints: '0,10 10,0 20,10 10,20',
				},
			},
			label: '决策',
		})
		const r5 = graph.createNode({
			shape: 'custom-polygon',
			attrs: {
				body: {
					refPoints: '10,0 40,0 30,20 0,20',
				},
			},
			label: '数据',
		})
		const r6 = graph.createNode({
			shape: 'custom-circle',
			label: '连接',
		})
		stencil.load([r1, r2, r3, r4, r5, r6], 'group1')
	}
	
	/**
	 * 导出画布
	 */
	const exportData = () =>{
		const jsonData = graph.toJSON()
		console.log(jsonData, '=========jsonData============')
	}
	
	return (
		<div className="new-script">
			<div id="stencil"/>
			<div id="graph-container"/>
			<div className="new-script-options">
				<Space direction="vertical">
					<Button type="primary" onClick={exportData}>导出数据</Button>
					<Button type="primary" onClick={exportData}>保存流程</Button>
				</Space>
			</div>
		</div>
	)
}

export default NewScript
