import { isNumber } from "./isNumber.js";
import { hasPropOf } from "./hasPropOf.js";
import { isString } from "./isString.js";

const posts: unknown = [
  {
    title: "Amazing1!",
    description: "This lib is truly awesome1!",
  },
  {
    title: "Amazing2!",
    description: "This lib is truly awesome2!",
  },
  {
    title: "Amazing3!",
    description: "This lib is truly awesome3!",
  },
];

const user: unknown = {
  firstName: "Gabriel",
  lastName: "Oliveira",
  age: 10,
  picture: {
    url: "https://www.google.com.br/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png",
  },
  posts,
};

describe("hasPropOf", () => {
  it("correctly infers flat object", () => {
    expect(hasPropOf("firstName", isString)(user)).toBeTruthy();
    expect(hasPropOf("lastName", isString)(user)).toBeTruthy();
    expect(hasPropOf("age", isNumber)(user)).toBeTruthy();
  });
  it("can be composed to infers nested object", () => {
    expect(hasPropOf("picture", hasPropOf("url", isString))(user)).toBeTruthy();
  });
  it("fails for wrong property", () => {
    expect(hasPropOf("wrongProperty", isString)(user)).toBeFalsy();
  });
  it("fails for right property but wrong type", () => {
    expect(hasPropOf("firstName", isNumber)(user)).toBeFalsy();
  });
});
