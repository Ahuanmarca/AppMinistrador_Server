import { expect, test } from "bun:test";
import { isValidDate, isValidEmail } from "./helpers";

test("isValidDate", () => {
  expect(isValidDate("2024-02-29")).toBe(true); // 2024 is a leap year
  expect(isValidDate("2023-02-29")).toBe(false); // 2023 is not a leap year
  expect(isValidDate("2021-01-01")).toBe(true);
  expect(isValidDate("2021-01-32")).toBe(false);
  expect(isValidDate("2021-13-01")).toBe(false);
  expect(isValidDate("2021-12-31")).toBe(true);
  expect(isValidDate("hello")).toBe(false);
});

test("isValidEmail", () => {
  expect(isValidEmail("example@mail.foo")).toBe(true);
  expect(isValidEmail("example@mail")).toBe(false);
  expect(isValidEmail("example.mail.foo")).toBe(false);
  expect(isValidEmail("example@mail.")).toBe(false);
  expect(isValidEmail("he@ll.ou")).toBe(true);
});
