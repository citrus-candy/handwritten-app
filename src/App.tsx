import { useLayoutEffect, useState } from 'react'
import { fabric } from 'fabric'
import { Canvas } from 'fabric/fabric-impl'
import { Container, Stack } from '@mui/material'
import FabricCanvas from './components/FabricCanvas'
import StackButtons from './components/StackButtons'
import BrushColorButtons from './components/BrushColorButtons'
import BrushWidthSlider from './components/BrushWidthSlider'

const canvasId = 'fabric'
const canvasSize = 500
const backgroundImageUrl = `https://placehold.jp/${canvasSize}x${canvasSize}.png`
const initialBrushColor = 'red'
const initialBrushWidth = 25
const minBrushWidth = 1
const maxBrushWidth = 50

function App() {
  const [fabricCanvas, setFabricCanvas] = useState<Canvas>()

  // キャンバスの初期化処理
  useLayoutEffect(() => {
    const canvas = new fabric.Canvas(canvasId, {
      isDrawingMode: true,
      width: canvasSize,
      height: canvasSize,
      backgroundImage: backgroundImageUrl,
    })
    canvas.freeDrawingBrush.color = initialBrushColor
    setFabricCanvas(canvas)
  }, [])

  return (
    <Container>
      <FabricCanvas id={canvasId} />
      <Stack spacing={2} sx={{ width: 'fit-content', margin: 'auto' }}>
        <StackButtons canvas={fabricCanvas!} bgImageUrl={backgroundImageUrl} />
        <BrushColorButtons
          canvas={fabricCanvas!}
          initialColor={initialBrushColor}
        />
        <BrushWidthSlider
          canvas={fabricCanvas!}
          initialWidth={initialBrushWidth}
          minWidth={minBrushWidth}
          maxWidth={maxBrushWidth}
        />
      </Stack>
    </Container>
  )
}

export default App
