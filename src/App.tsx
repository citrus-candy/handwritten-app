import { useEffect, useLayoutEffect, useState } from 'react'
import './App.css'
import { fabric } from 'fabric'
import { Canvas } from 'fabric/fabric-impl'
import { Container, Button, Stack, Slider } from '@mui/material'

let isRedoing: boolean = false
let canvasHistory: fabric.Object[] = []

function App() {
	const [brushwidth, setBrushWidth] = useState<number>(25)
	const [fabricCanvas, setFabricCanvas] = useState<Canvas>()
	const backgroundImageUrl = 'https://placehold.jp/300x300.png'

	// キャンバスの初期化処理
	useLayoutEffect(() => {
		const canvas = new fabric.Canvas('fabric', {
			isDrawingMode: true, // 手書きモード
			width: 300,
			height: 300,
			// backgroundColor: '#80beaf',
			backgroundImage: backgroundImageUrl,
		})
		setFabricCanvas(canvas)
	}, [])

	// ブラシサイズの変更
	useEffect(() => {
		if (fabricCanvas !== undefined)
			fabricCanvas.freeDrawingBrush.width = brushwidth
	}, [fabricCanvas, brushwidth])

	// redo時の処理
	useEffect(() => {
		fabricCanvas?.on('object:added', () => {
			if (!isRedoing) {
				canvasHistory = []
			}
			isRedoing = false
		})
	}, [fabricCanvas])

	const undoCanvas = () => {
		if (fabricCanvas !== undefined && fabricCanvas._objects.length > 0) {
			const copyArray = [...canvasHistory]
			copyArray.push(fabricCanvas._objects.pop()!)
			canvasHistory = copyArray
			fabricCanvas.renderAll()
		}
	}

	const redoCanvas = () => {
		if (fabricCanvas !== undefined && canvasHistory.length > 0) {
			isRedoing = true
			fabricCanvas.add(canvasHistory.pop()!)
		}
	}

	const clearCanvas = () => {
		if (fabricCanvas !== undefined) {
			fabricCanvas.clear()
			canvasHistory = []
			fabricCanvas.setBackgroundImage(backgroundImageUrl, () =>
				fabricCanvas.renderAll()
			)
		}
	}

	return (
		<Container>
			<div style={{ margin: '40px auto' }}>
				<canvas id="fabric" />
			</div>
			<Stack spacing={2} sx={{ width: 500, margin: 'auto' }}>
				<Stack spacing={2} direction="row" justifyContent="center">
					<Button
						variant="contained"
						onClick={undoCanvas}
						style={{ width: 'fit-content' }}
					>
						undo
					</Button>
					<Button
						variant="contained"
						onClick={redoCanvas}
						style={{ width: 'fit-content' }}
					>
						redo
					</Button>
					<Button
						variant="contained"
						onClick={clearCanvas}
						style={{ width: 'fit-content' }}
					>
						clear
					</Button>
				</Stack>
				<Stack spacing={2} direction="row" alignItems="center">
					<p> BrushWidth: </p>
					<Slider
						defaultValue={25}
						aria-label="Default"
						valueLabelDisplay="auto"
						min={1}
						max={50}
						onChange={(event, value) => setBrushWidth(value as number)}
					/>
				</Stack>
			</Stack>
		</Container>
	)
}

export default App
