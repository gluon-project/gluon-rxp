import { create } from 'react-test-renderer'
import RX = require('reactxp')
import CallToAction from '../../src/Components/CallToAction'

it('renders correctly', () => {
  const tree = create(
    <CallToAction
      title='Send money'
      onPress={() => {
        return true
      }}
    />,
  ).toJSON()

  expect(tree).toMatchSnapshot()
})
