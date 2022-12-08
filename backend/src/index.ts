import { app } from "./app";
import { NodeMailerEmailService } from "./services/NodeMailerEmailService";
import { MemoryCustomerRepository } from "./repositories/MemoryCustomerRepository";

const PORT = 8081;

const emailService = new NodeMailerEmailService();
const customerRepository = new MemoryCustomerRepository();
app({ emailService, customerRepository }).listen(PORT, () => {
  console.log("Backend running");
});
