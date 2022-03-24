import React from "react";
import renderer from 'react-test-renderer';
import HomeCard from './HomeCard'
import {gatsbyImageStub} from '../../../__mocks__/gatsby-image.js'

describe('Test for Home Card component', () => {
  it('Should create the component', () => {
    const tree = renderer
      .create(<HomeCard item={gatsbyImageStub} />)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
