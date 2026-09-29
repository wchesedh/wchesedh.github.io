import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

export async function GET() {
  const iconPath = path.join(process.cwd(), 'public', 'images', 'weljIcon.png')
  const icon = await readFile(iconPath)

  return new NextResponse(icon, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
