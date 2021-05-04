import React from "react";
import Navbar from "./Navbar";
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

describe("Navbar", () => {
  it("renders without crashing", () => {
    const component = shallow(<Navbar />);
    expect(component.debug()).toMatchSnapshot();
  });
});
