/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Notificate from '../pages/notificate/index'

describe('Rendering', () => {
  it('Should render 実装中です text', () => {
    render(<Notificate />)
    expect(screen.getByText('実装中です')).toBeInTheDocument()
  })
})
