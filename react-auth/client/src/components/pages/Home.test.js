import React from "react";
import Home from "./Home";
import Navbar from '../layout/Navbar';
import { shallow } from "enzyme";

jest.mock("react", () => {
  const ActualReact = require.requireActual("react");
  return {
    ...ActualReact,
    useContext: () => ({
      authContext: {}
    })
  };
});

describe("Home", () => {
  const component = shallow(<Home />);

  it("renders without crashing", () => {
    expect(component.debug()).toMatchSnapshot();
  });

  it('has a chat container', () => {
    expect(component.find('ChatContainer')).toHaveLength(1);
  })

  it("has an input field", () => {
    expect(component.find("Input")).toHaveLength(1);
  });

  it("has a send button", () => {
    expect(component.find("Button")).toHaveLength(1);
  });
});
