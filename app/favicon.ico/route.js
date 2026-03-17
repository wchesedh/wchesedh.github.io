import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export async function GET() {
  const iconPath = path.join(process.cwd(), 'app', 'icon.svg')
  const icon = await readFile(iconPath)

  return new NextResponse(icon, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}

