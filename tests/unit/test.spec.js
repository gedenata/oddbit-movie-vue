import { mount } from "@vue/test-utils";
import Test from "./../../src/components/Test.vue";

describe("Test", () => {
  test("If logged in is false do not show logout button", () => {
    const wrapper = mount(Test);
    expect(wrapper.find("button").isVisible()).toBe(false);
  });
  test("If logged in show logout button", () => {
    const wrapper = mount(Test);
    wrapper.setData({ loggedIn: true });
    expect(wrapper.find("button").isVisible()).toBe(true);
  });
});
