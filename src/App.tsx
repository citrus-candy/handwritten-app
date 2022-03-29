import { useEffect } from 'react'
import { fabric } from 'fabric'
import Button from '@mui/material/Button'

function App() {
	useEffect(() => {
		// キャンバスの初期化処理
		new fabric.Canvas('fabric', {
			isDrawingMode: true, // 手書きモード
			width: 300,
			height: 300,
			// backgroundColor: '#80beaf',
			backgroundImage: 'https://placehold.jp/300x300.png',
		})
	}, [])

	return (
		<>
			<canvas id="fabric" />
			<Button variant="contained" href="https://reactjs.org" target="_blank">
				Learn React
			</Button>
		</>
	)
}

export default App
