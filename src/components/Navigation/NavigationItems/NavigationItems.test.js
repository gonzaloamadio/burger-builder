import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// With this we connect enzyme
configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it('should render two <NavigationItem /> elements if not authenticated', () => {
    // We want to create an instance of the component as it would be rendered to the DOM
    // and have a look into the component for the case the prop isAuthenticated === false
    // Enzyme allows us to render the component standalone, independent of the entire react app

    // shallow renders the component with all its content but the content is NOT deeply rendered
    // i.e., if there is a component inside another component, the child component is only rendered as
    // a placeholder. The content of the child component is not rendered. And that is important for
    // creating isolated tests.
    // const wrapper = shallow(<NavigationItems />)

    // Now we write our expectation.
    // expect is provided by Jest.
    // find is provided by enzyme
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render logout <NavigationItem /> elements if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)
    ).toEqual(true);
  });
});
