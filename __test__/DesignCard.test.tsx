/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import DesignCard from '../components/Card/DesignCard'
import { Articles } from '../types/type'

type DummyData = {
  article?: Articles
  isDone?: boolean
  title?: string
  getPage?: boolean
}

describe('DesignCard component with given props', () => {
  // ダミーのpropsを定義
  let dummyProps: any
  beforeEach(() => {
    dummyProps = {
      article: {
        articles_statuses: 'done',
        id: 'fb3e9dc8-9d08-4ff8-92aa-f719fd7a58d7',
        userId: '977876d7-a2b4-445c-a9c9-c4c8541571c5',
        title: 'test',
        content: 'test',
      },
      isDone: true,
      title: 'test',
      getPage: true,
    }
  })

  it('Should render correctly with given props value', () => {
    render(<DesignCard {...dummyProps} />)
    expect(screen.getByText(dummyProps.article)).toBeInTheDocument()
    expect(screen.getByText(dummyProps.isDone)).toBeInTheDocument()
    expect(screen.getByText(dummyProps.title)).toBeInTheDocument()
    expect(screen.getByText(dummyProps.getPage)).toBeInTheDocument()
  })
})
