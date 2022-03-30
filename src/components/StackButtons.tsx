import { Stack } from '@mui/material'
import { Canvas } from 'fabric/fabric-impl'
import { useEffect } from 'react'
import BaseButton from './BaseButton'

type StackButtonsProps = {
  canvas: Canvas
  bgImageUrl: string
}

let isRedoing: boolean = false
let canvasHistory: fabric.Object[] = []

function StackButtons(props: StackButtonsProps) {
  const { canvas, bgImageUrl } = props

  // redo時の処理
  useEffect(() => {
    canvas?.on('object:added', () => {
      if (!isRedoing) {
        canvasHistory = []
      }
      isRedoing = false
    })
  }, [canvas])

  const undo = () => {
    if (canvas !== undefined && canvas._objects.length > 0) {
      const copyArray = [...canvasHistory]
      copyArray.push(canvas._objects.pop()!)
      canvasHistory = copyArray
      canvas.renderAll()
    }
  }

  const redo = () => {
    if (canvas !== undefined && canvasHistory.length > 0) {
      isRedoing = true
      canvas.add(canvasHistory.pop()!)
    }
  }

  const clear = () => {
    if (canvas !== undefined) {
      canvas.clear()
      canvasHistory = []
      canvas.setBackgroundImage(bgImageUrl, () => canvas.renderAll())
    }
  }

  return (
    <Stack spacing={2} direction="row" justifyContent="center">
      <BaseButton text="undo" func={undo} />
      <BaseButton text="redo" func={redo} />
      <BaseButton text="clear" func={clear} />
    </Stack>
  )
}

export default StackButtons
