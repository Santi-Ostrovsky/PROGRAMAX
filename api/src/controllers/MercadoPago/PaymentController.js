class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService;
  }
  async getPaymentLink(req, res) {
    try {
      //
      const payment = await this.subscriptionService.createPayment();
      return res.json(payment);
    } catch (error) {
      console.log(error);

      return res
        .status(400)
        .json({ error: true, msg: "Failed to create payment" });
    }
  }

  async getPaymentConsult(req, res, id) {
    try {
      const consult = await this.subscriptionService.createConsultPay(id);

      return res.json(consult);
    } catch (error) {
      console.log(error);

      return res
        .status(400)
        .json({ error: true, msg: "Failed to consult Payment" });
    }
  }

  async getSubscriptionLink(req, res) {
    try {
      const subscription = await this.subscriptionService.createSubscription();

      return res.json(subscription);
    } catch (error) {
      console.log(error);

      return res
        .status(400)
        .json({ error: true, msg: "Failed to create subscription" });
    }
  }
  async getSubscriptionConsult(req, res, id) {
    try {
      const consult = await this.subscriptionService.createConsultSub(id);

      return res.json(consult);
    } catch (error) {
      console.log(error);

      return res
        .status(400)
        .json({ error: true, msg: "Failed to consult Subscription" });
    }
  }
}

module.exports = PaymentController;