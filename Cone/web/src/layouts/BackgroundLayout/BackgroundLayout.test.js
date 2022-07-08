import { render } from '@redwoodjs/testing/web'

import BackgroundLayout from './BackgroundLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BackgroundLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BackgroundLayout />)
    }).not.toThrow()
  })
})
