import React from "react";
import Register from "./Register";
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

describe("Register component tests", () => {
  const component = shallow(<Register />);

  it("renders without crashing", () => {
    expect(component.debug()).toMatchSnapshot();
  });

  it('should have a submit button', () => {
    expect(component.find('#submitButton')).toHaveLength(1);
  });

  it("should have a name input", () => {
    expect(component.find('#name')).toHaveLength(1);
  });

  it("should have a email input", () => {
    expect(component.find("#email")).toHaveLength(1);
  });

  it("should have a password input", () => {
    expect(component.find("#password")).toHaveLength(1);
  });

  it("should have a password confirmation element", () => {
    expect(component.find("#password2")).toHaveLength(1);
  });
})

