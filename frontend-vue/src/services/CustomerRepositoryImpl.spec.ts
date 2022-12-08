import { createTestCustomer, Customer } from "commons";
import { backendMock } from "../test-utils/backendMock";
import { CustomerRepositoryImpl } from "./CustomerRepositoryImpl";
import { describe, expect, it } from "vitest";

describe("CustomerApiRepository", function () {
  const ben = createTestCustomer({ firstName: "Benjamin", id: "123" });
  const jane = createTestCustomer({ firstName: "Jane", id: "456" });

  it("should get all customers from the backend on init", async () => {
    backendMock.intercept({ path: "/api/", reply: { body: [jane, ben] } });

    const repository = new CustomerRepositoryImpl();
    await repository.init();

    expect(repository.customers).toEqual([jane, ben]);
  });

  it("should create a customer and add it to the repository on add", async () => {
    const benWithNewId: Customer = { ...ben, id: "newId" };
    backendMock.intercept({
      method: "POST",
      path: "/api/",
      body: ben,
      reply: { statusCode: 201, body: benWithNewId },
    });

    const repository = new CustomerRepositoryImpl();
    await repository.add(ben);

    expect(repository.customers).toEqual([benWithNewId]);
  });

  it("should delete a customer and remove it from the repository on delete", async () => {
    backendMock
      .intercept({ path: "/api/", reply: { body: [jane, ben] } })
      .intercept({
        method: "DELETE",
        path: `/api/${ben.id}`,
        reply: { statusCode: 204 },
      });

    const repository = new CustomerRepositoryImpl();
    await repository.init();
    await repository.delete(ben);

    expect(repository.customers).toEqual([jane]);
  });

  it("should support deleting multiple customers at the same time", async function () {
    backendMock
      .intercept({ path: "/api/", reply: { body: [jane, ben] } })
      .intercept({
        method: "DELETE",
        path: `/api/${jane.id}`,
        reply: { statusCode: 204 },
      });

    const repository = new CustomerRepositoryImpl();
    await repository.init();
    await Promise.all([repository.delete(jane), repository.delete(jane)]);

    expect(repository.customers).toEqual([ben]);
  });

  it("should not delete a non existing customer", async () => {
    backendMock.intercept({ path: "/api/", reply: { body: [jane] } });

    const repository = new CustomerRepositoryImpl();
    await repository.init();
    await repository.delete(ben);

    expect(repository.customers).toEqual([jane]);
  });

  it("should start the activation of a customer", async () => {
    const benPending: Customer = { ...ben, status: "pending" };
    backendMock.intercept({ path: "/api/", reply: { body: [ben] } }).intercept({
      method: "POST",
      path: "/api/send/123",
      reply: { body: benPending },
    });

    const repository = new CustomerRepositoryImpl();
    await repository.init();
    await repository.startActivation(ben);

    expect(repository.customers).toEqual([benPending]);
  });

  it("should complete the activation of a customer and add it if the repository is empty", async () => {
    const benActive: Customer = { ...ben, status: "active" };
    backendMock.intercept({
      path: "/api/activate/123",
      reply: { body: benActive },
    });

    const repository = new CustomerRepositoryImpl();
    const actual = await repository.completeActivation("123");
    expect(actual).toEqual(benActive);
    expect(repository.customers).toEqual([benActive]);
  });

  it("should complete the activation of a customer and replace if the customer is already in the repository", async () => {
    const benActive: Customer = { ...ben, status: "active" };
    backendMock
      .intercept({
        path: "/api/",
        reply: { body: [ben] },
      })
      .intercept({
        path: "/api/activate/123",
        reply: { body: benActive },
      });

    const repository = new CustomerRepositoryImpl();
    await repository.init();

    const actual = await repository.completeActivation("123");

    expect(actual).toEqual(benActive);
    expect(repository.customers).toEqual([benActive]);
  });
});
