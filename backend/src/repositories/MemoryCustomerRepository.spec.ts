import { MemoryCustomerRepository } from "./MemoryCustomerRepository";
import customers from "../fixtures/customers.json";
import { NotFoundError } from "../errors/NotFoundError";
import { describe, expect, it } from "vitest";
import { createTestCustomer } from "commons";

describe("CustomerRepository", function () {
  it("should not contain any Customer directly after creating a new instance", () => {
    expect(new MemoryCustomerRepository().getAll()).toEqual([]);
  });

  it("should load customers from the fixture when calling init", () => {
    const repository = new MemoryCustomerRepository();
    repository.init();

    expect(repository.getAll()).toEqual(customers);
  });

  describe("getById", () => {
    it("should find a customer by its id when it exists", () => {
      const repository = new MemoryCustomerRepository();
      repository.init();

      expect(repository.getById(customers[0].id)).toEqual(customers[0]);
      expect(repository.getById(customers[1].id)).toEqual(customers[1]);
    });

    it("should throw an error if the customer is not found", () => {
      expect(() => new MemoryCustomerRepository().getById("unknownId")).toThrow(
        new NotFoundError()
      );
    });
  });

  describe("create", () => {
    it("should add a customer with the corresponding data and a generated id", () => {
      const customer = createTestCustomer({
        firstName: "Max",
        lastName: "Mustermann",
      });
      const repository = new MemoryCustomerRepository();
      repository.create(customer);

      const customersInRepository = repository.getAll();
      expect(customersInRepository).toEqual([
        { ...customer, id: expect.any(String) },
      ]);
      expect(customersInRepository[0].id).not.toBe("");
    });
  });

  describe("update", () => {
    it("should update a customer based on its id", () => {
      const repository = new MemoryCustomerRepository();
      repository.init();

      const id = customers[0].id;
      const newCustomer = createTestCustomer({
        id,
        firstName: "Benjamin",
        lastName: "Utzer",
      });
      repository.update(newCustomer);

      expect(repository.getById(id)).toEqual(newCustomer);
    });

    it("should throw an error if the id does not exist", () => {
      const newCustomer = createTestCustomer({ id: "unknownId" });

      expect(() => new MemoryCustomerRepository().update(newCustomer)).toThrow(
        new NotFoundError()
      );
    });
  });

  describe("delete", () => {
    it("should delete a customer based on its id", () => {
      const repository = new MemoryCustomerRepository();
      repository.init();

      const id = customers[0].id;
      repository.delete(id);

      expect(repository.getAll()).not.toContain(customers[0]);
    });

    it("should throw an error if the id does not exist", () => {
      expect(() => new MemoryCustomerRepository().delete("unknownId")).toThrow(
        new NotFoundError()
      );
    });
  });
});
