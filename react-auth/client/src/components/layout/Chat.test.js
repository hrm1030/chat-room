import React from "react";
import Chat from "./Chat";
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

const props = {
  messages: []
};

describe("Chat", () => {
  it("renders without crashing", () => {
    const component = shallow(<Chat {...props} />);
    expect(component.debug()).toMatchSnapshot();
  });
});
