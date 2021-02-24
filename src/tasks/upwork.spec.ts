import { strict } from "assert";

let objectMapper = require('object-mapper');
it("maps§ from one shape to another", () => {
  const original = {
    company: {
      devs: [
        {
          firstname: "Webber",
          lastname: "Wang",
        },
        {
          firstname: "Vien",
          lastname: "Nguyen",
        },
      ],
    },
    info: [
      {
        key: "user.address.number",
        value: "1200",
      },
      {
        key: "user.address.street",
        value: "Park ave.",
      },
    ],
  };

  const expected = {
    devs: [
      {
        firstname: "Webber",
        lastname: "Wang",
      },
      {
        firstname: "Vien",
        lastname: "Nguyen",
      },
    ],
    user: { address: { number: "1200", street: "Park ave." } },
  };

  const mapper: object = {
    "company.devs": "devs",
    "info[]": {
      key: "user.address",
      transform: value => {
        const result = value.reduce((map, e) => objectMapper.setKeyValue(map, e.key, e.value), {})
        return result.user.address
      }
    }
  };


  const results = objectMapper(original, mapper);

  expect(results).toStrictEqual(expected);
});
