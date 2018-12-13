import React from "react";
import { shallow, mount } from "enzyme";
import PearsonUsers from "./";
import User from "../Users";
import mocks from '../../utilCommon/mocks'
import userService from '../../apiServices/userService'


describe("PearsonUsers", () => {
  let component;

  beforeEach(() => {
    component = shallow(<PearsonUsers />);
  });

  it("renders a Pearson user component", () => {
    expect(component.find('.pearon-users').length).toEqual(1);
  });

  it("renders a h1", () => {
    const h1 = component.find("h1");
    expect(h1.text()).toEqual("Pearson User Management");
  });

  it('has 3 users in initial state', () => {
    const wrapper = mount(<PearsonUsers />);
    expect(wrapper.state().users).toEqual(mocks.pearsonUsers);
  });

  it("should append new users to users in state", () => {
    const component = shallow(<PearsonUsers />);
    // initial user id => 4
    component.setState({ users: mocks.pearsonUsers.filter(x => x.id == 4) })

    // append user id => 5
    component.instance().updateUsers(mocks.pearsonUsers.filter(x => x.id == 5))

    // updated users id => 4,5
    expect(component.state('users')).toEqual(mocks.pearsonUsers.filter(x => (x.id == 4 || x.id == 5)))
  });


  it("Task 1 : renders 3 Pearson user from initial state", () => {
    expect(component.find('.user-list').children().length).toEqual(3);
  });

  it('Task 2 : should fetch the users from a HTTP endpoint and append the result to the existing users in the state', async () => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () => new Promise((resolve, reject) => {
        resolve({ data: mocks.pearsonApiResponseUsers })
      })
    }))

    const renderedComponent = await shallow(<PearsonUsers />)
    await renderedComponent.update()
    expect(renderedComponent.state('users').length).toEqual(10)
  })

  it("Task 3 : should remove duplicate users from state", () => {
    const component = shallow(<PearsonUsers />);
    component.setState({ users: mocks.pearsonUsers })
    component.instance().updateUsers(mocks.pearsonUsers)
    expect(component.state('users')).toEqual(mocks.pearsonUsers)
  });

  it("Task 4 : deletes user with passed id from state", () => {
    const component = shallow(<PearsonUsers />);
    component.setState({ users: mocks.pearsonUsers })
    // delete user with id => 4
    component.instance().deleteUser(4)
    expect(component.state('users')).toEqual(mocks.pearsonUsers.filter(x => x.id != 4))
  });

  it("Task 5 : renders 10 Pearson user state less components", () => {
    expect(component.find(User).length).toEqual(10);
  });

});
