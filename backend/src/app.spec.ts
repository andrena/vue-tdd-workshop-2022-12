import request from "supertest";
import { app } from "./app";
import customers from "./fixtures/customers.json";
import { createTestCustomer, type Customer } from "commons";
import { MemoryCustomerRepository } from "./repositories/MemoryCustomerRepository";
import { EmailService } from "./services/EmailService";
import { describe, expect, it } from "vitest";

interface SentEmail {
  to: string;
  subject: string;
  text: string;
}

class MockEmailService implements EmailService {
  constructor(public sentEmails: SentEmail[]) {}

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    this.sentEmails.push({ to, subject, text });
  }
}

function createTestApplication(sentEmails: SentEmail[] = []) {
  return app({
    emailService: new MockEmailService(sentEmails),
    customerRepository: new MemoryCustomerRepository(),
  });
}

describe("app integration", () => {
  describe("GET /", () => {
    it("should return status 200 with all customers", async () => {
      const application = createTestApplication();

      const response = await request(application.callback()).get("/");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(customers);
    });
  });

  describe("GET /:id", () => {
    it("should return status 200 with the right customer", async () => {
      const application = createTestApplication();
      const id = customers[0].id;

      const response = await request(application.callback()).get(`/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(customers[0]);
    });

    it("should return status 404 if the id does not exist", async () => {
      const application = createTestApplication();
      const response = await request(application.callback()).get("/unknownId");

      expect(response.status).toBe(404);
    });
  });

  describe("POST /", () => {
    it("should return status 201 and create a customer", async () => {
      const application = createTestApplication();
      const customer: Customer = createTestCustomer({
        firstName: "Jane",
        lastName: "Doe",
      });

      const postResponse = await request(application.callback())
        .post("/")
        .send(customer);

      expect(postResponse.status).toBe(201);

      const getResponse = await request(application.callback()).get("/");

      expect(getResponse.body).toContainEqual({
        ...customer,
        id: expect.anything(),
      });
    });
  });

  describe("PUT /", () => {
    it("should return status 200 and update the right customer", async () => {
      const application = createTestApplication();
      const id = customers[0].id;
      const customer: Customer = createTestCustomer({
        id,
        firstName: "Jane",
        lastName: "Doe",
      });

      const putResponse = await request(application.callback())
        .put("/")
        .send(customer);

      expect(putResponse.status).toBe(200);

      const getResponse = await request(application.callback()).get(`/${id}`);

      expect(getResponse.body).toEqual(customer);
    });

    it("should return status 404 if the id does not exist", async () => {
      const application = createTestApplication();
      const customer: Customer = createTestCustomer({ id: "unknownId" });

      const putResponse = await request(application.callback())
        .put("/")
        .send(customer);

      expect(putResponse.status).toBe(404);
    });
  });

  describe("DELETE /:id", () => {
    it("should return status 204 and delete the customer", async () => {
      const application = createTestApplication();
      const customerToDelete = customers[0];

      const deleteResponse = await request(application.callback()).delete(
        `/${customerToDelete.id}`
      );

      expect(deleteResponse.status).toBe(204);

      const getResponse = await request(application.callback()).get("/");

      expect(getResponse.body).not.toContainEqual(customerToDelete);
    });

    it("should return status 404 if the id does not exist", async () => {
      const application = createTestApplication();

      const response = await request(application.callback()).delete(
        "/unknownId"
      );

      expect(response.status).toBe(404);
    });
  });

  describe("GET /send/:id", () => {
    it("should return status 200 with an existing customer", async () => {
      const application = createTestApplication();
      const id = customers[0].id;

      const response = await request(application.callback()).get(`/send/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...customers[0], status: "pending" });
    });

    it("should send an email to an existing customer", async () => {
      const sentEmails: SentEmail[] = [];
      const application = createTestApplication(sentEmails);
      const id = customers[0].id;

      await request(application.callback()).get(`/send/${id}`);

      expect(sentEmails).toEqual([
        {
          to: customers[0].emailAddress,
          subject: "Hello World!",
          text: `http://localhost:8080/activate/${id}`,
        },
      ]);
    });

    it("should return status 404 and not send any email if the id does not exist", async () => {
      const sentEmails: SentEmail[] = [];
      const application = createTestApplication(sentEmails);

      const response = await request(application.callback()).get(
        "/send/unknownId"
      );

      expect(response.status).toBe(404);
      expect(sentEmails).toHaveLength(0);
    });
  });

  describe("GET /activate/:id", () => {
    it("should return status 200 and activate an existing customer", async () => {
      const application = createTestApplication();
      const id = customers[0].id;

      const response = await request(application.callback()).get(
        `/activate/${id}`
      );

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...customers[0], status: "active" });
    });

    it("should return status 404 and not send any email if the id does not exist", async () => {
      const sentEmails: SentEmail[] = [];
      const application = createTestApplication(sentEmails);

      const response = await request(application.callback()).get(
        "/activate/unknownId"
      );

      expect(response.status).toBe(404);
    });
  });
});
